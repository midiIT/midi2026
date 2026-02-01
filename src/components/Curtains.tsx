import curtainsOpenAndClose from "../assets/curtains_open_and_close.gif";
import curtainsOpen from "../assets/curtains.png";
import { useCallback, useEffect, useState } from "react";
import type { DeviceType } from "../hooks/useResponsiveLayout";

interface ContentInset {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

interface CurtainsProps {
  deviceType: DeviceType;
  isRoomOpen: boolean;
  contentInset: ContentInset;
  roomId: string;
}

export default function Curtains({
  deviceType,
  isRoomOpen,
  contentInset,
}: CurtainsProps) {
  const [gifKey, setGifKey] = useState(0);

  const replay = useCallback(() => setGifKey(Date.now()), []);

  useEffect(() => {
    if (isRoomOpen) {
      const timer = setTimeout(replay, 0);
      return () => clearTimeout(timer);
    }
  }, [isRoomOpen, replay]);

  const gifSrc = `${curtainsOpenAndClose}?_=${gifKey}`;

  const curtainStyle = deviceType === 'mobile' 
    ? { 
        width: '100%', 
        height: '35%',
        transform: 'translateY(5%)',
      }
    : { 
        width: '95%', 
        height: '85%',
        transform: 'translateY(5%)',
      };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2000,
    objectFit: 'fill',
    ...curtainStyle,
  };

  return (
    <div
      className="absolute"
      style={{
        top: contentInset.top,
        bottom: contentInset.bottom,
        left: contentInset.left,
        right: contentInset.right,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={curtainsOpen}
          alt="Curtains"
          style={{
            ...imageStyle,
            opacity: isRoomOpen ? 0 : 1,
          }}
        />

        <img
          src={gifSrc}
          alt="Curtains Animating"
          style={{
            ...imageStyle,
            opacity: isRoomOpen ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}