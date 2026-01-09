import useInView from '../hooks/useInView';
import Curtains from './Curtains';
import Wall from './Wall';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoomProps {
  children: React.ReactNode;
  widthTiles: number;
  heightTiles: number;
  tileSize: number;
  isExteriorTop?: boolean;
  isExteriorBottom?: boolean;
  isExteriorLeft?: boolean;
  isExteriorRight?: boolean;
  background?: string;
  className?: string;
  room?: { id: string };
}

export default function Room({
  children,
  widthTiles,
  heightTiles,
  tileSize,
  isExteriorTop = true,
  isExteriorBottom = true,
  isExteriorLeft = true,
  isExteriorRight = true,
  background,
  className,
  room,
}: RoomProps) {
  const width = widthTiles * tileSize;
  const height = heightTiles * tileSize;
  const [ref, inView] = useInView();

  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleRoomClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const roomId = room?.id ?? 'unknown';
    
    // Get click position relative to the room
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate viewport center
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    
    // Calculate offset needed to move room center to viewport center
    const offsetX = viewportCenterX - centerX;
    const offsetY = viewportCenterY - centerY;
    
    setClickPosition({ x: offsetX, y: offsetY });
    setIsZooming(true);
    
    // Wait for animation to complete before navigating
    await new Promise(resolve => setTimeout(resolve, 400));
    navigate(`/room/${roomId}`);
  };

  return (
    <div 
      ref={ref} 
      className="relative group" 
      style={{ width, height }}
    >
      {/* Zoom animation wrapper - wraps entire room */}
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
        <Wall
          tileSize={tileSize}
          widthTiles={widthTiles}
          heightTiles={heightTiles}
          isExteriorTop={isExteriorTop}
          isExteriorBottom={isExteriorBottom}
          isExteriorLeft={isExteriorLeft}
          isExteriorRight={isExteriorRight}
        />

        {/* Background */}
        <div
          className={className}
          style={{
            position: 'absolute',
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            pointerEvents: 'none',
            background: background || 'transparent',
            zIndex: 4,
          }}
        />

        {/* Content */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {children}
        </div>

        {/* Clickable overlay for room - positioned to cover interior only */}
        <div
          onClick={handleRoomClick}
          className="absolute cursor-pointer"
          style={{
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            zIndex: 50,
          }}
        />

        <Curtains className={className} inView={inView}/>
        
        
      </div>
    </div>
  );
}