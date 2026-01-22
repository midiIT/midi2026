import RoomGrid from './components/RoomGrid';
import useResponsiveTiles from './hooks/useResponsiveTiles';
import Sky from './components/Sky';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomDetail from './pages/RoomDetail';

import ContributorsPC from './assets/rooms/contributorsRoomPC.png';
import ContributorsMobile from './assets/rooms/contributorsRoomMobile.png';
import RoSocialsPC from './assets/rooms/roSocialsRoomPC.png'
import RoSocialsMobile from './assets/rooms/roSocialsRoomMobile.png'
import TeamPC from './assets/rooms/teamRoomPC.png';
import TeamMobile from './assets/rooms/teamRoomMobile.png';


function App() {
  
  const { isMobile } = useResponsiveTiles();
  const contributors = isMobile ? ContributorsMobile : ContributorsPC;
  const roSocials = isMobile ? RoSocialsMobile : RoSocialsPC;
  const team = isMobile ? TeamMobile : TeamPC;
  
  const rooms = [
    { id: 1, content: <span>Kambarys 1</span> },
    { id: 2, content: <img src={contributors} alt="Rėmėjai" className="w-full h-full" />, background: contributors },
    { id: 3, content: <img src={team} alt="Komanda" className="w-full h-full" />, background: team },
    { id: 4, content: <span>Kambarys 4</span> },
    { id: 5, content: <img src={roSocials} alt="Socialinės medijos RO" className="w-full h-full" />, background: roSocials },
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