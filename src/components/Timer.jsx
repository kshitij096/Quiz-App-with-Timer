import React, { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeout, running }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setTimeout(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          onTimeout();
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [time, running, onTimeout]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  return (
    <div className="text-2xl font-bold">
      Time left: {Math.floor(time / 60)}:
      {time % 60 < 10 ? `0${time % 60}` : time % 60}
    </div>
  );
};

export default Timer;
