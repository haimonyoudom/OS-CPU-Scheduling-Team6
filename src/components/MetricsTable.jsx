function MetricsTable({
  metrics,
  averages,
}) {
  return (
    <div>
      <h2>Metrics</h2>

      <table border="1">
        <thead>
          <tr>
            <th>PID</th>
            <th>WT</th>
            <th>TAT</th>
            <th>RT</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((p) => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.waitingTime}</td>
              <td>{p.turnaroundTime}</td>
              <td>{p.responseTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {averages && (
        <>
          <h3>Average Values</h3>

          <p>
            Average WT:
            {" "}
            {averages.waitingTime.toFixed(2)}
          </p>

          <p>
            Average TAT:
            {" "}
            {averages.turnaroundTime.toFixed(2)}
          </p>

          <p>
            Average RT:
            {" "}
            {averages.responseTime.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}

export default MetricsTable;