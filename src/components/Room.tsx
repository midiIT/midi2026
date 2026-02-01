import useInView from '../hooks/useInView';
import Curtains from './Curtains';
import Cat from './Cat';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DeviceType } from '../hooks/useResponsiveLayout';
import RoomSign from './RoomSign';

interface RoomProps {
  children: React.ReactNode;
  width: number;
  height: number;
  windowImage: string;
  deviceType: DeviceType;
  background?: string;
  className?: string;
  room?: { id: string };
  isActive?: boolean;
  onRoomTap?: (roomId: string) => 'activate' | 'navigate';
}

const roomMessages: Record<string, string> = {
  '1': 'Paspausk ant šito kambario ir sužinok apie MIDI veiklas',
  '2': 'Paspausk ant šito kambario ir sužinok apie MIDI rėmėjus',
  '3': 'Paspausk ant šito kambario ir sužinok apie MIDI komandą',
  '4': 'Paspausk ant šito kambario ir sužinok apie MIDI socialinius tinklus',
  '5': 'Paspausk ant šito kambario ir sužinok apie RO socialinius tinklus',
  '6': 'Paspausk ant šito kambario ir sužinok apie bendradarbiavimo pasiūlymus',
};

export default function Room({
  children,
  width,
  height,
  windowImage,
  deviceType,
  background,
  className,
  room,
  isActive = false,
  onRoomTap,
}: RoomProps) {
  const [refView, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const contentInset =
    deviceType === 'mobile'
      ? { top: '12%', bottom: '8%', left: '18%', right: '18%' }
      : { top: '15%', bottom: '10%', left: '30%', right: '30%' };

  const isRoomOpen = (() => {
    switch (deviceType) {
      case 'mobile':
        return inView;
      case 'tablet':
        return isActive;
      case 'desktop':
        return isHovered;
    }
  })();

  const handleRoomClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const roomId = room?.id ?? 'unknown';
    const action = onRoomTap?.(roomId) ?? 'navigate';
    
    if (action === 'activate') {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    setClickPosition({
      x: viewportCenterX - centerX,
      y: viewportCenterY - centerY,
    });

    setIsZooming(true);

    await new Promise(resolve => setTimeout(resolve, 400));
    navigate(`/room/${roomId}`);
  };

  const navigateToRoom = async () => {
    const roomId = room?.id ?? 'unknown';
    
    const action = onRoomTap?.(roomId) ?? 'navigate';
    if (action === 'activate') {
      return;
    }

    setIsZooming(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    navigate(`/room/${roomId}`);
  };

  return (
    <div
      ref={refView}
      className="relative group"
      style={{ width, height, overflow: isZooming ? 'visible' : 'hidden' }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          transformOrigin: 'center',
          transform: isZooming
            ? `translate(${clickPosition.x}px, ${clickPosition.y}px) scale(3)`
            : 'translate(0, 0) scale(1)',
          opacity: isZooming ? 0.5 : 1,
          zIndex: isZooming ? 99999 : 'auto',
          pointerEvents: isZooming ? 'none' : 'auto',
        }}
      >
        <img
          src={windowImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 10 }}
        />

        <div
          className={className}
          style={{
            position: 'absolute',
            ...contentInset,
            pointerEvents: 'none',
            background: background || 'transparent',
            zIndex: 0,
          }}
        />

        <div
          className="absolute flex items-center justify-center"
          style={{
            ...contentInset,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {children}
        </div>

        <div
          onClick={handleRoomClick}
          className="absolute cursor-pointer"
          style={{
            ...contentInset,
            zIndex: 50,
            pointerEvents: 'auto',
          }}
        />

        <Curtains
          deviceType={deviceType}
          isRoomOpen={isRoomOpen}
          contentInset={contentInset}
          roomId={room?.id ?? 'unknown'}
        />

        <Cat
          deviceType={deviceType}
          isVisible={isRoomOpen}
          contentInset={contentInset}
          message={roomMessages[room?.id ?? ''] || 'Miau!'}
          onRoomClick={navigateToRoom}
        />

        <RoomSign 
          roomId={room?.id ?? '1'} 
          deviceType={deviceType} 
          onClick={navigateToRoom}
        />
      </div>
    </div>
  );
}