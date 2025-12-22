import useResponsiveTiles from "../hooks/useResponsiveTiles";

export default function Curtains({
  className,
  inView,
}: { className?: string, inView: boolean }) {
  const { tileSize, isMobile } = useResponsiveTiles();

  return (
      <> 
        {/* Curtains */}
        {/* TODO: add curtain animation */}
        <div  
          className={`${className ?? ''} ${ (isMobile && inView) ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 group-focus:opacity-0 transition-opacity duration-300`}
          style={{
            position: 'absolute',
            top: tileSize,
            left: tileSize,
            right: tileSize,
            bottom: tileSize,
            background: "#0000005e",
            zIndex: 999,
          }}
        />

      </>
  );
}