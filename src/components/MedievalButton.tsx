import React from 'react';

interface MedievalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const MedievalButton: React.FC<MedievalButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3
        pr-20 pb-6 pl-10
        text-amber-950 font-medieval font-semibold
        transition-all duration-200
        hover:brightness-110 hover:scale-105
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        backgroundImage: 'url(/2026/images/components/button.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </button>
  );
};