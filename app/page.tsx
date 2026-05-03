import Link from 'next/link';
import NewsletterSubscribeCta from '@/components/NewsletterSubscribeCta';

export default function LandingPage() {
  return (
    <div className="bronze-shell min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="bronze-panel w-full max-w-2xl mx-auto text-center space-y-8 relative z-10 rounded-3xl px-6 py-8 md:px-10">
        {/* Clearpth Branding */}
        <div className="absolute top-0 left-0 right-0">
          <p className="text-xs text-amber-200/60 font-light tracking-widest uppercase">
            Clearpth
          </p>
        </div>

        <div className="space-y-4 pt-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-amber-50 leading-tight tracking-tight text-glow">
            Identity Collapse Index
          </h1>
          <p className="text-lg md:text-xl text-amber-100/75 font-light max-w-xl mx-auto">
            Where your identity is blocking your next level
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-3 text-amber-100/65 font-light text-sm leading-relaxed">
          <p>
            Your identity shapes every outcome. When it collapses, you sabotage success without knowing why.
          </p>
          <p>
            This 4-question diagnostic reveals your Identity Collapse Index.
          </p>
        </div>

        <div className="pt-4 max-w-md mx-auto">
          <p className="text-xs text-amber-200/60 font-light uppercase tracking-wider">
            Your results aren't blocked. Your identity is incompatible.
          </p>
        </div>

        <div className="pt-2 max-w-md mx-auto">
          <p className="text-sm text-amber-200/55 font-light italic border-t border-amber-900/50 pt-6">
            I don't coach people. I reconstruct identities.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/assessment"
            className="
              bronze-button-primary inline-block px-8 py-3
              font-medium text-sm tracking-wide uppercase
              transition-all duration-200
              relative overflow-hidden group
            "
          >
            <span className="relative z-10">Start Assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/35 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
          <Link
            href="/weekly"
            className="
              bronze-button-secondary inline-block px-8 py-3
              font-medium text-sm tracking-wide uppercase
              transition-all duration-200
            "
          >
            Weekly blog
          </Link>
        </div>

        <NewsletterSubscribeCta variant="landing" />

        <p className="text-xs text-amber-200/55 font-light">
          2 minutes
        </p>
      </div>
    </div>
  );
}
