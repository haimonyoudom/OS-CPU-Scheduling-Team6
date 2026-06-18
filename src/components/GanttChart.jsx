function GanttChart({ data }) {
  return (
    <div>
      <h2>Gantt Chart</h2>

      <div
        style={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        {data.map((item) => (
          <div
            key={`${item.pid}-${item.start}`}
            style={{
              border: "1px solid black",
              padding: "20px",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            {item.pid}
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        {data.map((item) => (
          <div
            key={item.start}
            style={{
              width: "82px",
            }}
          >
            {item.start}
          </div>
        ))}

        {data.length > 0 &&
          data[data.length - 1].end}
      </div>
    </div>
  );
}

export default GanttChart;