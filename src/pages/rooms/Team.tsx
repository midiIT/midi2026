import { useTranslation } from 'react-i18next';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomPC from '../../assets/rooms/teamRoomPC.webp';
import RoomMobile from '../../assets/rooms/teamRoomMobile.webp';
import teamMembers from '../../data/team.json';

interface TeamMember {
  picture: string;
  name: string;
  position_lt: string;
  position_en: string;
  email: string;
}

const sectionConfig = {
  A: { nameKey: 'team.sections.leaders', slice: [0, 11] },
  B: { nameKey: 'team.sections.eventLeaders', slice: [11, 18] },
  C: { nameKey: 'team.sections.communication', slice: [18, 21] },
  D: { nameKey: 'team.sections.lanPartyLeaders', slice: [21, 26] },
  E: { nameKey: 'team.sections.mentors', slice: [26, 30] },
} as const;

function TeamMemberCard({ member }: { member: TeamMember }) {
  const { t, i18n } = useTranslation();
  const position = i18n.language === 'en' ? member.position_en : member.position_lt;
  const nameParts = member.name.split(' ');
  const firstName = nameParts[0];
  const surname = nameParts.slice(1).join(' ');

  return (
    <div className="bg-amber-50 shadow-md rounded-lg overflow-hidden border-2 border-amber-900 w-full max-w-[180px] flex flex-col transition-shadow duration-300 hover:shadow-xl">
      <div className="p-2 pb-0">
        <div className="relative h-[130px] w-full">
          <img
            src={member.picture}
            alt={member.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
      <div className="p-2 text-center flex flex-col flex-grow">
        <h3 className="text-base sm:text-base font-semibold text-amber-900 leading-tight">
          <span className="block">{firstName}</span>
          {surname && <span className="block">{surname}</span>}
        </h3>
        <p className="text-sm text-amber-700 mt-1">
          {position}
        </p>
        <div className="text-sm text-amber-800 mt-auto pt-2">
          <span className="font-medium">{t('team.email')}</span>
          <p className="break-all text-sm">
            {member.email}
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamSection({ name, members }: { name: string; members: TeamMember[] }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-900 mb-4 text-center">
        {name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {members.map((member: TeamMember, index: number) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

function TeamGrid() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      {Object.entries(sectionConfig).map(([key, config]) => {
        const members = teamMembers.slice(config.slice[0], config.slice[1]) as TeamMember[];
        return (
          <TeamSection
            key={key}
            name={t(config.nameKey)}
            members={members}
          />
        );
      })}
    </div>
  );
}

export default function Team() {
  const { t } = useTranslation();
  const { deviceType } = useResponsiveLayout();
  const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;

  return (
    <RoomContent
      background={bck}
      className="text-amber-900"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        {t('team.title')}
      </h1>
      <TeamGrid />
    </RoomContent>
  );
}