import { useState } from "react";

function ProcessForm({ addProcess }) {
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedArrival = Number(arrival);
    const parsedBurst = Number(burst);

    if (
      !pid.trim() ||
      !Number.isFinite(parsedArrival) ||
      !Number.isFinite(parsedBurst) ||
      parsedArrival < 0 ||
      parsedBurst <= 0
    ) {
      alert("Please enter a valid PID, arrival time, and burst time.");
      return;
    }

    addProcess({
      pid: pid.trim(),
      arrival: parsedArrival,
      burst: parsedBurst,
    });

    setPid("");
    setArrival("");
    setBurst("");
  };

  return (
    <form className="process-form" onSubmit={handleSubmit}>
      <label>
        <span>PID</span>
        <input
          placeholder="P1"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
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
