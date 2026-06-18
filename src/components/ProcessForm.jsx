import { useState } from "react";

function ProcessForm({ addProcess }) {
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addProcess({
      pid,
      arrival: Number(arrival),
      burst: Number(burst),
    });

    setPid("");
    setArrival("");
    setBurst("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="PID"
        value={pid}
        onChange={(e) => setPid(e.target.value)}
      />

      <input
        type="number"
        placeholder="Arrival"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
      />

      <input
        type="number"
        placeholder="Burst"
        value={burst}
        onChange={(e) => setBurst(e.target.value)}
      />

      <button type="submit">
        Add Process
      </button>
    </form>
  );
}

export default ProcessForm;