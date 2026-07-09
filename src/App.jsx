import { useState } from "react";

import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import GanttChart from "./components/GanttChart";
import AlgorithmSelector from "./components/AlgorithmSelector";
import MetricsTable from "./components/MetricsTable";
import { sjf } from "./algorithms/sjf";
import { fcfs } from "./algorithms/fcfs";
import { rr } from "./algorithms/rr";
import { srt } from "./algorithms/srt";
import { mlfq } from "./algorithms/mlfq";
import "./App.css";

function App() {
  const [processes, setProcesses] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [rrQuantum, setRrQuantum] = useState(2);
  const [metrics, setMetrics] = useState([]);
  const [averages, setAverages] = useState(null);
  const [lastRun, setLastRun] = useState(null);

  const addProcess = (process) => {
    setProcesses((prev) => [...prev, process]);
  };

  const deleteProcess = (indexToRemove) => {
    setProcesses((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const resetSimulation = () => {
    setProcesses([]);
    setGanttData([]);
    setMetrics([]);
    setAverages(null);
    setLastRun(null);
    setRrQuantum(2);
  };

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process before running the simulation.");
      return;
    }

    let result;

    switch (algorithm) {
      case "FCFS":
        result = fcfs(processes);
        break;
      case "SJF":
        result = sjf(processes);
        break;
      case "RR":
        result = rr(processes, rrQuantum);
        break;
      case "SRT":
        result = srt(processes);
        break;
      case "MLFQ":
        result = mlfq(processes);
        break;
      default:
        alert(`${algorithm} is coming soon.`);
        return;
    }

    setGanttData(result.gantt);
    setMetrics(result.metrics);
    setAverages(result.averages);
    setLastRun({ algorithm, processCount: processes.length });
  };

  return (
    <div className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">OS Lab Project</p>
          <h1>CPU Scheduling Simulator</h1>
          <p className="hero-copy">
            Visualize how different scheduling strategies handle arrival and
            burst times with an interactive timeline and performance metrics.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <span>{processes.length}</span>
            <small>Processes</small>
          </div>
          <div>
            <span>{algorithm}</span>
            <small>Selected</small>
          </div>
          <div>
            <span>{ganttData.length ? ganttData.length : 0}</span>
            <small>Timeline Blocks</small>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Step 1</p>
              <h2>Add processes</h2>
            </div>
          </div>

          <ProcessForm addProcess={addProcess} />
          <ProcessTable processes={processes} onDeleteProcess={deleteProcess} />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Step 2</p>
              <h2>Choose an algorithm</h2>
            </div>
          </div>

          <AlgorithmSelector
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />

          {algorithm === "RR" && (
            <div className="quantum-row">
              <label>
                <span>Time Quantum</span>
                <input
                  type="number"
                  min="1"
                  value={rrQuantum}
                  onChange={(e) =>
                    setRrQuantum(Math.max(1, Number(e.target.value) || 1))
                  }
                />
              </label>
            </div>
          )}

          <div className="action-row">
            <button className="primary-btn" onClick={runSimulation}>
              Run simulation
            </button>
            <button className="secondary-btn" onClick={resetSimulation}>
              Reset
            </button>
          </div>

          <div className="status-card">
            <p className="panel-kicker">Current mode</p>
            <h3>{algorithm}</h3>
            {lastRun ? (
              <p>
                Last run: {lastRun.algorithm} for {lastRun.processCount}{" "}
                process(es).
              </p>
            ) : (
              <p>
                Choose an algorithm and run the simulator to generate a
                timeline.
              </p>
            )}
          </div>
        </section>
      </main>

      <section className="results-grid">
        <div className="panel wide-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Step 3</p>
              <h2>Gantt chart</h2>
            </div>
          </div>
          <GanttChart data={ganttData} />
        </div>

        <div className="panel wide-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Step 4</p>
              <h2>Performance metrics</h2>
            </div>
          </div>
          <MetricsTable metrics={metrics} averages={averages} />
        </div>
      </section>
    </div>
  );
}

export default App;
