import React, { useEffect, useState } from "react";

function Pad({
  i,
  refAudio,
  padClickHandler,
  sound,
  timer,
  playing,
  soundsPlaying,
}) {
  const [padOn, setPadOn] = useState(false);
  useEffect(() => {
    if (playing) {
      if ((timer === 0 || timer % 800 === 0) && soundsPlaying.includes(sound)) {
        sound.play();
        sound.loop = true;
      }
    }
  }, [playing, timer, soundsPlaying]);
  return (
    <div
      className={padOn ? "pad padOn" : "pad"}
      id={`pad-${i + 1}`}
      ref={refAudio}
      onClick={() => {
        setPadOn(!padOn);
        padClickHandler(sound, i);
      }}
    >
      <span className="pad-content">{`No.${i}`}</span>
    </div>
  );
}

export default Pad;
