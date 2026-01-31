import roof from '../assets/background/roof.png';

interface RoofProps {
  roofWidth: number;
  roofHeight: number;
  columns: number;
}

export default function Roof({ roofWidth, roofHeight, columns }: RoofProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: -24,
        zIndex: 20,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          style={{
            width: roofWidth * 1.05,
            height: roofHeight,
            marginLeft: index === 0 ? 0 : -20,
          }}
        >
          <img 
            src={roof} 
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
            }}
          />
        </div>
      ))}
    </div>
  );
}