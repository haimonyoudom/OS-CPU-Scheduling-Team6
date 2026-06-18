import { useState } from "react";

import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import GanttChart from "./components/GanttChart";
import AlgorithmSelector from "./components/AlgorithmSelector";
import MetricsTable from "./components/MetricsTable";
import { sjf } from "./algorithms/sjf";

import { fcfs } from "./algorithms/fcfs";

function App() {
  const [processes, setProcesses] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [metrics, setMetrics] = useState([]);
  const [averages, setAverages] = useState(null);

  const addProcess = (process) => {
    setProcesses((prev) => [...prev, process]);
  };

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process.");
      return;
    }

    let result;

    switch (algorithm) {
      case "FCFS":
        result = fcfs(processes);

        setGanttData(result.gantt);
        setMetrics(result.metrics);
        setAverages(result.averages);
        break;

      case "SJF":
        result = sjf(processes);
        break;

      case "SRT":
        alert("SRT not implemented yet");
        return;

      case "RR":
        alert("RR not implemented yet");
        return;

      case "MLFQ":
        alert("MLFQ not implemented yet");
        return;

      default:
        return;
    }
    setGanttData(result.gantt);
    setMetrics(result.metrics);
    setAverages(result.averages);
  };

  return (
    <div>
      <h1>CPU Scheduling Simulator</h1>

      <ProcessForm addProcess={addProcess} />

      <ProcessTable processes={processes} />

      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />

      <button onClick={runSimulation}>Run Simulation</button>
      <h2>Current Algorithm: {algorithm}</h2>
      <GanttChart data={ganttData} />
      <MetricsTable metrics={metrics} averages={averages} />
    </div>
  );
}

export default App;
