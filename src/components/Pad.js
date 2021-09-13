import React, { useEffect } from "react";

function Pad({
  i,
  refAudio,
  styles,
  padClickHandler,
  sound,
  timer,
  playing,
  soundsPlaying,
}) {
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
      key={`pad-${i}`}
      id={`pad-${i + 1}`}
      ref={refAudio}
      style={styles}
      onClick={() => padClickHandler(sound, i)}
    >
      {`No.${i}`}
    </div>
  );
}

export default Pad;
