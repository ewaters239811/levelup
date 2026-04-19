/**
 * Current weekly blog shown before the Identity Collapse Index assessment.
 * Replace `currentWeeklyPost` when you publish a new week.
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
  weekOfLabel: string;
  title: string;
  sections: PostSection[];
};

export const currentWeeklyPost: WeeklyPost = {
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
          text: 'The secret to materializing your reality is not found in religious piety or harder work, but in a radical metaphysical technology called the Christ Way. This is not about worshipping a historical figure; it is about a total unification of consciousness. Every human being is God wearing a mask—playing "dress-up" in a physical vessel. The Christ Way is the process of removing that mask and aligning your mind with the Infinite Intelligence to transcend the limitations of the material realm.',
        },
      ],
    },
    {
      title: '2. Redefining Christ: A Title of Spiritual Mastery',
      blocks: [
        {
          kind: 'p',
          text: 'To master your reality, you must first deconstruct the dogma. In the realm of the esoteric, "Christ" is not a name—it is a title, a degree of metaphysics, and a specific state of consciousness.',
        },
        {
          kind: 'p',
          text: 'As documented in George G.M. James\'s Stolen Legacy, much of what we consider Greek or Western spirituality was adapted from the Egyptian (Kmetic) system. The term Christos originates from the Kmetic word KST, meaning "The Anointed One," a title of spiritual mastery used 1,500 years before Pythagoras ever set foot in Egypt. This lineage connects through the Hindu title Krishna to the "Avatars" like Buddha and Jesus—individuals who achieved total mental unity with the "All."',
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
          text: 'The primary mistake in manifestation is "wanting." Wanting is a confession of separation. If you want a reality, you are declaring that you do not have it, and the universe—acting as a mirror—will reflect that lack back to you.',
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
          text: 'The universe punishes those who do not know who they are. When you are "impressed" by a desire—whether it\'s a car, a career, or a partner—you are attributing "importance" to it. In the energetic space of the universe, importance is interpreted as: "This thing has the power to alter my internal state because I am currently incomplete without it."',
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
            'God Knows, Ego Believes: The ego "believes" and struggles with doubt. God does not believe—God knows. Conviction is what enters you into godhood.',
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
          text: 'The Christ Way is the path of mental unification, the neutralization of importance, and the surrender of the ego\'s delusions of grandeur. It is the realization that you are the conduit through which Infinite Intelligence acts. When you establish cause in the mental realm, the effect in the physical realm is not just a possibility—it is an inevitability.',
        },
        {
          kind: 'p',
          text: 'The question is no longer whether you can manifest your reality. The question is: Are you ready to stop playing "dress-up" as a limited, struggling human and acknowledge the God within that is incapable of failure? Conviction is your entry into godhood. Stop wanting, and start knowing.',
        },
      ],
    },
  ],
};
