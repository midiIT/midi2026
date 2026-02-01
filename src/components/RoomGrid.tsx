import { useState } from 'react';
import Room from './Room';
import useResponsiveLayout from '../hooks/useResponsiveLayout';
import Roof from './Roof';
import Countdown from './Countdown';

interface RoomData {
  id: string | number;
  content: React.ReactNode;
  background?: string;
  className?: string;
  room?: { id: string };
}

interface RoomGridProps {
  rooms: RoomData[];
}

export default function RoomGrid({ rooms }: RoomGridProps) {
  const { deviceType, columns, roomWidth, roomHeight, windowImage } =
    useResponsiveLayout();

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const handleRoomTap = (roomId: string): 'activate' | 'navigate' => {
    if (deviceType !== 'tablet') {
      return 'navigate';
    }

    if (activeRoomId !== roomId) {
      setActiveRoomId(roomId);
      return 'activate';
    }

    return 'navigate';
  };

  const rows: RoomData[][] = [];
  for (let i = 0; i < rooms.length; i += columns) {
    rows.push(rooms.slice(i, i + columns));
  }

  const roofWidth = deviceType === 'mobile' ? roomWidth * 1.1 : roomWidth * 1.03;
  const roofHeight = deviceType === 'mobile' ? roomWidth * 0.4 : roomWidth / 2;

  return (
    <div 
      className="flex flex-col items-center mt-auto"
      style={{
        width: deviceType === 'mobile' ? '100%' : 'auto',
        overflow: 'hidden',
        paddingBottom: deviceType === 'mobile' ? 0 : '1rem',
      }}
    >
      <Countdown deviceType={deviceType} />

      <Roof
        roofWidth={roofWidth}
        roofHeight={roofHeight}
        columns={columns}
      />

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex ${deviceType === 'mobile' ? 'flex-col' : 'flex-row'} gap-0`}
          style={{
            width: deviceType === 'mobile' ? '100%' : 'auto',
            zIndex: 6 - rowIndex,
          }}
        >
          {row.map((room) => {
            const roomId = room.room?.id ?? String(room.id);

            return (
              <Room
                key={room.id}
                width={roomWidth}
                height={roomHeight}
                windowImage={windowImage}
                deviceType={deviceType}
                background={room.background}
                className={room.className}
                room={room.room ?? { id: roomId }}
                isActive={activeRoomId === roomId}
                isBase={rowIndex === rows.length - 1}
                onRoomTap={handleRoomTap}
              >
                {room.content}
              </Room>
            );
          })}
        </div>
      ))}
    </div>
  );
}