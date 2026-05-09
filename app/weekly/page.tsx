import Link from 'next/link';
import BeehiivV3SubscribeSlot from '@/components/BeehiivV3SubscribeSlot';
import BlogListenControls from '@/components/BlogListenControls';
import NewsletterSubscribeCta from '@/components/NewsletterSubscribeCta';
import PageBack from '@/components/PageBack';
import { currentWeeklyPost, type PostBlock } from '@/data/weeklyPost';
import { weeklyPostToPlainSpeechText } from '@/lib/weeklyPostSpeech';

function Block({
  block,
  leadParagraph,
}: {
  block: PostBlock;
  leadParagraph?: boolean;
}) {
  switch (block.kind) {
    case 'p':
      return (
        <p
          className={[
            'text-[1.0625rem] md:text-lg leading-[1.72] text-[#2a221c]',
            leadParagraph
              ? 'md:first-letter:float-left md:first-letter:mr-2 md:first-letter:font-semibold md:first-letter:font-article md:first-letter:text-[2.65rem] md:first-letter:leading-[0.85] md:first-letter:text-[#4a3428]'
              : '',
          ].join(' ')}
        >
          {block.text}
        </p>
      );
    case 'h3':
      return (
        <h3 className="font-article mb-3 text-xl font-semibold leading-snug tracking-tight text-[#3d2b1f] md:text-[1.35rem]">
          {block.text}
        </h3>
      );
    case 'quote':
      return (
        <blockquote className="font-article my-9 whitespace-pre-line border-l-[3px] border-[#b8895e] pl-6 text-[1.0625rem] italic leading-[1.72] text-[#403529] md:text-lg md:leading-relaxed">
          {block.text}
        </blockquote>
      );
    case 'ul':
      return (
        <ul className="font-article my-7 space-y-2.5 pl-6 text-[1.0625rem] leading-[1.72] text-[#2a221c] marker:text-[#9a704e] md:text-lg [&>li]:pl-1">
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
    <div className="min-h-screen bg-gradient-to-b from-[#fcf4e9] via-[#f7ead8] to-[#efd8ba] px-4 py-10 pb-24 text-neutral-900 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 left-1/3 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />
      </div>
      <article
        className="
          font-article
          w-full max-w-[42rem] mx-auto relative z-10 space-y-10
          rounded-sm border border-[#dccfb8]/90 bg-[#fffdfb]
          px-5 py-11 shadow-[0_1px_4px_rgba(42,28,18,0.06)]
          sm:px-10 sm:py-14
        "
      >
        <div className="flex items-start justify-between gap-4 font-sans">
          <PageBack tone="light" />
          <p className="text-[11px] text-[#7d563b] font-medium tracking-[0.2em] uppercase shrink-0 pt-0.5">
            Clearpth
          </p>
        </div>

        <header className="space-y-4 border-b border-[#e5d4c4] pb-10 font-sans">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a704e]">
            Weekly · {post.weekOfLabel}
          </p>
          <h1 className="font-article text-[1.65rem] font-semibold leading-[1.25] tracking-tight text-[#231810] md:text-[2rem] md:leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="font-sans">
          <BeehiivV3SubscribeSlot variant="strip" />
        </div>

        <div className="rounded-md border border-[#e8dfd4] bg-[#fefbf7]/90 px-4 py-3 font-sans shadow-sm shadow-amber-900/[0.04]">
          <BlogListenControls key={post.weekOfLabel} text={speechText} />
        </div>

        <div className="space-y-14">
          {post.sections.map((section, sectionIndex) => (
            <section key={section.title} className="space-y-6">
              <h2 className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#a87e5c]">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.blocks.map((block, i) => (
                  <Block
                    key={`${section.title}-${i}`}
                    block={block}
                    leadParagraph={
                      sectionIndex === 0 && i === 0 && block.kind === 'p'
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="space-y-8 border-t border-[#e5d4c4] pt-10 font-sans">
          <div className="space-y-2">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a704e] sm:text-left">
              Before you go
            </p>
            <BeehiivV3SubscribeSlot variant="compact" />
            <NewsletterSubscribeCta variant="compact" />
          </div>
          <div className="space-y-4 border-t border-[#ead4be] pt-8">
            <p className="text-sm text-[#6b4a33] font-normal leading-relaxed">
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
          </div>
        </footer>
      </article>
    </div>
  );
}
