import { useState, useEffect } from 'react';

interface TileConfig {
  tileSize: number;
  tilesX: number;
  tilesY: number;
  columns: number;
  isMobile: boolean;
}

export default function useResponsiveTiles(): TileConfig {
  const [config, setConfig] = useState<TileConfig>({
    tileSize: 64,
    tilesX: 5,
    tilesY: 6,
    columns: 1,
    isMobile: true,
  });

  useEffect(() => {
    function calculateConfig() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      const tileSize = 32;
      const headerSpace = 100;

      if (isMobile) {
        const sidePadding = 32;
        const availableWidth = width - sidePadding;
        const availableHeight = height - headerSpace;
        
        setConfig({
          tileSize,
          tilesX: Math.floor(availableWidth / tileSize),
          tilesY: Math.floor(availableHeight / tileSize),
          columns: 1,
          isMobile: true,
        });
      } else {
        const columns = width >= 1200 ? 3 : 2;
        const rows = 2;
        const padding = tileSize * 2;

        const sharedWallsX = columns - 1;
        const sharedWallsY = rows - 1;
        
        const availableWidth = width - padding + (sharedWallsX * tileSize);
        const availableHeight = height - headerSpace - padding + (sharedWallsY * tileSize);

        setConfig({
          tileSize,
          tilesX: Math.max(Math.floor(availableWidth / (columns * tileSize)), 4),
          tilesY: Math.max(Math.floor(availableHeight / (rows * tileSize)), 4),
          columns,
          isMobile: false,
        });
      }
    }

    calculateConfig();
    window.addEventListener('resize', calculateConfig);
    return () => window.removeEventListener('resize', calculateConfig);
  }, []);

  return config;
}