import { useState, useEffect } from "react";
import cat1 from "../assets/cat1.png";
import cat3 from "../assets/cat3.png";
import type { DeviceType } from "../hooks/useResponsiveLayout";

interface CatProps {
  deviceType: DeviceType;
  isVisible: boolean;
  contentInset: { top: string; bottom: string; left: string; right: string };
  isBase?: boolean;
  message?: string;
  onRoomClick?: () => void;
}

export default function Cat({ 
  deviceType, 
  isVisible, 
  contentInset, 
  message = "Miau!", 
  isBase,
  onRoomClick,
}: CatProps) {
  const [state, setState] = useState<'sleeping' | 'talking'>('sleeping');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
  if (!isVisible) {
      const timer = setTimeout(() => setState('sleeping'), 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setState('talking');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (state === 'talking' && isVisible) {
      const timer = setTimeout(() => setShowBubble(true), 750);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowBubble(false), 0);
      return () => clearTimeout(timer);
    }
  }, [state, isVisible]);

  const handleClick = () => {
    onRoomClick?.();
  };

  const getCatImage = () => {
    return state === 'talking' ? cat3 : cat1;
  };

  const catSize = deviceType === 'mobile' ? '6rem' : '4rem';
  const catMarginBottom = deviceType === 'mobile' ? (isBase ? 'calc(90% + 2vh)' : '2vh') : '0';

  return (
    <div
      className="absolute"
      style={{
        top: contentInset.top,
        bottom: contentInset.bottom,
        left: contentInset.left,
        right: contentInset.right,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2000,
      }}
    >
      <div style={{ position: 'relative', marginBottom: catMarginBottom }}>
        <img
          src={getCatImage()}
          onClick={handleClick}
          alt="Cat"
          className={`h-auto object-contain cursor-pointer transition-opacity duration-500 ${
            isVisible ? 'opacity-100 delay-[800ms]' : 'opacity-0'
          }`}
          style={{ 
            width: catSize,
            pointerEvents: isVisible ? 'auto' : 'none',
          }}
        />

        {showBubble && (
          <div
            style={{
              position: 'absolute',
              bottom: '60%',
              left: '100%',
              marginLeft: '0.5rem',
              backgroundColor: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              whiteSpace: 'normal',
              minWidth: deviceType === 'mobile' ? '100px' : '120px',
              maxWidth: deviceType === 'mobile' ? '150px' : '200px',
              fontSize: deviceType === 'mobile' ? '0.75rem' : '0.875rem',
              color: 'black',
              zIndex: 9999,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}
          >
            {message}
            <div
              style={{
                position: 'absolute',
                left: '-6px',
                top: '80%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: '6px solid white',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}