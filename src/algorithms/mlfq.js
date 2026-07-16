import { calculateMetrics, calculateAverages } from "../utils/metrics.js";

function normalizeQueueConfigs(queueConfigs) {
  const baseConfigs = Array.isArray(queueConfigs) ? queueConfigs : [];

  if (baseConfigs.length === 0) {
    return [
      { policy: "RR", quantum: 2 },
      { policy: "RR", quantum: 4 },
      { policy: "RR", quantum: 8 },
    ];
  }

  return baseConfigs.map((queue) => ({
    policy: queue?.policy ?? "RR",
    quantum: Math.max(1, Number(queue?.quantum) || 2),
  }));
}

function dequeueProcess(queue, policy) {
  if (!queue.length) {
    return null;
  }

  if (policy === "SJF") {
    const bestIndex = queue.reduce((bestIndex, process, index) => {
      if (bestIndex === -1) {
        return index;
      }

      const current = queue[bestIndex];

      if (
        process.remainingBurst < current.remainingBurst ||
        (process.remainingBurst === current.remainingBurst &&
          process.arrival < current.arrival)
      ) {
        return index;
      }

      return bestIndex;
    }, -1);

    return queue.splice(bestIndex, 1)[0];
  }

  return queue.shift();
}

export function mlfq(processes, queueConfigs) {
  const gantt = [];
  const arrivals = [...processes].sort((a, b) => a.arrival - b.arrival);
  const queues = normalizeQueueConfigs(queueConfigs).map(() => []);
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
      if (nextArrivalIndex < arrivals.length) {
        currentTime = arrivals[nextArrivalIndex].arrival;
      }
      continue;
    }

    const queueConfig = normalizeQueueConfigs(queueConfigs)[activeQueue] ?? {
      policy: "RR",
      quantum: 2,
    };
    const process = dequeueProcess(queues[activeQueue], queueConfig.policy);
    const quantum = Math.max(1, Number(queueConfig.quantum) || 1);
    const runTime =
      queueConfig.policy === "RR"
        ? Math.min(process.remainingBurst, quantum)
        : process.remainingBurst;

    const start = currentTime;
    const end = currentTime + runTime;

    gantt.push({ pid: process.pid, start, end });

    currentTime = end;
    process.remainingBurst -= runTime;

    if (process.remainingBurst > 0) {
      const nextQueueIndex =
        activeQueue < queues.length - 1 ? activeQueue + 1 : activeQueue;
      process.queueIndex = nextQueueIndex;
      queues[nextQueueIndex].push(process);
    } else {
      const index = remaining.findIndex((item) => item.pid === process.pid);
      if (index >= 0) {
        remaining.splice(index, 1);
      }
    }
  }

  const metrics = calculateMetrics(processes, gantt);
  const averages = calculateAverages(metrics, processes, gantt);

  return { gantt, metrics, averages };
}
