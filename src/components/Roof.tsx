import roof from '../assets/background/roof.png';

interface RoofProps {
  roofWidth: number;
  roofHeight: number;
  columns: number;
  tileSize: number;
}

export default function Roof({ roofWidth, roofHeight, columns, tileSize }: RoofProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: -tileSize,
        zIndex: 20,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          style={{
            width: roofWidth,
            height: roofHeight,
            marginLeft: index > 0 ? -tileSize : 0,
          }}
        >
          <img 
            src={roof} 
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              paddingBottom: tileSize / 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}