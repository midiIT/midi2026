import base from '../assets/stoneTile-base.png';
import top from '../assets/stoneTile-top.png';
import bottom from '../assets/stoneTile-bottom.png';
import left from '../assets/stoneTile-left.png';
import right from '../assets/stoneTile-right.png';
import topLeft from '../assets/stoneTile-top-left.png';
import topRight from '../assets/stoneTile-top-right.png';
import bottomLeft from '../assets/stoneTile-bottom-left.png';
import bottomRight from '../assets/stoneTile-bottom-right.png';

interface WallProps {
  tileSize: number;
  widthTiles: number;
  heightTiles: number;
  isExteriorTop?: boolean;
  isExteriorBottom?: boolean;
  isExteriorLeft?: boolean;
  isExteriorRight?: boolean;
}

export default function Wall({
  tileSize,
  isExteriorTop = true,
  isExteriorBottom = true,
  isExteriorLeft = true,
  isExteriorRight = true,
}: WallProps) {
  const size = `${tileSize}px ${tileSize}px`;
  
  const getCornerImage = (vEdge: boolean, hEdge: boolean, cornerImg: string, vImg: string, hImg: string) => {
    if (vEdge && hEdge) return cornerImg;
    if (vEdge) return vImg;
    if (hEdge) return hImg;
    return base;
  };

  const getEdgeImage = (isEdge: boolean, edgeImg: string) => {
    return isEdge ? edgeImg : base;
  };

  const commonStyle = {
    position: 'absolute' as const,
    backgroundSize: size,
  };

  return (
    <>
      {/* 1. CORNERS */}
      
      {/* Top Left */}
      <div style={{
        ...commonStyle, left: 0, top: 0, width: tileSize, height: tileSize,
        backgroundImage: `url(${getCornerImage(isExteriorTop, isExteriorLeft, topLeft, top, left)})`
      }} />

      {/* Top Right */}
      <div style={{
        ...commonStyle, right: 0, top: 0, width: tileSize, height: tileSize,
        backgroundImage: `url(${getCornerImage(isExteriorTop, isExteriorRight, topRight, top, right)})`
      }} />

      {/* Bottom Left */}
      <div style={{
        ...commonStyle, left: 0, bottom: 0, width: tileSize, height: tileSize,
        backgroundImage: `url(${getCornerImage(isExteriorBottom, isExteriorLeft, bottomLeft, bottom, left)})`
      }} />

      {/* Bottom Right */}
      <div style={{
        ...commonStyle, right: 0, bottom: 0, width: tileSize, height: tileSize,
        backgroundImage: `url(${getCornerImage(isExteriorBottom, isExteriorRight, bottomRight, bottom, right)})`
      }} />


      {/* 2. EDGES */}

      {/* Top Edge */}
      <div style={{
        ...commonStyle,
        left: tileSize, right: tileSize, top: 0, height: tileSize,
        backgroundImage: `url(${getEdgeImage(isExteriorTop, top)})`,
        backgroundRepeat: 'repeat-x'
      }} />

      {/* Bottom Edge */}
      <div style={{
        ...commonStyle,
        left: tileSize, right: tileSize, bottom: 0, height: tileSize,
        backgroundImage: `url(${getEdgeImage(isExteriorBottom, bottom)})`,
        backgroundRepeat: 'repeat-x'
      }} />

      {/* Left Edge */}
      <div style={{
        ...commonStyle,
        left: 0, top: tileSize, bottom: tileSize, width: tileSize,
        backgroundImage: `url(${getEdgeImage(isExteriorLeft, left)})`,
        backgroundRepeat: 'repeat-y'
      }} />

      {/* Right Edge */}
      <div style={{
        ...commonStyle,
        right: 0, top: tileSize, bottom: tileSize, width: tileSize,
        backgroundImage: `url(${getEdgeImage(isExteriorRight, right)})`,
        backgroundRepeat: 'repeat-y'
      }} />
    </>
  );
}