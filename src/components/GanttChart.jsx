function GanttChart({ data }) {
  if (!data.length) {
    return (
      <div className="empty-state">
        The gantt chart will appear here after you run a simulation.
      </div>
    );
  }

  const totalTime = Math.max(...data.map((item) => item.end), 1);

  return (
    <div className="gantt-wrapper">
      <div className="gantt-axis">
        {Array.from({ length: totalTime + 1 }, (_, index) => (
          <span key={index}>{index}</span>
        ))}
      </div>

      <div className="gantt-rows">
        {data.map((item, index) => {
          const width = Math.max(
            ((item.end - item.start) / totalTime) * 100,
            8,
          );
          const left = (item.start / totalTime) * 100;

          return (
            <div className="gantt-row" key={`${item.pid}-${index}`}>
              <div className="gantt-label">{item.pid}</div>
              <div className="gantt-track">
                <div
                  className="gantt-block"
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <span>{item.pid}</span>
                  <small>
                    {item.start}-{item.end}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GanttChart;
