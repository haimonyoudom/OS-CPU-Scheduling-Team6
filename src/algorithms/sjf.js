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

   
}