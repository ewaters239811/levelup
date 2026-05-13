/**
 * Weekly blog posts shown before the Identity Collapse Index assessment.
 * Only `currentWeeklyPost` (newest, `weeklyPosts[0]`) is shown on `/weekly`;
 * older entries stay in the array as your archive while drafting.
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
    slug: 'heal-body-master-presence-may-12-2026',
    weekOfLabel: 'Week of May 12, 2026',
    title:
      'Heal the Body & Master Presence: The Hidden Reason You Feel Stuck, Drained, and Trapped in Your Mind',
    sections: [
      {
        title: 'Introduction',
        blocks: [
          {
            kind: 'p',
            text: 'Most people believe their suffering begins in the mind.',
          },
          {
            kind: 'p',
            text: 'They assume the problem is anxiety, stress, overthinking, or negative thoughts.',
          },
          {
            kind: 'p',
            text: 'But Heal the Body and Master Presence offers a deeper perspective:',
          },
          {
            kind: 'h3',
            text: 'The mind is often reacting to pain the body has never processed.',
          },
          {
            kind: 'p',
            text: 'Beneath constant thinking lives a buildup of suppressed emotions — unresolved sadness, anger, fear, shame, and tension stored in the body over time.',
          },
          {
            kind: 'p',
            text: 'The book refers to this accumulated emotional energy as the pain body.',
          },
          {
            kind: 'p',
            text: 'Until it is acknowledged, it quietly shapes your thoughts, reactions, and daily experience.',
          },
        ],
      },
      {
        title: 'Best Quote',
        blocks: [
          {
            kind: 'quote',
            text: "If you cannot access what’s inside, you’re locked outside the gates of heaven, and you’ll be trapped in your mind.",
          },
        ],
      },
      {
        title: 'The Pain Body',
        blocks: [
          {
            kind: 'h3',
            text: 'Why Your Mind Never Stops Racing',
          },
          {
            kind: 'p',
            text: 'The pain body is more than emotional memory.',
          },
          {
            kind: 'p',
            text: 'It is stored emotional energy that influences:',
          },
          {
            kind: 'ul',
            items: [
              'Your thoughts',
              'Your reactions',
              'Your stress levels',
              'Your energy',
              'Your relationships',
              'Your ability to feel peace',
            ],
          },
          {
            kind: 'p',
            text: 'When emotional pain is ignored, the mind often becomes louder and more reactive.',
          },
          {
            kind: 'h3',
            text: 'This Can Show Up As',
          },
          {
            kind: 'ul',
            items: [
              'Chronic overthinking',
              'Irritability',
              'Emotional numbness',
              'Anxiety',
              'Restlessness',
              'Low self-awareness',
              'Constant mental noise',
            ],
          },
          {
            kind: 'p',
            text: 'The mind becomes overactive because the body feels uncomfortable to fully experience.',
          },
          {
            kind: 'p',
            text: 'So instead of feeling emotions directly, many people stay trapped in cycles of thought.',
          },
        ],
      },
      {
        title: 'Presence Starts in the Body',
        blocks: [
          {
            kind: 'h3',
            text: 'You Cannot Think Your Way Into Healing',
          },
          {
            kind: 'p',
            text: 'One of the book’s central teachings is that true healing cannot happen through mental analysis alone.',
          },
          {
            kind: 'p',
            text: 'You do not heal by endlessly trying to “figure yourself out.”',
          },
          {
            kind: 'p',
            text: 'You heal by becoming present enough to feel what has been buried.',
          },
          {
            kind: 'h3',
            text: 'The Body Is the Doorway to Presence.',
          },
          {
            kind: 'p',
            text: 'And presence is the doorway to peace.',
          },
          {
            kind: 'p',
            text: 'Many people remain disconnected from themselves because going inward feels uncomfortable. The body often carries years of emotional tension, and silence can bring that tension to the surface.',
          },
          {
            kind: 'p',
            text: 'As a result, the mind stays busy to avoid discomfort.',
          },
          {
            kind: 'p',
            text: 'But healing begins the moment awareness returns to the body.',
          },
        ],
      },
      {
        title: 'Silence Is Essential',
        blocks: [
          {
            kind: 'h3',
            text: 'Stillness Allows Emotions to Surface',
          },
          {
            kind: 'p',
            text: 'The book emphasizes that silence is not a luxury.',
          },
          {
            kind: 'p',
            text: 'It is necessary.',
          },
          {
            kind: 'p',
            text: 'A constantly stimulated environment keeps the nervous system overwhelmed and prevents emotional release from happening naturally.',
          },
          {
            kind: 'p',
            text: 'Noise distracts. Stillness reveals.',
          },
          {
            kind: 'p',
            text: 'External silence supports internal silence.',
          },
          {
            kind: 'p',
            text: 'And internal silence creates space for stored emotions to finally surface.',
          },
          {
            kind: 'h3',
            text: 'Simple Practices That Restore Presence',
          },
          {
            kind: 'ul',
            items: [
              'Slow your breathing',
              'Reduce unnecessary stimulation',
              'Spend time in silence',
              'Sit in stillness daily',
              'Observe bodily sensations',
              'Become aware of emotional tension',
            ],
          },
          {
            kind: 'p',
            text: 'As the breath slows, awareness gradually moves from the mind into the body.',
          },
          {
            kind: 'p',
            text: 'That shift changes everything.',
          },
        ],
      },
      {
        title: 'Emotional Alchemy',
        blocks: [
          {
            kind: 'h3',
            text: 'Emotions Heal When They Are Observed',
          },
          {
            kind: 'p',
            text: 'One of the book’s most powerful lessons is that emotions do not need to be controlled.',
          },
          {
            kind: 'p',
            text: 'They need to be acknowledged.',
          },
          {
            kind: 'p',
            text: 'Much emotional suffering continues because people resist what they feel.',
          },
          {
            kind: 'p',
            text: 'They judge emotions.',
          },
          {
            kind: 'p',
            text: 'Suppress them.',
          },
          {
            kind: 'p',
            text: 'Distract themselves.',
          },
          {
            kind: 'p',
            text: 'Or escape into productivity, entertainment, or overthinking.',
          },
          {
            kind: 'p',
            text: 'But emotions often soften when they are fully observed without resistance.',
          },
          {
            kind: 'p',
            text: 'The book compares emotions to a person who simply wants to be heard.',
          },
          {
            kind: 'h3',
            text: 'The Practice',
          },
          {
            kind: 'p',
            text: 'Observe emotions without:',
          },
          {
            kind: 'ul',
            items: [
              'Judgment',
              'Resistance',
              'Overanalyzing',
              'Creating stories around them',
              'Trying to immediately “fix” yourself',
            ],
          },
          {
            kind: 'p',
            text: 'Instead, allow the feeling to exist without fighting it.',
          },
          {
            kind: 'p',
            text: 'Over time, this weakens the pain body and creates greater emotional clarity and inner peace.',
          },
        ],
      },
      {
        title: 'The Physical Cost of Emotional Suppression',
        blocks: [
          {
            kind: 'h3',
            text: 'Emotional Pain Can Become Physical Tension',
          },
          {
            kind: 'p',
            text: 'The book suggests that unprocessed emotions can eventually affect the body itself.',
          },
          {
            kind: 'p',
            text: 'Suppressed emotional energy may contribute to chronic stress, exhaustion, and emotional heaviness.',
          },
          {
            kind: 'p',
            text: 'Over time, this can lead to:',
          },
          {
            kind: 'ul',
            items: [
              'Fatigue',
              'Low vitality',
              'Physical tension',
              'Emotional burnout',
              'Feeling disconnected from life',
            ],
          },
          {
            kind: 'p',
            text: 'When emotional energy is processed in a healthy way, the body often feels lighter and more relaxed.',
          },
          {
            kind: 'p',
            text: 'Presence deepens.',
          },
          {
            kind: 'p',
            text: 'Energy returns.',
          },
          {
            kind: 'p',
            text: 'And authentic self-expression becomes easier.',
          },
        ],
      },
      {
        title: 'True Presence Changes Everything',
        blocks: [
          {
            kind: 'h3',
            text: 'Peace Is Not Something You Chase',
          },
          {
            kind: 'p',
            text: 'The book ultimately teaches that presence is your natural state beneath mental noise and emotional resistance.',
          },
          {
            kind: 'p',
            text: 'Inner peace is not something you create.',
          },
          {
            kind: 'p',
            text: 'It is something you uncover.',
          },
          {
            kind: 'p',
            text: 'The moment you stop running from yourself, healing begins.',
          },
          {
            kind: 'p',
            text: 'The moment you allow emotions instead of suppressing them, the mind gradually becomes quieter.',
          },
          {
            kind: 'p',
            text: 'And when the mind quiets, life becomes clearer.',
          },
        ],
      },
      {
        title: 'Final Reflection',
        blocks: [
          {
            kind: 'p',
            text: 'Healing is not about becoming someone new.',
          },
          {
            kind: 'p',
            text: 'It is about reconnecting with what has always existed beneath the noise.',
          },
          {
            kind: 'p',
            text: 'Beneath overthinking is awareness.',
          },
          {
            kind: 'p',
            text: 'Beneath tension is stillness.',
          },
          {
            kind: 'p',
            text: 'Beneath emotional pain is presence.',
          },
          {
            kind: 'p',
            text: 'The path to peace begins when you stop escaping your inner world and allow yourself to fully experience it with awareness and compassion.',
          },
        ],
      },
    ],
  },
  {
    slug: 'emotion-trap-identity-loop-may-5-2026',
    weekOfLabel: 'Week of May 5, 2026',
    title: "The Identity Loop: The Emotional Trap Beneath Discipline and Strategy",
    sections: [
      {
        title: "This Week's Note",
        blocks: [
          {
            kind: 'p',
            text: 'Most people think they’re stuck because they lack discipline, strategy, or motivation.',
          },
          { kind: 'p', text: 'But that’s not the real trap.' },
          { kind: 'p', text: 'The real trap is emotional.' },
          {
            kind: 'h3',
            text: 'The Emotion Trap You Don’t Know You’re In',
          },
          {
            kind: 'p',
            text: 'There’s a pattern most people never notice:',
          },
          {
            kind: 'p',
            text: 'One week you’re locked in. Focused. Disciplined. Aligned.',
          },
          { kind: 'p', text: 'The next week? Low energy. Doubt. Self-sabotage.' },
          { kind: 'p', text: 'Then you try again.' },
          { kind: 'p', text: 'And the cycle repeats.' },
          {
            kind: 'p',
            text: 'This isn’t random. It’s what I call the identity loop.',
          },
          {
            kind: 'p',
            text: 'Your emotions shape how you see reality.',
          },
          {
            kind: 'p',
            text: 'And how you see reality reinforces those same emotions.',
          },
          {
            kind: 'p',
            text: 'So if you feel off… you start seeing everything through that lens.',
          },
          {
            kind: 'p',
            text: 'One bad moment turns into a bad day. A bad day becomes a bad week.',
          },
          {
            kind: 'p',
            text: 'Not because of what happened—but because of how you emotionally aligned with it.',
          },
          {
            kind: 'h3',
            text: 'Emotion Is the Language of Your Reality',
          },
          {
            kind: 'p',
            text: 'The word “emotion” comes from emovere—meaning “to disturb.”',
          },
          {
            kind: 'p',
            text: 'Emotion is literally a disturbance in your internal state.',
          },
          { kind: 'p', text: 'But it’s more than that.' },
          {
            kind: 'p',
            text: 'Emotion is the language of the universe.',
          },
          {
            kind: 'p',
            text: 'It’s how you “communicate” what you’re aligned with.',
          },
          {
            kind: 'ul',
            items: [
              'Gratitude → expansion',
              'Joy → flow',
              'Scarcity → limitation',
              'Fear → contraction',
            ],
          },
          {
            kind: 'p',
            text: 'What you consistently feel, you reinforce.',
          },
          {
            kind: 'p',
            text: 'So guarding your energy isn’t just about avoiding negativity—it’s about being intentional with what you emotionally invest in.',
          },
          {
            kind: 'h3',
            text: 'Why You Keep Repeating the Same Patterns',
          },
          {
            kind: 'p',
            text: 'Most emotional patterns don’t start today.',
          },
          { kind: 'p', text: 'They were learned.' },
          { kind: 'p', text: 'Stored.' },
          { kind: 'p', text: 'Embedded.' },
          {
            kind: 'p',
            text: 'What we call “trauma” isn’t always dramatic—it’s unresolved emotional experiences that your body never processed.',
          },
          {
            kind: 'p',
            text: 'Your body remembers:',
          },
          {
            kind: 'ul',
            items: [
              'How money felt in your household',
              'How love was modeled to you',
              'What success looked like emotionally',
            ],
          },
          {
            kind: 'p',
            text: 'So even if you want something different…',
          },
          {
            kind: 'p',
            text: 'Your nervous system will recreate what feels familiar.',
          },
          {
            kind: 'p',
            text: 'If money was tied to stress or conflict, you won’t just chase money—you’ll recreate the same emotional experience around it.',
          },
          {
            kind: 'p',
            text: 'Desire doesn’t override conditioning.',
          },
          { kind: 'p', text: 'Emotion does.' },
          {
            kind: 'h3',
            text: 'Breaking the Loop in Real Time',
          },
          { kind: 'p', text: 'You don’t break cycles by force.' },
          { kind: 'p', text: 'You break them with awareness.' },
          {
            kind: 'p',
            text: 'In the moment you feel triggered:',
          },
          { kind: 'p', text: 'Pause.' },
          { kind: 'p', text: 'Breathe.' },
          { kind: 'p', text: 'Observe.' },
          {
            kind: 'p',
            text: 'Don’t immediately identify with the emotion.',
          },
          {
            kind: 'p',
            text: 'Because the second you say “this is me,” you’re already back in the loop.',
          },
          {
            kind: 'p',
            text: 'Practices like meditation and prayer aren’t abstract—they train you to separate awareness from reaction.',
          },
          { kind: 'p', text: 'To feel without becoming.' },
          { kind: 'p', text: 'To observe without spiraling.' },
          {
            kind: 'p',
            text: 'And here’s the key:',
          },
          {
            kind: 'p',
            text: 'Emotions have to be felt to be released.',
          },
          {
            kind: 'p',
            text: 'Suppressing them doesn’t solve anything—it stores them.',
          },
          {
            kind: 'p',
            text: 'And stored emotions compound over time.',
          },
          {
            kind: 'h3',
            text: 'Rewriting What’s Been Stored',
          },
          {
            kind: 'p',
            text: 'Real change doesn’t just happen in the present.',
          },
          {
            kind: 'p',
            text: 'It happens when you go back.',
          },
          {
            kind: 'p',
            text: 'When you revisit the emotional roots.',
          },
          {
            kind: 'p',
            text: 'Through deep reflection (or meditation), you can:',
          },
          {
            kind: 'ul',
            items: [
              'Re-enter past experiences',
              'Feel what you couldn’t feel then',
              'Reimagine them in alignment with who you are now',
            ],
          },
          { kind: 'p', text: 'This isn’t denial.' },
          { kind: 'p', text: 'It’s recalibration.' },
          {
            kind: 'p',
            text: 'You’re teaching your nervous system a new emotional truth.',
          },
          {
            kind: 'p',
            text: 'And once the emotion changes…',
          },
          {
            kind: 'p',
            text: 'The pattern loses its grip.',
          },
          {
            kind: 'h3',
            text: 'Triggers Aren’t Setbacks — They’re Signals',
          },
          {
            kind: 'p',
            text: 'Even after doing the work, triggers will still show up.',
          },
          {
            kind: 'p',
            text: 'That’s part of the process.',
          },
          {
            kind: 'p',
            text: 'The difference is how you respond.',
          },
          {
            kind: 'p',
            text: 'Triggers are echoes of old emotional imprints.',
          },
          {
            kind: 'p',
            text: 'They’re not here to stop you—they’re here to show you what still needs awareness.',
          },
          {
            kind: 'p',
            text: 'The moment you can see the pattern instead of react from it…',
          },
          {
            kind: 'p',
            text: 'You begin to outgrow it.',
          },
          {
            kind: 'h3',
            text: 'Emotional Authority Changes Everything',
          },
          {
            kind: 'p',
            text: 'At the highest level, this is what it comes down to:',
          },
          {
            kind: 'p',
            text: 'If you don’t have control over your emotional state… you don’t have control over your direction.',
          },
          {
            kind: 'p',
            text: 'Emotional mastery isn’t about being numb.',
          },
          { kind: 'p', text: 'It’s about being aware.' },
          {
            kind: 'p',
            text: 'Because awareness is what breaks cycles.',
          },
          {
            kind: 'p',
            text: 'Awareness is what rewrites identity.',
          },
          {
            kind: 'p',
            text: 'Awareness is what changes your reality.',
          },
          {
            kind: 'p',
            text: 'If you take one thing from this, let it be this:',
          },
          {
            kind: 'quote',
            text: 'Your life doesn’t change when your actions change.\n\nIt changes when your emotional patterns do.',
          },
        ],
      },
    ],
  },
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
