import {
  calculateMetrics,
  calculateAverages,
} from "../utils/metrics";

export function sjf(processes) {
  const gantt = [];

  const remaining = [...processes];

  let currentTime = 0;

  while (remaining.length > 0) {
    const ready = remaining.filter(
      (p) => p.arrival <= currentTime
    );

    // CPU idle
    if (ready.length === 0) {
      currentTime++;
      continue;
    }

    ready.sort(
      (a, b) => a.burst - b.burst
    );

    const process = ready[0];

    const start = currentTime;

    const end =
      currentTime + process.burst;

    gantt.push({
      pid: process.pid,
      start,
      end,
    });

    currentTime = end;

    const index = remaining.findIndex(
      (p) => p.pid === process.pid
    );

    remaining.splice(index, 1);
  }

  const metrics =
    calculateMetrics(processes, gantt);

  const averages =
    calculateAverages(metrics);

  return {
    gantt,
    metrics,
    averages,
  };
}