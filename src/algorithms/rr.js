import { calculateMetrics, calculateAverages } from "../utils/metrics.js";

export function rr(processes, quantum = 2) {
  const readyQueue = [];
  const gantt = [];
  const arrivals = [...processes].sort((a, b) => a.arrival - b.arrival);
  const remaining = arrivals.map((process) => ({
    ...process,
    remainingBurst: process.burst,
  }));

  let currentTime = 0;
  let nextArrivalIndex = 0;

  while (remaining.length > 0 || readyQueue.length > 0) {
    while (
      nextArrivalIndex < arrivals.length &&
      arrivals[nextArrivalIndex].arrival <= currentTime
    ) {
      readyQueue.push(
        remaining.find((item) => item.pid === arrivals[nextArrivalIndex].pid),
      );
      nextArrivalIndex += 1;
    }

    if (readyQueue.length === 0) {
      currentTime = arrivals[nextArrivalIndex].arrival;
      continue;
    }

    const process = readyQueue.shift();
    const runTime = Math.min(quantum, process.remainingBurst);

    const start = currentTime;
    const end = currentTime + runTime;

    gantt.push({ pid: process.pid, start, end });

    currentTime = end;
    process.remainingBurst -= runTime;

    if (process.remainingBurst > 0) {
      readyQueue.push(process);
    } else {
      const index = remaining.findIndex((item) => item.pid === process.pid);
      if (index >= 0) {
        remaining.splice(index, 1);
      }
    }
  }

  const metrics = calculateMetrics(processes, gantt);
  const averages = calculateAverages(metrics);

  return { gantt, metrics, averages };
}
