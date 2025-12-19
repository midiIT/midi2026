import stoneTile from '../assets/stoneTile.jpg';

interface RoomProps {
  children: React.ReactNode;
  tilesX?: number;
  tilesY?: number;
  tileSize?: number;
  className?: string;
  mergeTop?: boolean;
  mergeLeft?: boolean;
}

function Room({ children, tilesX = 10, tilesY = 4, tileSize = 24, className = '', mergeTop = false, mergeLeft = false }: RoomProps) {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        padding: tileSize,
        marginTop: mergeTop ? -tileSize : 0,
        marginLeft: mergeLeft ? -tileSize : 0,
        width: (tilesX + 2) * tileSize,
      }}
    >
      {/* Top wall */}
      <div className="absolute top-0 left-0 right-0 flex">
        {[...Array(tilesX + 2)].map((_, i) => (
          <img key={`top-${i}`} src={stoneTile} className="object-cover" style={{ width: tileSize, height: tileSize }} />
        ))}
      </div>

      {/* Bottom wall */}
      <div className="absolute bottom-0 left-0 right-0 flex">
        {[...Array(tilesX + 2)].map((_, i) => (
          <img key={`bottom-${i}`} src={stoneTile} className="object-cover" style={{ width: tileSize, height: tileSize }} />
        ))}
      </div>

      {/* Left wall */}
      <div 
        className="absolute left-0 flex flex-col"
        style={{ top: tileSize, bottom: tileSize }}
      >
        {[...Array(tilesY)].map((_, i) => (
          <img key={`left-${i}`} src={stoneTile} className="object-cover" style={{ width: tileSize, height: tileSize }} />
        ))}
      </div>

      {/* Right wall */}
      <div 
        className="absolute right-0 flex flex-col"
        style={{ top: tileSize, bottom: tileSize }}
      >
        {[...Array(tilesY)].map((_, i) => (
          <img key={`right-${i}`} src={stoneTile} className="object-cover" style={{ width: tileSize, height: tileSize }} />
        ))}
      </div>

      {/* Content */}
      <div 
        className="relative z-10 bg-sky-800 flex items-center justify-center"
        style={{ 
          width: tilesX * tileSize, 
          height: tilesY * tileSize,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Room;