import sign from "../assets/sign.png";
import type { DeviceType } from "../hooks/useResponsiveLayout";

interface RoomSignProps {
  roomId?: string;
  deviceType: DeviceType;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  asButton?: boolean;
}

const roomNames: Record<string, string> = {
  '1': 'Veiklos',
  '2': 'Rėmėjai',
  '3': 'Komanda',
  '4': 'MIDI tinklai',
  '5': 'RO tinklai',
  '6': 'Bendradarbiavimas',
};

export default function RoomSign({ 
  roomId, 
  deviceType, 
  onClick, 
  children,
  className = '',
  asButton = false,
}: RoomSignProps) {
  const name = children || (roomId ? roomNames[roomId] : '') || 'Kambarys';
  const isMobile = deviceType === 'mobile';

  const positionStyle = asButton 
    ? {
        position: 'relative' as const,
        transform: 'none',
        left: 'auto',
        bottom: 'auto'
      }
    : {
        position: 'absolute' as const,
        bottom: isMobile ? '8%' : '0%',
        left: '50%',
        transform: 'translateX(-50%)',
      };

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...positionStyle,
        width: asButton ? 'auto' : (isMobile ? '80%' : '40%'),
        maxWidth: '400px',
        zIndex: 100,
        cursor: onClick ? 'pointer' : 'default',
        display: asButton ? 'inline-block' : 'block', 
      }}
    >
      <img
        src={sign}
        alt=""
        style={{
          width: '100%',
          minWidth: asButton ? '150px' : undefined,
          height: asButton ? '60px' : (isMobile ? '60px' : '30px'),
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
          padding: '0 1rem',
        }}
      >
        {name}
      </span>
    </div>
  );
}