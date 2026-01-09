import { useParams, useNavigate } from 'react-router-dom';
import {useState } from 'react';
import { ROOMS } from '../types/room';
import Room1 from './rooms/Room1';
import Room2 from './rooms/Room2';
import Room3 from './rooms/Room3';
import Room4 from './rooms/Room4';
import Room5 from './rooms/Room5';
import Room6 from './rooms/Room6';

const roomComponents: Record<string, React.ComponentType> = {
  '1': Room1,
  '2': Room2,
  '3': Room3,
  '4': Room4,
  '5': Room5,
  '6': Room6,
};

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isEntering] = useState(true);


  const room = ROOMS.find(r => r.id === roomId);


  if (!room) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-amber-700 mb-4">Room not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-700 text-stone-100 rounded hover:bg-amber-600"
          >
            Back to Castle
          </button>
        </div>
      </div>
    );
  }

  const RoomComponent = roomComponents[roomId || ''];

  if (!RoomComponent) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-amber-700 mb-4">Room not yet available</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-700 text-stone-100 rounded hover:bg-amber-600"
          >
            Back to Castle
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-500 ${
        isEntering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-amber-700 text-stone-100 rounded hover:bg-amber-600 transition-colors"
      >
        ← Back to Castle
      </button>
      <RoomComponent />
    </div>
  );
}