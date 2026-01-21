import useResponsiveTiles from "../hooks/useResponsiveTiles";
import curtainsOpenAndClose from "../assets/curtains_open_and_close.gif";
import curtainsOpen from "../assets/curtains.png";
import { useCallback, useEffect, useState } from "react";

export default function Curtains({
  className,
  inView,
  isHovered,
}: { className?: string, inView: boolean, isHovered: boolean }) {
  const { tileSize, isMobile } = useResponsiveTiles();

  const [hoverKey, setHoverKey] = useState<number | null>(null);
  const [enableGif, setEnableGif] = useState<boolean>(false);
  const [gifOrImage, setGifOrImage] = useState<string>();

  const gifSrc = hoverKey ? `${curtainsOpenAndClose}?_=${hoverKey}` : curtainsOpenAndClose;
  const replay = useCallback(() => setHoverKey(Date.now()), []);

  useEffect(() => {
    if (isMobile) {
      setHoverKey(Date.now());
      setEnableGif(true);
    }
  }, [inView]);

  useEffect(() => {
    setHoverKey(Date.now());
    setEnableGif(isHovered)
  }, [isHovered])
  
  useEffect(() => {
    let id: number | undefined;

    if (enableGif) {
      id = window.setTimeout(() => {
        setGifOrImage(gifSrc);
      }, 200); 
    } else {
      id = window.setTimeout(() => {
        setGifOrImage(curtainsOpen);
      }, 1000); 
    }

    return () => {
      if (id !== undefined) window.clearTimeout(id);
    };
  }, [enableGif, gifSrc]);

  return (
      <> 
        {/* Curtains */}
        <div  
          className={`${className ?? ''} ${ (isMobile && inView) ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-500 delay-[1300ms]`}
          style={{
            position: 'absolute',
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            pointerEvents: 'none',
            background: isMobile ? "#0000005e" : "none",
            zIndex: 999,
          }}
        />
        <img
          src={gifOrImage}
          onMouseEnter={replay}
          className="cursor-pointer"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            top: tileSize,
            zIndex: 1000,
          }}
        />
      </>
  );
}