import { useState } from "react";

function ProcessForm({ addProcess, processCount }) {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const nextPid = `P${processCount + 1}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedArrival = Number(arrival);
    const parsedBurst = Number(burst);

    if (
      !Number.isFinite(parsedArrival) ||
      !Number.isFinite(parsedBurst) ||
      parsedArrival < 0 ||
      parsedBurst <= 0
    ) {
      alert("Please enter a valid arrival time and burst time.");
      return;
    }

    addProcess({
      pid: nextPid,
      arrival: parsedArrival,
      burst: parsedBurst,
    });

    setArrival("");
    setBurst("");
  };

  return (
    <form className="process-form" onSubmit={handleSubmit}>
      <label>
        <span>PID</span>
        <input disabled value={nextPid} />
      </label>

      <label>
        <span>Arrival</span>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
      </label>

      <label>
        <span>Burst</span>
        <input
          type="number"
          min="1"
          placeholder="4"
          value={burst}
          onChange={(e) => setBurst(e.target.value)}
        />
      </label>

      <button className="primary-btn" type="submit">
        Add process
      </button>
    </form>
  );
}

export default ProcessForm;
