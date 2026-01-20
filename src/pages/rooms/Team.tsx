import RoomContent from '../RoomContnet';
import useResponsiveTiles from '../../hooks/useResponsiveTiles';
import RoomPC from '../../assets/rooms/teamRoomPC.png';
import RoomMobile from '../../assets/rooms/teamRoomMobile.png';
import teamMembers from '../../data/team.json';

interface TeamMember {
  picture: string;
  name: string;
  position: string;
  email: string;
}

const sectionConfig = {
  A: { name: 'MIDI Vadovai', slice: [0, 11] },
  B: { name: 'MIDI Renginių vadovai', slice: [11, 18] },
  C: { name: 'MIDI Komunikacija', slice: [18, 21] },
  D: { name: 'MIDI LAN Party vadovai', slice: [21, 27] },
  E: { name: 'MIDI Mentoriai', slice: [27, 30] },
} as const;

function TeamMemberCard({ member }: { member: TeamMember }) {
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
      <div className="p-2 sm:p-3 text-center flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base font-semibold text-amber-900 leading-tight">
          <span className="block">{firstName}</span>
          {surname && <span className="block">{surname}</span>}
        </h3>
        <p className="text-xs text-amber-700 mt-1">
          {member.position}
        </p>
        <div className="text-xs text-amber-800 mt-auto pt-2">
          <span className="font-medium">El. paštas:</span>
          <p className="break-all text-[10px]">
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
  return (
    <div className="w-full">
      {Object.entries(sectionConfig).map(([key, config]) => {
        const members = teamMembers.slice(config.slice[0], config.slice[1]) as TeamMember[];
        return (
          <TeamSection 
            key={key} 
            name={config.name} 
            members={members} 
          />
        );
      })}
    </div>
  );
}

export default function Team() {
  const { isMobile } = useResponsiveTiles();
  const bck = isMobile ? RoomMobile : RoomPC;

  return (
    <RoomContent
      background={bck}
      className="text-amber-900"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        MIDI 2026 Komanda
      </h1>
      <TeamGrid />
    </RoomContent>
  );
}