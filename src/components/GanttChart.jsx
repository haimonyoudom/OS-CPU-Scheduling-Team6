function GanttChart({ data }) {
  if (!data.length) {
    return (
      <div className="empty-state">
        The gantt chart will appear here after you run a simulation.
      </div>
    );
  }

  const totalTime = Math.max(...data.map((item) => item.end), 1);
  const chartWidth = Math.max(totalTime * 60, 520);
  const tickStep = totalTime > 50 ? Math.ceil(totalTime / 50) : 1;
  const ticks = [];

  for (let time = 0; time <= totalTime; time += tickStep) {
    ticks.push(time);
  }

  if (ticks[ticks.length - 1] !== totalTime) {
    ticks.push(totalTime);
  }

  return (
    <div className="gantt-wrapper">
      <div className="gantt-scroll">
        <div className="gantt-chart" style={{ minWidth: `${chartWidth}px` }}>
          <div className="gantt-axis">
            {ticks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <div className="gantt-rows">
            {data.map((item, index) => {
              const left = (item.start / totalTime) * 100;
              const width = ((item.end - item.start) / totalTime) * 100;

              return (
                <div className="gantt-row" key={`${item.pid}-${index}`}>
                  <div className="gantt-label">{item.pid}</div>
                  <div className="gantt-track">
                    <div
                      className="gantt-block"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        minWidth: "28px",
                      }}
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
      </div>
    </div>
  );
}

export default GanttChart;
