import Link from 'next/link';
import BlogListenControls from '@/components/BlogListenControls';
import PageBack from '@/components/PageBack';
import { currentWeeklyPost, type PostBlock } from '@/data/weeklyPost';
import { weeklyPostToPlainSpeechText } from '@/lib/weeklyPostSpeech';

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-base font-light text-neutral-800 leading-relaxed">
          {block.text}
        </p>
      );
    case 'h3':
      return (
        <h3 className="text-sm font-medium text-neutral-600 uppercase tracking-wider pt-2">
          {block.text}
        </h3>
      );
    case 'quote':
      return (
        <blockquote className="border-l-2 border-stone-300 pl-4 my-6 text-neutral-700 font-light italic text-base leading-relaxed bg-stone-100/80 py-3 pr-2 rounded-r-sm">
          {block.text}
        </blockquote>
      );
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-3 text-base font-light text-neutral-800 leading-relaxed marker:text-neutral-500">
          {block.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function WeeklyPage() {
  const post = currentWeeklyPost;
  const speechText = weeklyPostToPlainSpeechText(post);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6ead9] via-[#ecd2ad] to-[#d6b083] px-4 py-10 pb-24 text-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 left-1/3 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl" />
      </div>
      <article
        className="
          bronze-panel w-full max-w-2xl mx-auto relative z-10 space-y-10
          rounded-2xl border border-amber-300/70 bg-[#fbf3e6]/95
          px-6 py-10 shadow-lg shadow-amber-900/15
          sm:px-10 sm:py-12
        "
      >
        <div className="flex items-start justify-between gap-4">
          <PageBack tone="light" />
          <p className="text-xs text-neutral-500 font-light tracking-widest uppercase shrink-0 pt-0.5">
            Clearpth
          </p>
        </div>

        <header className="space-y-3 border-b border-amber-300/70 pb-8">
          <p className="text-xs text-amber-900/55 font-light uppercase tracking-wider">
            Weekly · {post.weekOfLabel}
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-[#3b2617] leading-snug tracking-tight">
            {post.title}
          </h1>
        </header>

        <BlogListenControls key={post.weekOfLabel} text={speechText} />

        <div className="space-y-12">
          {post.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-lg md:text-xl font-light text-neutral-900">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <Block key={`${section.title}-${i}`} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="pt-8 border-t border-amber-300/70 space-y-4">
          <p className="text-sm text-amber-900/70 font-light">
            When you are ready, continue to the four-question diagnostic.
          </p>
          <Link
            href="/assessment"
            className="
              bronze-button-primary inline-block w-full text-center px-8 py-3
              font-medium text-sm tracking-wide uppercase
              transition-all duration-200
              relative overflow-hidden group rounded-sm
            "
          >
            <span className="relative z-10">Continue to assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
