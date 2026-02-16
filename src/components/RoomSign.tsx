import sign from "../assets/sign.webp";
import type { DeviceType } from "../hooks/useResponsiveLayout";
import { useTranslation } from 'react-i18next';

interface RoomSignProps {
  roomId?: string;
  deviceType: DeviceType;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  asButton?: boolean;
  scale?: number;
}

export default function RoomSign({
  roomId,
  deviceType,
  onClick,
  children,
  className = '',
  asButton = false,
  scale = 1,
}: RoomSignProps) {
  const { t } = useTranslation();
  const name = children || (roomId ? t(`roomSigns.${roomId}`) : '') || 'Kambarys';
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

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

  const getBaseHeight = () => {
    if (!asButton) {
      return isMobile ? 60 : 30;
    }
    if (isTablet) return 80;
    if (isMobile) return 60;
    return 60;
  };

  const getBaseFontSize = () => {
    if (isTablet && asButton) return 1.25;
    if (isMobile) return 1;
    return 0.875;
  };

  const getBaseMinWidth = () => {
    if (!asButton) return 0;
    if (isTablet) return 200;
    return 150;
  };

  const height = getBaseHeight() * scale;
  const fontSize = getBaseFontSize() * scale;
  const minWidth = getBaseMinWidth() * scale;

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...positionStyle,
        width: asButton ? 'auto' : (isMobile ? '80%' : '40%'),
        maxWidth: 400 * scale,
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
          minWidth: minWidth > 0 ? `${minWidth}px` : undefined,
          height: `${height}px`,
          objectFit: 'fill',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#f5f5dc',
          fontSize: `${fontSize}rem`,
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          whiteSpace: 'nowrap',
          padding: '0 1rem',
          pointerEvents: 'none',
        }}
      >
        {name}
      </span>
    </div>
  );
}