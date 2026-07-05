function MetricsTable({ metrics, averages }) {
  if (!metrics.length) {
    return (
      <div className="empty-state">
        Metrics will be displayed here after a run.
      </div>
    );
  }

  return (
    <div>
      {averages && (
        <div className="metrics-grid">
          <div className="metric-card">
            <span>Average WT</span>
            <strong>{averages.waitingTime.toFixed(2)}</strong>
          </div>
          <div className="metric-card">
            <span>Average TAT</span>
            <strong>{averages.turnaroundTime.toFixed(2)}</strong>
          </div>
          <div className="metric-card">
            <span>Average RT</span>
            <strong>{averages.responseTime.toFixed(2)}</strong>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
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
      </div>
    </div>
  );
}

export default MetricsTable;
