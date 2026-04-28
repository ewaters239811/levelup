/**
 * Weekly blog posts shown before the Identity Collapse Index assessment.
 * Keep newest post first in `weeklyPosts`.
 */

export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'ul'; items: string[] };

export type PostSection = {
  title: string;
  blocks: PostBlock[];
};

export type WeeklyPost = {
  slug: string;
  weekOfLabel: string;
  title: string;
  sections: PostSection[];
};

export const weeklyPosts: WeeklyPost[] = [
  {
    slug: 'alignment-trap-apr-28-2026',
    weekOfLabel: 'Week of April 28, 2026',
    title: "The Alignment Trap: Why You Know What to Do But Don't Do It",
    sections: [
      {
        title: 'This Week\'s Note',
        blocks: [
          {
            kind: 'p',
            text: "There comes a point where you already know what to do to get your life on track-and even how to do it. But you still don't do it. Not because you're confused or lack information, but because there's a gap between knowing and executing. I've experienced this myself. I've studied the mind, reality creation, and God. I understand the frameworks, yet there are still moments where I hesitate, delay, or don't follow through. That forced me to ask a real question: why do some people take action and improve their lives without studying any of this? What do they have that I don't?",
          },
          {
            kind: 'p',
            text: "At first, I thought the answer was discipline or lifestyle-cutting off distractions, becoming more \"pure,\" and fixing every bad habit. And while those things help, they're not the core reason people get results. The truth is, there are people who aren't perfect, who don't live clean or structured lives, and they still win. So what's the real difference? It comes down to alignment-but not in the way most people think.",
          },
          {
            kind: 'p',
            text: "Alignment isn't just about thinking positively or feeling inspired. It's about whether your thoughts, feelings, and actions are working together. Your thoughts are what you focus on, your feelings are what you emotionally reinforce, and your actions are what you consistently do. When these three are aligned, life moves. When they're not, you create internal friction. For example, you might say you want money, but feel scarcity and avoid taking real risks. Or you think about being seen and known, but never actually put yourself out there. That's misalignment.",
          },
          {
            kind: 'p',
            text: "Where most people get stuck-and where I was stuck too-is in what I call the alignment trap: waiting to feel aligned before taking action. It sounds spiritual and intelligent, but in reality, it slows everything down. You tell yourself you'll post when you feel ready, act when you feel confident, or move when everything clicks internally. But that moment rarely comes on demand.",
          },
          {
            kind: 'p',
            text: "Now to be clear, inner posture does matter. The state you create from affects how your content feels, how people perceive you, and how you experience the process. Creating from desperation feels different than creating from clarity. But here's the correction: your inner posture should determine how you act, not whether you act.",
          },
          {
            kind: 'p',
            text: "The people who get results aren't always more aligned internally. They just hesitate less, act faster, and don't negotiate with themselves. They don't sit in analysis-they move. And through movement, their thoughts adjust, their feelings stabilize, and their identity strengthens.",
          },
          {
            kind: 'p',
            text: "What actually works is learning how to create a better state quickly and then executing. Before you act, take a couple minutes to reset-breathe, detach from the outcome, and remind yourself that you don't need anything from the result. Then step into the identity of someone who shares because they have something to say, not someone hoping for validation. From there, execute immediately. Record, post, and move on.",
          },
          {
            kind: 'p',
            text: "Most people think, \"If I feel right, I'll act.\" But the truth is, action is what creates alignment-not the other way around. You don't get results from what you want; you get results from what you consistently do. So alignment isn't something you wait for. It's something you build by thinking clearly, acting consistently, and letting your feelings catch up.",
          },
          {
            kind: 'p',
            text: "If you've been stuck in that space of knowing but not doing, this is your shift: stop waiting to feel aligned and start moving. Alignment will follow. That's how you go from understanding life to actually designing it.",
          },
        ],
      },
    ],
  },
  {
    slug: 'beyond-the-man-apr-19-2026',
    weekOfLabel: 'Week of April 19, 2026',
    title:
      'Beyond the Man: 3 Radical Truths About the "Christ State" for Materializing Your Reality',
    sections: [
      {
        title: '1. The Frustration of the Unfilled Void',
        blocks: [
          {
            kind: 'p',
            text: 'The average seeker wastes decades chasing shadows in the physical world, attempting to "manifest" desires through sheer 3D effort. You work harder, you visualize more, and yet you remain trapped in a cycle of lack. This frustration is a direct result of a fundamental misunderstanding: you are trying to change the "effect" without ever touching the "cause."',
          },
          {
            kind: 'p',
            text: 'The secret to materializing your reality is not found in religious piety or harder work, but in a radical metaphysical technology called the Christ Way. This is not about worshipping a historical figure; it is about a total unification of consciousness. Every human being is God wearing a mask-playing "dress-up" in a physical vessel. The Christ Way is the process of removing that mask and aligning your mind with the Infinite Intelligence to transcend the limitations of the material realm.',
          },
        ],
      },
      {
        title: '2. Redefining Christ: A Title of Spiritual Mastery',
        blocks: [
          {
            kind: 'p',
            text: 'To master your reality, you must first deconstruct the dogma. In the realm of the esoteric, "Christ" is not a name-it is a title, a degree of metaphysics, and a specific state of consciousness.',
          },
          {
            kind: 'p',
            text: 'As documented in George G.M. James\'s Stolen Legacy, much of what we consider Greek or Western spirituality was adapted from the Egyptian (Kmetic) system. The term Christos originates from the Kmetic word KST, meaning "The Anointed One," a title of spiritual mastery used 1,500 years before Pythagoras ever set foot in Egypt. This lineage connects through the Hindu title Krishna to the "Avatars" like Buddha and Jesus-individuals who achieved total mental unity with the "All."',
          },
          {
            kind: 'quote',
            text: 'Spirituality without the ability to control your reality is nothing but Sheer Vanity.',
          },
          {
            kind: 'p',
            text: 'When you view Christ as a degree of mastery rather than a distant savior, your potential shifts. You are instructed in Philippians 2:5-11 to "Let this mind be in you, which was also in Christ Jesus," who found it "not robbery to be equal with God." To enter the Christ state is to recognize that you are a physical expression of the infinite, and your only job is to materialize that unification.',
          },
        ],
      },
      {
        title: '3. Takeaway #1: The Frequency of Oneness (The Realm of Cause)',
        blocks: [
          {
            kind: 'p',
            text: 'The primary mistake in manifestation is "wanting." Wanting is a confession of separation. If you want a reality, you are declaring that you do not have it, and the universe-acting as a mirror-will reflect that lack back to you.',
          },
          {
            kind: 'p',
            text: 'You exist on three planes: the Mental, the Physical, and the Spiritual. The Mental Plane is the Realm of Cause, while the Physical Plane is merely the Realm of Effect. To change the effect, you must establish cause. This is the "technology" that Eugene Fersen taught to luminaries like Gandhi and Nikola Tesla: the ability to achieve mental unity with God.',
          },
          { kind: 'h3', text: 'The Mental Declaration Method:' },
          {
            kind: 'ul',
            items: [
              'Establish the Conduit: Think of God as electricity. The power has existed since the beginning of time, but it is useless without a conduit. Your mind is the wiring.',
              'The Inner Temple: As per Psalm 46:10 ("Be still, and know that I am God"), find the silence where you are no longer emotionally dependent on the 3D world.',
              'Mental Declaration: Use quiet, consistent declarations like "I am one with God" or "God is in me." This is not an affirmation of a wish; it is a declaration of a fact in the Realm of Cause.',
            ],
          },
          {
            kind: 'p',
            text: 'By becoming one with the "All," you gain access to all frequencies. Your desired reality is simply a parallel timeline (one of the "many mansions" in the Father\'s house). You don\'t "get" it; you align with it until the separation vanishes.',
          },
        ],
      },
      {
        title: '4. Takeaway #2: The Law of Neutralization (Be Impressed by Nothing)',
        blocks: [
          {
            kind: 'p',
            text: 'The universe punishes those who do not know who they are. When you are "impressed" by a desire-whether it\'s a car, a career, or a partner-you are attributing "importance" to it. In the energetic space of the universe, importance is interpreted as: "This thing has the power to alter my internal state because I am currently incomplete without it."',
          },
          {
            kind: 'p',
            text: 'Recall the esoteric story of Christ in the desert. The devil offered him the world, but Christ was unimpressed. Because he could not be swayed or "gassed up" by the world, he was given authority over it.',
          },
          {
            kind: 'quote',
            text: "When the world realizes that it can't offer you anything, it offers you everything.",
          },
          {
            kind: 'p',
            text: 'To materialize a reality, you must neutralize it. You must take it for granted as completely as you take the act of breathing for granted. If you were constantly "grateful" for every individual breath, it would indicate a respiratory crisis. You must normalize your desired reality. Those who "want it too bad" repel what they seek because their desperation is a vibration of lack. Minimize the goal. See it as normal, and the universe will realize it belongs in your reality.',
          },
        ],
      },
      {
        title: '5. Takeaway #3: The Death of the Ego-Creator (You Can Do Nothing)',
        blocks: [
          {
            kind: 'p',
            text: 'The most radical shift is the realization that your 3D "ego" has zero power. The ego is a finite, limited construct trapped in survival and doubt. As the scripture states: "I of myself do nothing; it is the father that doeth the things."',
          },
          {
            kind: 'p',
            text: 'Manifestation is not about "creating" anything. All frequencies already exist. Manifestation is making the invisible visible by becoming vibrationally aligned. You are not building a reality; you are revealing one.',
          },
          {
            kind: 'ul',
            items: [
              'God Knows, Ego Believes: The ego "believes" and struggles with doubt. God does not believe-God knows. Conviction is what enters you into godhood.',
              'Removing Pressure: When you realize you aren\'t the one doing the work, the pressure to perform evaporates. Uncertainty is simply the result of being misaligned with the Infinite Intelligence.',
            ],
          },
          {
            kind: 'p',
            text: 'Every time you doubt your ability to succeed, you are actually doubting the infinite potential (God) within you. When you get the ego out of the way and recognize that "With God all things are possible," failure becomes an impossibility.',
          },
        ],
      },
      {
        title: '6. Conclusion: The Inevitability of the Shift',
        blocks: [
          {
            kind: 'p',
            text: 'The Christ Way is the path of mental unification, the neutralization of importance, and the surrender of the ego\'s delusions of grandeur. It is the realization that you are the conduit through which Infinite Intelligence acts. When you establish cause in the mental realm, the effect in the physical realm is not just a possibility-it is an inevitability.',
          },
          {
            kind: 'p',
            text: 'The question is no longer whether you can manifest your reality. The question is: Are you ready to stop playing "dress-up" as a limited, struggling human and acknowledge the God within that is incapable of failure? Conviction is your entry into godhood. Stop wanting, and start knowing.',
          },
        ],
      },
    ],
  },
];

export const currentWeeklyPost: WeeklyPost = weeklyPosts[0];
