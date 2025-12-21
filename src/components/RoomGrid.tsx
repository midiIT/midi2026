import Room from './Room';
import useResponsiveTiles from '../hooks/useResponsiveTiles';

interface RoomData {
  id: string | number;
  content: React.ReactNode;
  background?: string;
  className?: string;
}

interface RoomGridProps {
  rooms: RoomData[];
}

export default function RoomGrid({ rooms }: RoomGridProps) {
  const { tileSize, tilesX, tilesY, columns, isMobile } = useResponsiveTiles();

  const rows: RoomData[][] = [];
  for (let i = 0; i < rooms.length; i += columns) {
    rows.push(rooms.slice(i, i + columns));
  }

  const totalRows = rows.length;

  const horizontalPadding = isMobile ? tileSize * 0.25 : tileSize;
  const topPadding = isMobile ? tileSize * 0.5 : tileSize;

  return (
    <div
      className="flex flex-col items-center mt-auto"
      style={{ 
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        paddingTop: topPadding,
        paddingBottom: '10px', // Extra bottom padding for aesthetics
      }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={isMobile ? 'flex flex-col' : 'flex flex-row'}
          style={{ marginBottom: rowIndex === totalRows - 1 ? 0 : -tileSize }}
        >
          {row.map((room, colIndex) => {
            const isFirstRow = rowIndex === 0;
            const isLastRow = rowIndex === totalRows - 1;
            const isFirstCol = colIndex === 0;
            const isLastCol = colIndex === row.length - 1;

            let isExteriorTop: boolean;
            let isExteriorBottom: boolean;
            let isExteriorLeft: boolean;
            let isExteriorRight: boolean;

            if (isMobile) {
              // Mobile: vertical tower
              isExteriorTop = isFirstRow && isFirstCol;
              isExteriorBottom = isLastRow && isLastCol;
              isExteriorLeft = true;
              isExteriorRight = true;
            } else {
              // Desktop: grid of rooms
              isExteriorTop = isFirstRow;
              isExteriorBottom = isLastRow;
              isExteriorLeft = isFirstCol;
              isExteriorRight = isLastCol;
            }

            return (
              <div
                key={room.id}
                style={{ 
                  marginRight: (isMobile || isLastCol) ? 0 : -tileSize,
                  zIndex: rowIndex * 10 + colIndex
                }}
              >
                <Room
                  widthTiles={tilesX}
                  heightTiles={tilesY}
                  tileSize={tileSize}
                  isExteriorTop={isExteriorTop}
                  isExteriorBottom={isExteriorBottom}
                  isExteriorLeft={isExteriorLeft}
                  isExteriorRight={isExteriorRight}
                  background={room.background}
                  className={room.className}
                >
                  {room.content}
                </Room>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}