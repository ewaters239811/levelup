'use client';

export default function HeroSection() {
  return (
    <div className="relative text-center space-y-8 mb-16">
      {/* Sacred Geometry Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-2xl">
          {/* Flower of Life Pattern */}
          <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="200" cy="140" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="200" cy="260" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="140" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="260" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="170" cy="170" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="230" cy="170" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="170" cy="230" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
          <circle cx="230" cy="230" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#826a54]"/>
        </svg>
      </div>

      {/* Badge */}
      <div className="relative inline-block px-6 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-[#d4c4b5]/50 shadow-sm mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#826a54] font-medium">
          CLEARPTH.IO
        </p>
      </div>

      {/* Main Heading */}
      <div className="relative space-y-4">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight leading-[1.1] tracking-tight">
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-shimmer">
            Intake System
          </span>
          <br />
          <span className="text-[#463b32] font-light">2.0</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#826a54]/80 max-w-2xl mx-auto leading-relaxed font-light">
          Discover your archetype through two powerful pathways
        </p>
      </div>
    </div>
  );
}

