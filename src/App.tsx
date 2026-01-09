import RoomGrid from './components/RoomGrid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomDetail from './pages/RoomDetail';

function App() {

  const rooms = [
    { id: 1, content: <span>Kambarys 1</span> },
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