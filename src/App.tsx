import RoomGrid from './components/RoomGrid';
import useResponsiveLayout from './hooks/useResponsiveLayout';
import Sky from './components/Sky';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RoomDetail from './pages/RoomDetail';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

import ContributorsPC from './assets/rooms/contributorsRoomPC.webp';
import ContributorsMobile from './assets/rooms/contributorsRoomMobile.webp';
import RoSocialsPC from './assets/rooms/roSocialsRoomPC.webp'
import RoSocialsMobile from './assets/rooms/roSocialsRoomMobile.webp'
import ActivitiesPC from './assets/rooms/activitiesRoomPC.webp';
import ActivitiesMobile from './assets/rooms/activitiesRoomMobile.webp';
import CollaborationPC from './assets/rooms/collaborationRoomPC.webp';
import CollaborationMobile from './assets/rooms/collaborationRoomMobile.webp';

import MidiSocialsPC from './assets/rooms/midiSocialsRoomPC.webp'
import MidiSocialsMobile from './assets/rooms/midiSocialsRoomMobile.webp'
import TeamPC from './assets/rooms/teamRoomPC.webp';
import TeamMobile from './assets/rooms/teamRoomMobile.webp';


function AppContent() {
  const { t } = useTranslation();
  const { deviceType } = useResponsiveLayout();
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const contributors = deviceType === 'mobile' ? ContributorsMobile : ContributorsPC;
  const midiSocials = deviceType === 'mobile' ? MidiSocialsMobile : MidiSocialsPC;
  const roSocials = deviceType === 'mobile' ? RoSocialsMobile : RoSocialsPC;
  const team = deviceType === 'mobile' ? TeamMobile : TeamPC;
  const activities = deviceType === 'mobile' ? ActivitiesMobile : ActivitiesPC;
  const collaboration = deviceType === 'mobile' ? CollaborationMobile : CollaborationPC;

  const rooms = [
    { id: 1, content: <img src={activities} alt={t('rooms.activities')} className="w-full h-full" />, background: activities },
    { id: 2, content: <img src={contributors} alt={t('rooms.contributors')} className="w-full h-full" />, background: contributors },
    { id: 3, content: <img src={team} alt={t('rooms.team')} className="w-full h-full" />, background: team },
    { id: 4, content: <img src={midiSocials} alt={t('rooms.midiSocials')} className="w-full h-full" />, background: midiSocials },
    { id: 5, content: <img src={roSocials} alt={t('rooms.roSocials')} className="w-full h-full" />, background: roSocials },
    { id: 6, content: <img src={collaboration} alt={t('rooms.collaboration')} className="w-full h-full" />, background: collaboration },
  ];

  return (
    <div className="min-h-screen bg-sky-900 flex flex-col text-white">
      {isMainPage && <LanguageSwitcher />}
      <Sky />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<RoomGrid rooms={rooms} />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/2026">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;