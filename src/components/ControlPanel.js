import React from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";

function ControlPanel({ pauseAll, startAll, stopBoard }) {
  return (
    <div className="controlPanel">
      <button className="button" onClick={startAll}>
        <FaPlay />
      </button>
      <button className="button" onClick={pauseAll}>
        <FaPause />
      </button>
      <button className="button" onClick={stopBoard}>
        <FaStop />
      </button>
    </div>
  );
}

export default ControlPanel;
