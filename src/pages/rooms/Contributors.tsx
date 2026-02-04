import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomPC from '../../assets/rooms/contributorsRoomPC.webp';
import RoomMobile from '../../assets/rooms/contributorsRoomMobile.webp';

const SponsorTier = {
  diamond: 'diamond',
  gold: 'gold',
  silver: 'silver',
  bronze: 'bronze',
  partners: 'partners',
} as const;

type SponsorTierType = (typeof SponsorTier)[keyof typeof SponsorTier];

interface Sponsor {
  href: string;
  src: string;
  alt: string;
  tier: SponsorTierType;
}

const sponsors: Sponsor[] = [
  // Diamond sponsors
  {
    href: 'https://www.vntrading.ai/',
    src: '/2026/images/sponsors/diamond/vnt.webp',
    alt: 'VNTrading',
    tier: SponsorTier.diamond,
  },

  // Gold sponsors
  {
    href: 'https://lt.asseco.com/',
    src: '/2026/images/sponsors/gold/asseco.webp',
    alt: 'Asseco',
    tier: SponsorTier.gold,
  },

  // Silver sponsors
  {
    href: 'https://www.nasdaq.com/',
    src: '/2026/images/sponsors/silver/nasdaq.webp',
    alt: 'Nasdaq',
    tier: SponsorTier.silver,
  },

  // Bronze sponsors
  {
    href: 'https://site.adform.com/',
    src: '/2026/images/sponsors/bronze/adform.webp',
    alt: 'AdForm',
    tier: SponsorTier.bronze,
  },
  {
    href: 'https://www.bentley.com/',
    src: '/2026/images/sponsors/bronze/bentley.svg',
    alt: 'Bentley',
    tier: SponsorTier.bronze,
  },
  {
    href: 'https://www.westernunion.com/lt/lt/home.html',
    src: '/2026/images/sponsors/bronze/westernUnion.webp',
    alt: 'Western Union',
    tier: SponsorTier.bronze,
  },
];

function SponsorSection({ tier }: { tier: SponsorTierType }) {
  const filteredSponsors = sponsors.filter((sponsor) => sponsor.tier === tier);

  if (filteredSponsors.length === 0) return null;

  const tierTitles = {
    [SponsorTier.diamond]: 'Deimantiniai rėmėjai',
    [SponsorTier.gold]: 'Auksiniai rėmėjai',
    [SponsorTier.silver]: 'Sidabriniai rėmėjai',
    [SponsorTier.bronze]: 'Bronziniai rėmėjai',
    [SponsorTier.partners]: 'Partneriai',
  };

  const tierClasses = {
    [SponsorTier.diamond]: 'text-diamond border-diamond',
    [SponsorTier.gold]: 'text-gold border-gold',
    [SponsorTier.silver]: 'text-silver border-silver',
    [SponsorTier.bronze]: 'text-bronze border-bronze',
    [SponsorTier.partners]: 'text-partners border-partners',
  };

  const logoSizes = {
    [SponsorTier.diamond]: 'w-48 h-48',
    [SponsorTier.gold]: 'w-40 h-40',
    [SponsorTier.silver]: 'w-36 h-36',
    [SponsorTier.bronze]: 'w-32 h-32',
    [SponsorTier.partners]: 'w-28 h-28',
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className={`border-t-2 ${tierClasses[tier]} flex-grow mx-2`}></div>
        <h2
          className={`text-lg sm:text-xl lg:text-2xl font-bold px-3 text-center whitespace-nowrap ${tierClasses[tier].split(' ')[0]}`}
        >
          {tierTitles[tier]}
        </h2>
        <div className={`border-t-2 ${tierClasses[tier]} flex-grow mx-2`}></div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredSponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-300 ease-in-out hover:opacity-80"
          >
            <img
              src={sponsor.src}
              alt={sponsor.alt}
              className={`${logoSizes[tier]} object-contain`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function SponsorsContent() {
  return (
    <div className="py-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-amber-900">
        Mūsų rėmėjai
      </h1>
      {Object.values(SponsorTier).map((tier) => (
        <SponsorSection key={tier} tier={tier} />
      ))}
    </div>
  );
}

export default function Contributors() {
  const { deviceType } = useResponsiveLayout();
  const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;

  return (
    <RoomContent background={bck}>
      <SponsorsContent />
    </RoomContent>
  );
}