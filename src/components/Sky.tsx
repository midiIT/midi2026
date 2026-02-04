import moon from '../assets/background/moon.webp';
import stars from '../assets/background/stars.webp';

export default function Sky() {
  const starPositions = [0, 25, 50, 75];

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <img 
        src={moon} 
        alt=""
        className="absolute"
        style={{
          top: '5%',
          right: '10px',
          width: '120px',
          height: 'auto',
          opacity: 0.9,
        }}
      />

      {starPositions.map((marginLeft) => (
        <img 
          key={marginLeft}
          src={stars} 
          alt=""
          className="absolute animate-pulse"
          style={{
            top: '-3%',
            width: '25%',
            height: '40%',
            opacity: 0.5,
            animationDuration: '5s',
            marginLeft: `${marginLeft}%`,
          }}
        />
      ))}
    </div>
  );
}