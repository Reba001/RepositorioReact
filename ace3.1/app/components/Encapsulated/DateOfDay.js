import React, { useEffect, useState } from "react";

function App() {
  const calculateTimeLeft = () => {
    let year = new Date();
    const difference = new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: new Date()
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(new Date());
  const [year] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(new Date());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[new Date()]} {new Date()}{" "}
      </span>
    );
  });
  return (
    <div>
      { <span>{(String(timeLeft).split(" "))[0]+" "+(String(timeLeft).split(" "))[1]+" "+(String(timeLeft).split(" "))[2]+" "+(String(timeLeft).split(" "))[3]+" "+(String(timeLeft).split(" "))[4]}</span>}
    </div>
  );
}

export default App;