import RoomGrid from './components/RoomGrid';
import useResponsiveTiles from './hooks/useResponsiveTiles';
import Sky from './components/Sky';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomDetail from './pages/RoomDetail';
import ContributorsPC from './assets/rooms/contributorsRoomPC.png';
import ContributorsMobile from './assets/rooms/contributorsRoomMobile.png';
import ActivitiesPC from './assets/rooms/contributorsRoomPC.png';
import ActivitiesMobile from './assets/rooms/contributorsRoomMobile.png';
import SocialMediaROPC from './assets/rooms/contributorsRoomPC.png';
import SocialMediaROMobile from './assets/rooms/contributorsRoomMobile.png';



function App() {
  
  const { isMobile } = useResponsiveTiles();
  const contributors = isMobile ? ContributorsMobile : ContributorsPC;
  const activities = isMobile ? ActivitiesMobile : ActivitiesPC;
  const socialMediaRO = isMobile ? SocialMediaROMobile : SocialMediaROPC;
  
  const rooms = [
    { id: 1, content: <img src={activities} alt="Pagrindinis kambarys" className="w-full h-full" />, background: activities },
    { id: 2, content: <img src={contributors} alt="Sosto kambarys" className="w-full h-full" />, background: contributors },
    { id: 3, content: <span>Kambarys 3</span> },
    { id: 4, content: <span>Kambarys 4</span> },
    { id: 5, content: <img src={socialMediaRO} alt="Operos kambarys" className="w-full h-full" />, background: socialMediaRO },
    { id: 6, content: <span>Kambarys 6</span> },
  ];

  return (
    <BrowserRouter basename="/2026">
      <div className="min-h-screen bg-sky-900 flex flex-col text-white">
        <Sky />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<RoomGrid rooms={rooms} />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;