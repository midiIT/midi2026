import sign from "../assets/sign.png";
import type { DeviceType } from "../hooks/useResponsiveLayout";

interface RoomSignProps {
  roomId: string;
  deviceType: DeviceType;
  onClick?: () => void;
}

const roomNames: Record<string, string> = {
  '1': 'Veiklos',
  '2': 'Rėmėjai',
  '3': 'Komanda',
  '4': 'MIDI tinklai',
  '5': 'RO tinklai',
  '6': 'Bendradarbiavimas',
};

export default function RoomSign({ roomId, deviceType, onClick }: RoomSignProps) {
  const name = roomNames[roomId] || 'Kambarys';

  const isMobile = deviceType === 'mobile';

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        bottom: isMobile ? '8%' : '0%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '80%' : '40%',
        maxWidth: '400px',
        zIndex: 100,
        cursor: 'pointer',
      }}
    >
        <img
            src={sign}
            alt=""
            style={{
                width: '100%',
                height: isMobile ? '60px' : '30px',
                objectFit: 'fill',
                display: 'block',
            }}
        />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#f5f5dc',
          fontSize: isMobile ? '1rem' : '0.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </div>
  );
}