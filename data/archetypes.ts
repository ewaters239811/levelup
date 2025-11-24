import { Archetype } from '@/types';

export const archetypes: Record<string, Archetype> = {
  UNFOCUSED_VISIONARY: {
    key: 'UNFOCUSED_VISIONARY',
    name: 'The Unfocused Visionary',
    tagline: 'Your ideas are big. Your follow-through is small.',
    description: 'You see possibilities everywhere. You feel the potential in you, and people can feel it too. But your energy is scattered across too many paths, so nothing gets sustained long enough to break through.',
    mainBlocks: [
      'You jump to new ideas before the current one has time to grow.',
      'You rely on motivation instead of systems.',
      'You are addicted to potential, not process.'
    ],
    weeklyMoves: [
      'Choose one main goal for the next 30 days and ruthlessly ignore side quests.',
      'Create a simple daily non-negotiable: one action per day that moves that goal forward.',
      'Track your wins every night so your brain gets addicted to completion, not just ideas.'
    ],
    bibleVerses: [
      'Proverbs 4:25-27 - "Let your eyes look straight ahead; fix your gaze directly before you. Give careful thought to the paths for your feet and be steadfast in all your ways."',
      'Philippians 3:13-14 - "Brothers and sisters, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead, I press on toward the goal."',
      'Ecclesiastes 9:10 - "Whatever your hand finds to do, do it with all your might."'
    ]
  },
  SILENT_GRINDER: {
    key: 'SILENT_GRINDER',
    name: 'The Silent Grinder',
    tagline: 'You do the work. You rarely claim the stage.',
    description: 'You are consistent, reliable, and you carry a lot on your shoulders. You know how to work, but you do not always know how to position yourself, leverage your value, or step into the spotlight you have earned.',
    mainBlocks: [
      'You over-identify as a worker instead of a leader.',
      'You rarely make bold asks - for money, recognition, or opportunities.',
      'You confuse being busy with being strategically positioned.'
    ],
    weeklyMoves: [
      'List your top 5 wins from the last 90 days and send at least one of them to someone who needs to see your value (boss, client, collaborator).',
      'Block 1 hour this week for strategy only - no tasks, just thinking and planning.',
      'Practice one bold ask: a raise, a new role, a collaboration, or a higher price.'
    ],
    bibleVerses: [
      'Matthew 5:14-16 - "You are the light of the world. A town built on a hill cannot be hidden. Neither do people light a lamp and put it under a bowl. Instead they put it on its stand, and it gives light to everyone in the house."',
      '1 Peter 2:9 - "But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light."',
      'Jeremiah 29:11 - "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."'
    ]
  },
  OVERGIVER: {
    key: 'OVERGIVER',
    name: 'The Overgiver',
    tagline: 'You pour into everyone else and leave yourself on low battery.',
    description: 'Your heart is big, your loyalty is real, and people lean on you. But your identity has been built around being needed, not being nourished. You help others rise while delaying your own ascension.',
    mainBlocks: [
      'You say yes to things that drain you.',
      'You feel guilty when you prioritize yourself.',
      'You expect people to just know what you need but rarely voice it.'
    ],
    weeklyMoves: [
      'Choose one thing you currently do for others that you will pause for 7 days.',
      'Schedule one block of time this week that is only for your growth: gym, studying, planning, or creating.',
      'Communicate one clear boundary to someone close to you - calmly, without over-explaining.'
    ],
    bibleVerses: [
      'Mark 12:30-31 - "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength. The second is this: Love your neighbor as yourself."',
      '1 Corinthians 6:19-20 - "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies."',
      'Galatians 6:2-5 - "Carry each other\'s burdens, and in this way you will fulfill the law of Christ. But each one should test their own actions. Then they can take pride in themselves alone, without comparing themselves to someone else."'
    ]
  },
  CAGED_POTENTIAL: {
    key: 'CAGED_POTENTIAL',
    name: 'The Caged Potential',
    tagline: 'You know you\'re built for more. Your actions haven\'t fully matched it yet.',
    description: 'You can feel the gap between who you are and who you\'re supposed to be. You see flashes of your higher self in your mind, but fear, overthinking, or comfort keeps you moving in half-steps instead of full decisions.',
    mainBlocks: [
      'You wait for the perfect moment instead of creating momentum.',
      'You let fear of judgment or failure slow your moves.',
      'You stay in environments that do not demand your highest standard.'
    ],
    weeklyMoves: [
      'Identify one decision you have been avoiding and commit to a deadline within 7 days.',
      'Do one uncomfortable action that signals to your brain: We are not the old version anymore.',
      'Audit your environment - remove one habit, space, or relationship that keeps you playing small.'
    ],
    bibleVerses: [
      '2 Timothy 1:7 - "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline."',
      'Joshua 1:9 - "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."',
      'Isaiah 41:10 - "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."'
    ]
  },
  lone_wolf_thinker: {
    key: 'lone_wolf_thinker',
    name: 'The Lone Wolf Thinker',
    tagline: 'You think deeply in isolation, but your insights rarely reach the world.',
    description: 'You\'ve learned to trust your own mind above all else. You think better alone, but your best insights remain trapped in your head. Your solutions never get tested in the real world, and your wisdom never reaches the people who need it most.',
    mainBlocks: [
      'You\'ve become so good at thinking that you\'ve forgotten how to translate thought into action.',
      'You isolate yourself because you haven\'t found people who match your depth.',
      'You prefer working alone, but this keeps your insights from having real impact.'
    ],
    weeklyMoves: [
      'Share one insight this week: Write it down, tell someone, or post it somewhere.',
      'Practice "thinking out loud": Let someone witness your thought process, even if it feels vulnerable.',
      'Find one person who can handle your depth: Start small, share one complex idea.'
    ],
    bibleVerses: [
      'Proverbs 27:17 - "As iron sharpens iron, so one person sharpens another."',
      'Ecclesiastes 4:9-10 - "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up."',
      'Hebrews 10:24-25 - "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together."'
    ]
  },
  impulsive_firestarter: {
    key: 'impulsive_firestarter',
    name: 'The Impulsive Firestarter',
    tagline: 'You move fast and start fires, but rarely stay to tend the flame.',
    description: 'You\'re wired for ignition. You see opportunity, you feel energy, you move. But you start fires everywhere and never stay to tend them. The initial spark excites you, but the maintenance bores you, so you abandon one fire to start another.',
    mainBlocks: [
      'You\'re addicted to the high of starting, but you haven\'t learned to find meaning in the middle.',
      'You confuse energy with effectiveness - starting many things but finishing few.',
      'You abandon projects when they move from exciting to routine.'
    ],
    weeklyMoves: [
      'Choose one fire to tend: Pick one thing you started and commit to maintaining it for 30 days.',
      'Practice "boring consistency": Do one thing every day, even when it doesn\'t feel exciting.',
      'Notice your impulse to start new things: Before starting something new, ask: "Am I running from something I should finish?"'
    ],
    bibleVerses: [
      'Luke 14:28-30 - "Suppose one of you wants to build a tower. Won\'t you first sit down and estimate the cost to see if you have enough money to complete it? For if you lay the foundation and are not able to finish it, everyone who sees it will ridicule you."',
      'Philippians 1:6 - "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus."',
      'Galatians 6:9 - "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."'
    ]
  },
  doubt_ridden_strategist: {
    key: 'doubt_ridden_strategist',
    name: 'The Doubt-Ridden Strategist',
    tagline: 'You plan everything perfectly, but doubt keeps you from executing.',
    description: 'You\'re brilliant at strategy. You can see all the angles, anticipate all the problems, map all the possibilities. But somewhere between the plan and the action, doubt creeps in. So you plan more, you refine, you optimize - but you never quite feel ready, and you never quite take the step.',
    mainBlocks: [
      'You\'ve built your identity around being smart and right, so the risk of being wrong terrifies you.',
      'Your strategy becomes a form of procrastination - planning instead of acting.',
      'You stay in the safe space of planning, where you can\'t fail because you haven\'t tried.'
    ],
    weeklyMoves: [
      'Act on one plan this week: Pick a strategy and execute it, even if you don\'t feel 100% ready.',
      'Practice "good enough planning": Set a time limit for planning, then force yourself to act.',
      'Notice your doubt: When doubt comes up, acknowledge it, then act anyway.'
    ],
    bibleVerses: [
      'James 1:22 - "Do not merely listen to the word, and so deceive yourselves. Do what it says."',
      'Proverbs 16:3 - "Commit to the Lord whatever you do, and he will establish your plans."',
      'Joshua 1:9 - "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."'
    ]
  }
};

