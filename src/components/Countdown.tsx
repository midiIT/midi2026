import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, type TimeLeft } from '../utils/timeUtils';

const CountdownComponent: React.FC = () => {
  const targetDate = import.meta.env.VITE_MIDI_DATE;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold">
          {padNumber(timeLeft.days)}
        </div>
        <div className="text-lg md:text-xl mt-2">Dienos</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold">
          {padNumber(timeLeft.hours)}
        </div>
        <div className="text-lg md:text-xl mt-2">Valandos</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold">
          {padNumber(timeLeft.minutes)}
        </div>
        <div className="text-lg md:text-xl mt-2">Minutės</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold">
          {padNumber(timeLeft.seconds)}
        </div>
        <div className="text-lg md:text-xl mt-2">Sekundės</div>
      </div>
    </div>
  );
};

export default CountdownComponent;
