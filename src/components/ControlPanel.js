import React from "react";

function ControlPanel({ pauseAll, startAll }) {
  return (
    <div className="controlPanel">
      <button onClick={pauseAll}>Pause</button>
      <button onClick={startAll}>Start</button>
    </div>
  );
}

export default ControlPanel;
