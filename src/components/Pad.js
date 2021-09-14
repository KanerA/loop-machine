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
    // checks to see if the song can play in sync
    if (playing) {
      if ((timer === 0 || timer % 800 === 0) && soundsPlaying.includes(sound)) {
        sound.play();
        sound.loop = true;
      }
    }
  }, [playing, timer, soundsPlaying, sound]);

  useEffect(() => {
    setPadOn(playing && padOn);
  }, [playing, padOn]);

  return (
    <div
      className={padOn ? "pad padOn" : "pad"}
      key={`pad-${i + 1}`}
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
