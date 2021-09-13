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
