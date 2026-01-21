import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Activities from './rooms/Activities';
import Contributors from './rooms/Contributors';
import Team from './rooms/Team';
import SocialMediaMIDI from './rooms/SocialMediaMIDI';
import CollaborationProposal from './rooms/CollaborationProposal';
import RooSocialMediaRO from './rooms/SocialMediaRO';

const roomComponents: Record<string, React.ComponentType> = {
  '1': Activities,
  '2': Contributors,
  '3': Team,
  '4': SocialMediaMIDI,
  '5': RooSocialMediaRO,
  '6': CollaborationProposal,
};

export default function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isEntering] = useState(true);

  const RoomComponent = roomComponents[roomId || ''];

  return (
    <div
      className={`w-full h-screen transition-all duration-500 ${
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