import { calculateMetrics, calculateAverages } from "../utils/metrics.js";

export function srt(processes) {
  const gantt = [];
  const arrivals = [...processes].sort((a, b) => a.arrival - b.arrival);
  const remaining = arrivals.map((process) => ({
    ...process,
    remainingBurst: process.burst,
  }));

  let currentTime = 0;
  let nextArrivalIndex = 0;

  while (remaining.length > 0) {
    while (
      nextArrivalIndex < arrivals.length &&
      arrivals[nextArrivalIndex].arrival <= currentTime
    ) {
      nextArrivalIndex += 1;
    }

    const ready = remaining.filter(
      (item) => item.arrival <= currentTime && item.remainingBurst > 0,
    );

    if (ready.length === 0) {
      currentTime = arrivals[nextArrivalIndex].arrival;
      continue;
    }

    ready.sort((a, b) => a.remainingBurst - b.remainingBurst);
    const process = ready[0];

    const nextArrivalTime =
      nextArrivalIndex < arrivals.length
        ? arrivals[nextArrivalIndex].arrival
        : Infinity;

    const runTime = Math.min(
      process.remainingBurst,
      nextArrivalTime === Infinity
        ? process.remainingBurst
        : nextArrivalTime - currentTime,
    );

    const start = currentTime;
    const end = currentTime + runTime;

    gantt.push({ pid: process.pid, start, end });

    currentTime = end;
    process.remainingBurst -= runTime;

    if (process.remainingBurst === 0) {
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
