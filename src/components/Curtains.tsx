import useResponsiveTiles from "../hooks/useResponsiveTiles";
import curtainsOpenAndClose from "../assets/curtains_open_and_close.gif";
import curtainsOpen from "../assets/curtains.png";
import { useCallback, useEffect, useState } from "react";
import windowImage from "../assets/window.png";
import Cat from "./Cat";
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
  }, [inView, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setHoverKey(Date.now());
      setEnableGif(isHovered);
    }
  }, [isHovered, isMobile])
    
  useEffect(() => {
    const imageDelay = enableGif ? 200 : 1000;
    
    const timer = setTimeout(() => {
      setGifOrImage(enableGif ? gifSrc : curtainsOpen);
    }, imageDelay);

    return () => clearTimeout(timer);
  }, [enableGif, gifSrc]);

  return (
        <div
        className={`absolute left-0 top-0 right-0 bottom-0 ${className ?? ''}`}
        style={{
            padding: tileSize,
        }}
        >
        <div  
          className={`${className ?? ''} ${ (isMobile && inView) ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-500 delay-[800ms]`}
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
        <div
          style={{
            position: 'absolute',
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            transform: `translateY(${tileSize}}px)`,
          }}
          className="flex items-center justify-center"
        >          
          <img 
            src={windowImage}   
            className="w-[100%] h-[100%]"        
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              zIndex: 1001,
            }}
          />
          <img
            src={gifOrImage}
            onMouseEnter={replay}
            className="cursor-pointer w-[95%] h-[86%]"
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              transform: `translateY(${tileSize*0.4}px)`,
              zIndex: 1000,
            }}
          />
          
          <Cat className={className} inView={inView}/> 

        </div>
      </div>
  );
}