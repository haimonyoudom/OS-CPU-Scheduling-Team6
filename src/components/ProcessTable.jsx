function ProcessTable({ processes }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>PID</th>
          <th>Arrival</th>
          <th>Burst</th>
        </tr>
      </thead>

      <tbody>
        {processes.map((p) => (
          <tr key={p.pid}>
            <td>{p.pid}</td>
            <td>{p.arrival}</td>
            <td>{p.burst}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProcessTable;