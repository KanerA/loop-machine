import { useState, useEffect, createRef } from "react";
import "./App.css";
import audio from "./audio_loops/120_future_funk_beats_25.mp3";
import audio2 from "./audio_loops/120_stutter_breakbeats_16.mp3";
import audio3 from "./audio_loops/Bass Warwick heavy funk groove on E 120 BPM.mp3";
import audio4 from "./audio_loops/electric guitar coutry slide 120bpm - B.mp3";
import audio5 from "./audio_loops/FUD_120_StompySlosh.mp3";
import audio6 from "./audio_loops/GrooveB_120bpm_Tanggu.mp3";
import audio7 from "./audio_loops/MazePolitics_120_Perc.mp3";
import audio8 from "./audio_loops/PAS3GROOVE1.03B.mp3";
import audio9 from "./audio_loops/SilentStar_120_Em_OrganSynth.mp3";

function App() {
  const audioList = [
    audio,
    audio2,
    audio3,
    audio4,
    audio5,
    audio6,
    audio7,
    audio8,
    audio9,
  ];

  const styles = {
    // basic style for visible pads
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "1px solid purple",
  };
  const loopMachineStyles = {
    // basic style for looks of pads grid
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "100px 100px 100px",
  };

  return (
    <div className="loopMachine" style={loopMachineStyles}>
      {audioList.map((sound, i) => {
        return (
          <div key={`pad-${i}`} id={`pad-${i + 1}`} style={styles}>
            Click Me {`No.${i + 1}`}
          </div>
        );
      })}
    </div>
  );
}

export default App;
