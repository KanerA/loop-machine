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
  const [soundsRefs, setSoundsRefs] = useState([]); // list of refs to access the displayed divs
  const [queue, setQueue] = useState([]); // list of the audios
  const [soundsPlaying, setSoundsPlaying] = useState([]); // list of the sounds currently playing
  const [playing, setPlaying] = useState(false);
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

  const padClickHandler = (sound, i) => {
    if (!playing) {
      // create queue if the board is on pause
      return setSoundsPlaying([...soundsPlaying, sound]);
    }
    const alreadyPlaying = soundsPlaying.findIndex(
      (soundElem) => soundElem === sound
    );

    if (alreadyPlaying > -1) {
      // if the song is playing, pause it
      sound.loop = !sound.loop;
      sound.pause();
      const updatedSoundsPlaying = soundsPlaying.filter(
        // remove paused song from playing list
        (_, i) => i !== alreadyPlaying
      );
      return setSoundsPlaying(updatedSoundsPlaying);
    }
    sound.loop = !sound.loop;
    sound.play();
    setSoundsPlaying([...soundsPlaying, sound]);
  const pauseAll = () => {
    soundsPlaying.map((sound) => sound.pause());
    setPlaying(false);
  };

  const startAll = () => {
    soundsPlaying.map((sound) => sound.play());
    setPlaying(true);
  };

  useEffect(() => {
    // create refs to all the divs holding a sound
    setSoundsRefs((audioList) => {
      return Array(9)
        .fill()
        .map((_, i) => audioList[i] || createRef());
    });
  }, []);

  useEffect(() => {
    const tempArr = audioList.map((audio) => new Audio(audio)); // create an array of audio objects
    setQueue(tempArr);
  }, [soundsRefs]);

  return (
    <>
      <div className="loopMachine" style={loopMachineStyles}>
        {queue.map((sound, i) => {
          return (
            <div
              key={`pad-${i}`}
              id={`pad-${i + 1}`}
              ref={soundsRefs[i]}
              style={styles}
              onClick={() => padClickHandler(sound, i)}
            >
              Click Me {`No.${i + 1}`}
            </div>
          );
        })}
      </div>
      <button onClick={pauseAll}>Pause</button>
      <button onClick={startAll}>Start</button>
    </>
  );
}

export default App;
