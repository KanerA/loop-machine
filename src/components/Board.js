import React from "react";
import Pad from "./Pad";

function Board({
  soundsRefs,
  padClickHandler,
  timer,
  playing,
  soundsPlaying,
  soundIcons,
  queue,
  stopped,
}) {
  return (
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
            stopped={stopped}
          />
        );
      })}
    </div>
  );
}

export default Board;
