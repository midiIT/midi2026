import ScrollImage from '../assets/rooms/scroll.png';

interface RoomContentProps {
  background: string;
  children: React.ReactNode;
  scrollImage?: string;
  className?: string;
  darkness?: number;
}

export default function RoomContent({
  background,
  children,
  scrollImage = ScrollImage,
  className = '',
  darkness = 0.5,
}: RoomContentProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${darkness})`,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative"
          style={{
            backgroundImage: `url(${scrollImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: 'min(95%, 900px)',
            height: '95%',
            minHeight: '400px',
          }}
        >
          <div
            className="absolute overflow-y-auto overflow-x-hidden scrollbar-hide"
            style={{
              top: '20%',
              bottom: '20%',
              left: '22%',
              right: '22%',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}