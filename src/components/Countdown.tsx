import { useState, useEffect } from 'react';
import { calculateTimeLeft, type TimeLeft } from '../utils/timeUtils';
import type { DeviceType } from '../hooks/useResponsiveLayout';

interface CountdownProps {
  deviceType: DeviceType;
}

export default function Countdown({ deviceType }: CountdownProps) {
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

  const isMobile = deviceType === 'mobile';

  const timeUnits = [
    { value: timeLeft.days, label: 'Dienos' },
    { value: timeLeft.hours, label: 'Valandos' },
    { value: timeLeft.minutes, label: 'Minutės' },
    { value: timeLeft.seconds, label: 'Sekundės' },
  ];

  return (
    <div className="flex flex-col items-center py-2">
      <div 
        className="text-amber-100 font-bold mb-1 pt-10"
        style={{
          fontSize: isMobile ? '2rem' : '3rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        IKI MIDI LIKO
      </div>

      <div className={`grid grid-cols-4 ${isMobile ? 'gap-2' : 'gap-6'}`}>
        {timeUnits.map((unit, index) => (
          <div key={index} className="flex flex-col items-center pb-10">
            <div
              className="font-bold text-white"
              style={{
                fontSize: isMobile ? '3rem' : '5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {padNumber(unit.value)}
            </div>
            <div
              className="text-amber-100"
              style={{
                fontSize: isMobile ? '1.2rem' : '1.75rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}