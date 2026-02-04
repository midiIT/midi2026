import { useState, useEffect } from 'react';
import windowMobile from '../assets/window_mobile.webp';
import windowPC from '../assets/window_pc.webp';

const screens = {
  es: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface LayoutConfig {
  deviceType: DeviceType;
  columns: number;
  roomWidth: number;
  roomHeight: number;
  windowImage: string;
}

export default function useResponsiveLayout(): LayoutConfig {
  const [config, setConfig] = useState<LayoutConfig>({
    deviceType: 'mobile',
    columns: 1,
    roomWidth: 300,
    roomHeight: 500,
    windowImage: windowMobile,
  });

  useEffect(() => {
    function calculateConfig() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const deviceType: DeviceType = 
        width < screens.md ? 'mobile' : 
        width < screens.xl ? 'tablet' : 
        'desktop';

      if (deviceType === 'mobile') {
        const roomWidth = width;
        const maxRoomHeight = height * 0.75;
        const naturalHeight = roomWidth * 2.22;
        const roomHeight = Math.min(naturalHeight, maxRoomHeight);
        
        setConfig({
          deviceType,
          columns: 1,
          roomWidth,
          roomHeight,
          windowImage: windowMobile,
        });
      } else if (deviceType === 'tablet') {
        const columns = 2;
        const padding = 48;
        const availableWidth = width - padding;
        const roomWidth = Math.floor(availableWidth / columns);
        const roomHeight = roomWidth * 0.5625;
        
        setConfig({
          deviceType,
          columns,
          roomWidth,
          roomHeight,
          windowImage: windowPC,
        });
      } else {
        const columns = width >= screens.xl ? 3 : 2;
        const padding = 64;
        const availableWidth = width - padding;
        const roomWidth = Math.floor(availableWidth / columns);
        const roomHeight = roomWidth * 0.5625;
        
        setConfig({
          deviceType,
          columns,
          roomWidth,
          roomHeight,
          windowImage: windowPC,
        });
      }
    }

    calculateConfig();
    window.addEventListener('resize', calculateConfig);
    return () => window.removeEventListener('resize', calculateConfig);
  }, []);

  return config;
}