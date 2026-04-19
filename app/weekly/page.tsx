import Link from 'next/link';
import { currentWeeklyPost, type PostBlock } from '@/data/weeklyPost';

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-base font-light text-gray-300 leading-relaxed">
          {block.text}
        </p>
      );
    case 'h3':
      return (
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider pt-2">
          {block.text}
        </h3>
      );
    case 'quote':
      return (
        <blockquote className="border-l border-gray-700 pl-4 my-6 text-gray-400 font-light italic text-base leading-relaxed">
          {block.text}
        </blockquote>
      );
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-3 text-base font-light text-gray-300 leading-relaxed">
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

  return (
    <div className="min-h-screen bg-black px-4 py-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </div>

      <article className="w-full max-w-2xl mx-auto relative z-10 space-y-10">
        <div className="absolute top-0 left-0">
          <p className="text-xs text-gray-600 font-light tracking-widest uppercase">
            Clearpth
          </p>
        </div>

        <header className="pt-8 space-y-3 border-b border-gray-900 pb-8">
          <p className="text-xs text-gray-600 font-light uppercase tracking-wider">
            Weekly · {post.weekOfLabel}
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-white leading-snug">
            {post.title}
          </h1>
        </header>

        <div className="space-y-12">
          {post.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-lg md:text-xl font-light text-white">
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

        <footer className="pt-8 border-t border-gray-900 space-y-4">
          <p className="text-sm text-gray-500 font-light">
            When you are ready, continue to the four-question diagnostic.
          </p>
          <Link
            href="/assessment"
            className="
              inline-block w-full text-center px-8 py-3 bg-white text-black
              font-medium text-sm tracking-wide uppercase
              hover:bg-gray-200 transition-all duration-200
              relative overflow-hidden group
            "
          >
            <span className="relative z-10">Continue to assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
