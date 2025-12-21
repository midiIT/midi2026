import Wall from './Wall';

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
}: RoomProps) {
  const width = widthTiles * tileSize;
  const height = heightTiles * tileSize;

  return (
    <div className="relative" style={{ width, height }}>
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
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}