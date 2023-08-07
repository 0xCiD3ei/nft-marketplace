import {useEffect, useState} from "react";

const useCountDownTime = (endTime) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    let timeLeft = 0;
    if (now < endTime * 1000) {
      timeLeft = endTime * 1000 - now;
    }
    return timeLeft;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime]);
  
  const formatTimeLeft = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  };
  
  return formatTimeLeft(timeLeft);
};

export default useCountDownTime;
