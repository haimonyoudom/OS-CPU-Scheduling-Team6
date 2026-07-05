import { calculateMetrics, calculateAverages } from "../utils/metrics.js";

export function mlfq(processes) {
  const gantt = [];
  const arrivals = [...processes].sort((a, b) => a.arrival - b.arrival);
  const queues = [[], [], []];
  const quanta = [2, 4, 8];
  const remaining = arrivals.map((process) => ({
    ...process,
    remainingBurst: process.burst,
    queueIndex: 0,
  }));

  let currentTime = 0;
  let nextArrivalIndex = 0;

  while (remaining.length > 0) {
    while (
      nextArrivalIndex < arrivals.length &&
      arrivals[nextArrivalIndex].arrival <= currentTime
    ) {
      const process = remaining.find(
        (item) => item.pid === arrivals[nextArrivalIndex].pid,
      );
      queues[0].push(process);
      nextArrivalIndex += 1;
    }

    const activeQueue = queues.findIndex((queue) => queue.length > 0);

    if (activeQueue === -1) {
      currentTime = arrivals[nextArrivalIndex].arrival;
      continue;
    }

    const process = queues[activeQueue].shift();
    const quantum = quanta[activeQueue];
    const runTime = Math.min(process.remainingBurst, quantum);

    const start = currentTime;
    const end = currentTime + runTime;

    gantt.push({ pid: process.pid, start, end });

    currentTime = end;
    process.remainingBurst -= runTime;

    if (process.remainingBurst > 0) {
      if (activeQueue < queues.length - 1) {
        process.queueIndex = activeQueue + 1;
        queues[process.queueIndex].push(process);
      } else {
        queues[activeQueue].push(process);
      }
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
