import RoomGrid from './components/RoomGrid';
import kingRoomDesktop from './assets/rooms/kingRoom1.png';
import kingRoomMobile from './assets/rooms/kingRoom2.png';
import useResponsiveTiles from './hooks/useResponsiveTiles';
import Sky from './components/Sky';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomDetail from './pages/RoomDetail';


function App() {
  
  const { isMobile } = useResponsiveTiles();
  const kingRoomBg = isMobile ? kingRoomMobile : kingRoomDesktop;
  
  const rooms = [
    { id: 1, content: <img src={kingRoomBg} alt="Sosto kambarys" className="w-full h-full" />, background: kingRoomBg },
    { id: 2, content: <span>Kambarys 2</span> },
    { id: 3, content: <span>Kambarys 3</span> },
    { id: 4, content: <span>Kambarys 4</span> },
    { id: 5, content: <span>Kambarys 5</span> },
    { id: 6, content: <span>Kambarys 6</span> },
  ];

  return (
    <BrowserRouter basename="/2026">
      <div className="min-h-screen bg-sky-900 flex flex-col text-white">
        <div className="p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">MIDI 2026</h1>
        </div>

        <Routes>
          <Route path="/" element={<RoomGrid rooms={rooms} />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;