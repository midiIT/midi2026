import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoomSign from '../components/RoomSign';
import useResponsiveLayout from '../hooks/useResponsiveLayout';
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
  const { t } = useTranslation();
  const [isEntering] = useState(true);
  const { deviceType } = useResponsiveLayout();

  const RoomComponent = roomComponents[roomId || ''];

  return (
    <div
      className={`w-full h-screen transition-all duration-500 ${
        isEntering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <div className="absolute top-4 left-4 z-50">
        <RoomSign
          deviceType={deviceType}
          onClick={() => navigate('/')}
          asButton
        >
          {t('backToCastle')}
        </RoomSign>
      </div>
      <RoomComponent />
    </div>
  );
}