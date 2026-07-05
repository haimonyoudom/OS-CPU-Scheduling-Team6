function AlgorithmSelector({ algorithm, setAlgorithm }) {
  const options = ["FCFS", "SJF", "RR", "SRT", "MLFQ"];

  return (
    <div className="selector-group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`selector-btn ${algorithm === option ? "active" : ""}`}
          onClick={() => setAlgorithm(option)}
        >
          {option}
        </button>
      ))}
      <p className="selector-caption">
        All major scheduling strategies are now available for simulation.
      </p>
    </div>
  );
}

export default AlgorithmSelector;
