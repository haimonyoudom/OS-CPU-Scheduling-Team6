import { calculateMetrics, calculateAverages } from "../utils/metrics";

export function fcfs(processes) {
  const sorted = [...processes].sort(
    (a, b) => a.arrival - b.arrival
  );

  let currentTime = 0;
  const gantt = [];

  sorted.forEach((process) => {
    const start = Math.max(
      currentTime,
      process.arrival
    );

    const end = start + process.burst;

    gantt.push({
      pid: process.pid,
      start,
      end,
    });

    currentTime = end;
  });

  const metrics = calculateMetrics(
    processes,
    gantt
  );

  const averages = calculateAverages(
    metrics
  );

  return {
    gantt,
    metrics,
    averages,
  };
}