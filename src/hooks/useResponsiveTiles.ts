import { useState, useEffect } from 'react';

interface TileConfig {
  tileSize: number;
  tilesX: number;
  tilesY: number;
  columns: number;
  isMobile: boolean;
}

function useResponsiveTiles(): TileConfig {
  const [config, setConfig] = useState<TileConfig>({
    tileSize: 48,
    tilesX: 5,
    tilesY: 12,
    columns: 1,
    isMobile: true,
  });

  useEffect(() => {
    function calculateConfig() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      const padding = 32; // px-4 each side = 32 total
      const roofSpace = 100; // Space at top for roof
      const availableWidth = width - padding;
      const availableHeight = height - roofSpace;

      if (isMobile) {
        // MOBILE: Single column, fit width exactly
        const tileSize = 48;
        const tilesX = Math.floor(availableWidth / tileSize) - 2; // -2 for walls
        const tilesY = Math.floor(availableHeight / tileSize) - 2;

        setConfig({
          tileSize,
          tilesX: Math.max(tilesX, 4),
          tilesY: Math.max(tilesY, 8),
          columns: 1,
          isMobile: true,
        });
      } else {
        // PC: Multiple columns, fit total width exactly
        const columns = width >= 1024 ? 3 : 2;
        const tileSize = 48;
        
        // Total width = columns * (tilesX + 2) * tileSize - (columns - 1) * tileSize
        // (subtracting merged walls between columns)
        // Solving for tilesX:
        // availableWidth = columns * (tilesX + 2) * tileSize - (columns - 1) * tileSize
        // availableWidth = tileSize * (columns * tilesX + 2 * columns - columns + 1)
        // availableWidth = tileSize * (columns * tilesX + columns + 1)
        const tilesX = Math.floor((availableWidth / tileSize - columns - 1) / columns);
        
        // Calculate rows to reach bottom (2 rows of rooms)
        const rows = 2;
        const tilesY = Math.floor((availableHeight / tileSize - rows - 1) / rows);

        setConfig({
          tileSize,
          tilesX: Math.max(tilesX, 6),
          tilesY: Math.max(tilesY, 5),
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

export default useResponsiveTiles;