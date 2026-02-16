import { useTranslation } from 'react-i18next';

const LithuanianFlag = () => (
  <svg viewBox="0 0 5 3" className="w-full h-full">
    <rect width="5" height="1" fill="#FDB913" />
    <rect width="5" height="1" y="1" fill="#006A44" />
    <rect width="5" height="1" y="2" fill="#C1272D" />
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 60 30" className="w-full h-full">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'lt' ? 'en' : 'lt';
    i18n.changeLanguage(newLang);
  };

  const isLithuanian = i18n.language === 'lt';

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-amber-900/80 hover:bg-amber-800 border-2 border-amber-600 rounded-lg p-1.5 transition-all duration-200 shadow-lg hover:shadow-xl"
      aria-label={isLithuanian ? 'Switch to English' : 'Perjungti į lietuvių'}
    >
      <div
        className={`w-8 h-5 rounded overflow-hidden border border-amber-600/50 transition-opacity ${isLithuanian ? 'opacity-100' : 'opacity-40'}`}
      >
        <LithuanianFlag />
      </div>
      <div
        className={`w-8 h-5 rounded overflow-hidden border border-amber-600/50 transition-opacity ${!isLithuanian ? 'opacity-100' : 'opacity-40'}`}
      >
        <UKFlag />
      </div>
    </button>
  );
}
