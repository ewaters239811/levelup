import Link from 'next/link';
import BlogListenControls from '@/components/BlogListenControls';
import PageBack from '@/components/PageBack';
import WeeklyViewCounts from '@/components/WeeklyViewCounts';
import { currentWeeklyPost, weeklyPosts, type PostBlock } from '@/data/weeklyPost';
import { weeklyPostToPlainSpeechText } from '@/lib/weeklyPostSpeech';

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-base font-normal text-[#2f2118] leading-relaxed">
          {block.text}
        </p>
      );
    case 'h3':
      return (
        <h3 className="text-sm font-semibold text-[#5b3a24] uppercase tracking-wider pt-2">
          {block.text}
        </h3>
      );
    case 'quote':
      return (
        <blockquote className="border-l-2 border-[#c2905e] pl-4 my-6 text-[#4a311f] font-normal italic text-base leading-relaxed bg-[#f4e3cf] py-3 pr-2 rounded-r-sm">
          {block.text}
        </blockquote>
      );
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-3 text-base font-normal text-[#2f2118] leading-relaxed marker:text-[#7a4d2d]">
          {block.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

type WeeklyPageProps = {
  searchParams?: {
    post?: string;
  };
};

export default function WeeklyPage({ searchParams }: WeeklyPageProps) {
  const requestedSlug = searchParams?.post;
  const post =
    weeklyPosts.find((entry) => entry.slug === requestedSlug) || currentWeeklyPost;
  const speechText = weeklyPostToPlainSpeechText(post);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcf4e9] via-[#f7ead8] to-[#efd8ba] px-4 py-10 pb-24 text-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 left-1/3 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
      </div>
      <article
        className="
          w-full max-w-2xl mx-auto relative z-10 space-y-10
          rounded-2xl border border-[#dab793] bg-[#fffaf2]
          px-6 py-10 shadow-lg shadow-amber-900/10
          sm:px-10 sm:py-12
        "
      >
        <div className="flex items-start justify-between gap-4">
          <PageBack tone="light" />
          <p className="text-xs text-[#7d563b] font-medium tracking-widest uppercase shrink-0 pt-0.5">
            Clearpth
          </p>
        </div>

        <header className="space-y-3 border-b border-[#d8b28c] pb-8">
          <p className="text-xs text-[#8e6242] font-medium uppercase tracking-wider">
            Weekly · {post.weekOfLabel}
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-[#2a1a0f] leading-snug tracking-tight">
            {post.title}
          </h1>
        </header>

        <WeeklyViewCounts posts={weeklyPosts} activeSlug={post.slug} />

        <BlogListenControls key={post.weekOfLabel} text={speechText} />

        <div className="space-y-12">
          {post.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-[#3f2a1c]">
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

        <footer className="pt-8 border-t border-[#d8b28c] space-y-4">
          <p className="text-sm text-[#6b4a33] font-normal">
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
