import Room from './Room';
import useResponsiveTiles from '../hooks/useResponsiveTiles';

interface RoomData {
  id: string | number;
  content: React.ReactNode;
}

interface RoomGridProps {
  rooms: RoomData[];
}

function RoomGrid({ rooms }: RoomGridProps) {
  const { tileSize, tilesX, tilesY, columns, isMobile } = useResponsiveTiles();

  // Split rooms into rows based on columns
  const rows: RoomData[][] = [];
  for (let i = 0; i < rooms.length; i += columns) {
    rows.push(rooms.slice(i, i + columns));
  }

  return (
    <div className="flex flex-col items-center mt-auto">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={isMobile ? 'flex flex-col' : 'flex flex-row'}
          style={{ marginTop: rowIndex > 0 ? -tileSize : 0 }}
        >
          {row.map((room, colIndex) => (
            <div
              key={room.id}
              style={{
                marginTop: isMobile && colIndex > 0 ? -tileSize : 0,
                marginLeft: !isMobile && colIndex > 0 ? -tileSize : 0,
              }}
            >
              <Room tilesX={tilesX} tilesY={tilesY} tileSize={tileSize}>
                {room.content}
              </Room>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RoomGrid;