function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div>
      <label>Select Algorithm: </label>

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="FCFS">FCFS</option>
        <option value="SJF">SJF</option>
        <option value="SRT">SRT</option>
        <option value="RR">RR</option>
        <option value="MLFQ">MLFQ</option>
      </select>
    </div>
  );
}

export default AlgorithmSelector;