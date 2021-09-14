import React, { useEffect, useState } from "react";

function Pad({
  i,
  refAudio,
  padClickHandler,
  sound,
  timer,
  playing,
  soundsPlaying,
  icon,
}) {
  const [padOn, setPadOn] = useState(false);
  useEffect(() => {
    if (playing) {
      if ((timer === 0 || timer % 800 === 0) && soundsPlaying.includes(sound)) {
        sound.play();
        sound.loop = true;
      }
    }
  }, [playing, timer, soundsPlaying, sound]);
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
      {icon}
    </div>
  );
}

export default Pad;
