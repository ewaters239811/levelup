'use client';

interface ModeCardProps {
  variant: 'quick' | 'deep';
  onClick: () => void;
}

export default function ModeCard({ variant, onClick }: ModeCardProps) {
  const isQuick = variant === 'quick';
  
  const config = {
    quick: {
      title: 'Quick Mode',
      description: 'Fast, structured assessment with multi-select and rank-order questions. Perfect for a quick archetype determination.',
      symbol: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#d4af37]">
          {/* Minimal triangle symbol */}
          <path d="M16 8L24 24H8L16 8Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="18" r="2" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
    },
    deep: {
      title: 'Deep Mode',
      description: 'AI-powered conversation analysis with voice-to-text support. Comprehensive archetype mapping with shadow work and alchemical stages.',
      symbol: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#d4af37]">
          {/* Minimal spiral/consciousness symbol */}
          <path d="M16 16C16 12 20 8 24 8C24 12 20 16 16 16Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M16 16C16 20 12 24 8 24C8 20 12 16 16 16Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.4"/>
        </svg>
      ),
    },
  };

  const { title, description, symbol } = config[variant];

  return (
    <div
      onClick={onClick}
      className="
        group relative
        p-10 cursor-pointer rounded-2xl
        bg-gradient-to-br from-[#1a0f1a] via-[#1a0f2a] to-[#0a0a0a]
        border-2 border-[#2a1f3a]/50
        hover:border-[#d4af37]/50
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-[#d4af37]/20
        hover:-translate-y-1
        overflow-hidden
        backdrop-blur-sm
      "
    >
      {/* Mystical gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#8b5cf6]/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#8b5cf6]/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

      {/* Subtle inner glow */}
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-transparent via-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative space-y-6 z-10">
        {/* Icon/Symbol */}
        <div className="
          w-16 h-16 rounded-2xl 
          bg-gradient-to-br from-[#d4af37]/20 to-[#8b5cf6]/10
          border border-[#d4af37]/30
          flex items-center justify-center
          group-hover:scale-110 group-hover:rotate-3
          transition-transform duration-500
          shadow-lg shadow-[#d4af37]/20
        ">
          {symbol}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-light text-white group-hover:text-[#d4af37] transition-colors duration-300">
          {title}
        </h2>

        {/* Description */}
        <p className="text-neutral-300/70 font-light leading-relaxed text-lg">
          {description}
        </p>

        {/* CTA Arrow */}
        <div className="pt-4 flex items-center gap-2">
          <span className="text-sm text-neutral-300 font-medium group-hover:text-[#d4af37] transition-colors duration-300">
            Begin Journey
          </span>
          <svg 
            className="w-5 h-5 text-neutral-300 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8b5cf6]/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
    </div>
  );
}

