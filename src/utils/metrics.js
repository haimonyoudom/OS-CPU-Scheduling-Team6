export function calculateMetrics(processes, gantt) {
  const metrics = [];

  processes.forEach((process) => {
    const executions = gantt.filter(
      (g) => g.pid === process.pid
    );

    const firstStart = executions[0].start;

    const completionTime =
      executions[executions.length - 1].end;

    const turnaroundTime =
      completionTime - process.arrival;

    const waitingTime =
      turnaroundTime - process.burst;

    const responseTime =
      firstStart - process.arrival;

    metrics.push({
      pid: process.pid,
      waitingTime,
      turnaroundTime,
      responseTime,
    });
  });

  return metrics;
}
export function calculateAverages(metrics) {
  const totalWT = metrics.reduce(
    (sum, p) => sum + p.waitingTime,
    0
  );

  const totalTAT = metrics.reduce(
    (sum, p) => sum + p.turnaroundTime,
    0
  );

  const totalRT = metrics.reduce(
    (sum, p) => sum + p.responseTime,
    0
  );

  return {
    waitingTime:
      totalWT / metrics.length,

    turnaroundTime:
      totalTAT / metrics.length,

    responseTime:
      totalRT / metrics.length,
  };
}