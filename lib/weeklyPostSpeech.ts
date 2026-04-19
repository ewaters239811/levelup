import type { PostBlock, WeeklyPost } from '@/data/weeklyPost';

function blockToSpeechParts(block: PostBlock): string[] {
  switch (block.kind) {
    case 'p':
    case 'h3':
    case 'quote':
      return [block.text];
    case 'ul':
      return block.items;
    default:
      return [];
  }
}

/** Full article as one string for text-to-speech (paragraph breaks for breathing). */
export function weeklyPostToPlainSpeechText(post: WeeklyPost): string {
  const parts: string[] = [post.title];
  for (const section of post.sections) {
    parts.push(section.title);
    for (const block of section.blocks) {
      parts.push(...blockToSpeechParts(block));
    }
  }
  return parts.filter(Boolean).join('\n\n');
}
