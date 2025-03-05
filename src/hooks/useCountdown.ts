import { useEffect, useState } from "react";

export function useCountdown(targetTime: number) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    let animationFrame: number;

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(targetTime));
      if (timeLeft.total > 0) {
        animationFrame = requestAnimationFrame(updateCountdown);
      }
    };

    animationFrame = requestAnimationFrame(updateCountdown);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetTime]);

  return timeLeft;
}

function calculateTimeLeft(targetTime: number) {
  const now = Date.now();
  const timeDifference = targetTime * 1000 - now;

  if (timeDifference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  return {
    total: timeDifference,
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
    seconds: Math.floor((timeDifference / 1000) % 60),
    expired: false,
  };
}
