function ProcessTable({ processes, onDeleteProcess }) {
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {processes.map((p, index) => (
            <tr key={`${p.pid}-${p.arrival}-${p.burst}-${index}`}>
              <td>{p.pid}</td>
              <td>{p.arrival}</td>
              <td>{p.burst}</td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDeleteProcess?.(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessTable;
