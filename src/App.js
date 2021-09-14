import { useState, useEffect, createRef, useRef } from "react";
import "./App.css";
import Pad from "./components/Pad";
import audio from "./audio_loops/120_future_funk_beats_25.mp3"; //GiVintageRobot
import audio2 from "./audio_loops/120_stutter_breakbeats_16.mp3"; //GiEchoRipples
import audio3 from "./audio_loops/Bass Warwick heavy funk groove on E 120 BPM.mp3"; //GiGuitarBassHead
import audio4 from "./audio_loops/FUD_120_StompySlosh.mp3"; //GiDrum
import audio5 from "./audio_loops/electric guitar coutry slide 120bpm - B.mp3"; //GiGuitar
import audio6 from "./audio_loops/GrooveB_120bpm_Tanggu.mp3"; //FaDrumSteelpan
import audio7 from "./audio_loops/MazePolitics_120_Perc.mp3"; //GiMaterialsScience
import audio8 from "./audio_loops/PAS3GROOVE1.03B.mp3"; // FaDrum
import audio9 from "./audio_loops/SilentStar_120_Em_OrganSynth.mp3"; //GiDominoMask
import ControlPanel from "./components/ControlPanel";
import { FaDrum, FaDrumSteelpan } from "react-icons/fa";
import {
  GiDrum,
  GiGuitar,
  GiGuitarBassHead,
  GiEchoRipples,
  GiMaterialsScience,
  GiVintageRobot,
  GiDominoMask,
} from "react-icons/gi";

function App() {
  const [soundsRefs, setSoundsRefs] = useState([]); // list of refs to access the displayed divs
  const [queue, setQueue] = useState([]); // list of the audios
  const [soundsPlaying, setSoundsPlaying] = useState([]); // list of the sounds currently playing
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioList] = useState([
    audio,
    audio2,
    audio3,
    audio4,
    audio5,
    audio6,
    audio7,
    audio8,
    audio9,
  ]);

  const interval = useRef(null);

  const soundIcons = [
    <GiVintageRobot />,
    <GiEchoRipples />,
    <GiGuitarBassHead />,
    <GiDrum />,
    <GiGuitar />,
    <FaDrumSteelpan />,
    <GiMaterialsScience />,
    <FaDrum />,
    <GiDominoMask />,
  ];

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
    setSoundsPlaying([...soundsPlaying, sound]);
  };

  const pauseAll = () => {
    soundsPlaying.map((sound) => {
      sound.pause();
      return (sound.currentTime = 0);
    });
    setPlaying(false);
  };

  const startAll = () => {
    soundsPlaying.map((sound) => sound.play());
    setPlaying(true);
  };

  const stopBoard = () => {
    soundsPlaying.map((sound) => {
      sound.pause();
      return (sound.currentTime = 0);
    });
    setSoundsPlaying([]);
    setPlaying(false);
  };

  useEffect(() => {
    // setting the timer for sync
    if (playing && soundsPlaying.length === 1) {
      interval.current = setInterval(() => setTimer((timer) => timer + 1), 10);
    }
    if (!playing || soundsPlaying.length === 0) {
      clearInterval(interval.current);
      setTimer(0);
    }
  }, [soundsPlaying, playing, interval]);

  useEffect(() => {
    // create refs to all the divs holding a sound
    setSoundsRefs((audioList) => {
      return Array(9)
        .fill()
        .map((_, i) => audioList[i] || createRef());
    });
  }, [audioList]);

  useEffect(() => {
    const tempArr = audioList.map((audio) => new Audio(audio)); // create an array of audio objects
    setQueue(tempArr);
  }, [soundsRefs, audioList]);

  return (
    <div className="loopMachine" key="loopMachine">
      <div className="board" id="board" key="board">
        {queue.map((sound, i) => {
          return (
            <Pad
              key={`pad${i}`}
              i={i}
              refAudio={soundsRefs[i]}
              padClickHandler={padClickHandler}
              sound={sound}
              timer={timer}
              playing={playing}
              soundsPlaying={soundsPlaying}
              icon={soundIcons[i]}
            />
          );
        })}
      </div>
      <ControlPanel
        key="controlPanel"
        pauseAll={pauseAll}
        startAll={startAll}
        stopBoard={stopBoard}
      />
    </div>
  );
}

export default App;
