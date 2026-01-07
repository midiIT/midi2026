import RoomGrid from './components/RoomGrid';
import Sky from './components/Sky';

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
    <div className="min-h-screen bg-sky-900 flex flex-col text-white">
      <Sky />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <RoomGrid rooms={rooms} />
      </div>
    </div>
  );
}

export default App;