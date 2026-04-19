import Link from 'next/link';
import BlogListenControls from '@/components/BlogListenControls';
import PageBack from '@/components/PageBack';
import WeeklyBlogSubscribe from '@/components/WeeklyBlogSubscribe';
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
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 px-4 py-10 pb-24 text-neutral-900">
      <article
        className="
          w-full max-w-2xl mx-auto relative z-10 space-y-10
          rounded-2xl border border-stone-200/90 bg-stone-50
          px-6 py-10 shadow-sm shadow-stone-900/10
          sm:px-10 sm:py-12
        "
      >
        <div className="flex items-start justify-between gap-4">
          <PageBack tone="light" />
          <p className="text-xs text-neutral-500 font-light tracking-widest uppercase shrink-0 pt-0.5">
            Clearpth
          </p>
        </div>

        <header className="space-y-3 border-b border-stone-200 pb-8">
          <p className="text-xs text-neutral-500 font-light uppercase tracking-wider">
            Weekly · {post.weekOfLabel}
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-neutral-950 leading-snug tracking-tight">
            {post.title}
          </h1>
        </header>

        <BlogListenControls key={post.weekOfLabel} text={speechText} />
        <WeeklyBlogSubscribe />

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

        <footer className="pt-8 border-t border-stone-200 space-y-4">
          <p className="text-sm text-neutral-600 font-light">
            When you are ready, continue to the four-question diagnostic.
          </p>
          <Link
            href="/assessment"
            className="
              inline-block w-full text-center px-8 py-3 bg-neutral-900 text-white
              font-medium text-sm tracking-wide uppercase
              hover:bg-neutral-800 transition-all duration-200
              relative overflow-hidden group rounded-sm
            "
          >
            <span className="relative z-10">Continue to assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
