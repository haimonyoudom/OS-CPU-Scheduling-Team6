function ProcessTable({ processes }) {
  if (processes.length === 0) {
    return (
      <div className="empty-state">
        No processes added yet. Start by entering a PID, arrival time, and burst
        time.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival</th>
            <th>Burst</th>
          </tr>
        </thead>

        <tbody>
          {processes.map((p) => (
            <tr key={`${p.pid}-${p.arrival}-${p.burst}`}>
              <td>{p.pid}</td>
              <td>{p.arrival}</td>
              <td>{p.burst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessTable;
