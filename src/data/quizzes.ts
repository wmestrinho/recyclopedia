// Recyclopedia Academy — quiz data.
// Ported from the Gemini-drafted JSON quiz blocks (academy_1_1_a/b, academy_1_2_a),
// typed and fact-checked against our live Myths module + Gratitude Hierarchy.
// Rendered by src/components/Quiz.svelte.

export interface QuizQuestion {
  id: string;
  question: string;
  options: Record<string, string>; // keyed "A" | "B" | "C" ...
  correct: string; // key into options
  explanation: string;
}

export interface Quiz {
  quiz_id: string;
  title: string;
  questions: QuizQuestion[];
}

export const QUIZZES: Record<string, Quiz> = {
  academy_1_1_a: {
    quiz_id: 'academy_1_1_a',
    title: 'Understanding the Evolution of Trash',
    questions: [
      {
        id: 'q1',
        question: 'What was the main public health issue caused by pre-1930s open garbage dumps?',
        options: {
          A: 'They took up too much visual space in the city centers.',
          B: 'They attracted massive rat and pest infestations that spread deadly diseases.',
          C: 'They caused cities to run out of topsoil.',
        },
        correct: 'B',
        explanation:
          'Open dumps let pests feed and breed freely, driving severe outbreaks of typhoid and cholera in crowded cities.',
      },
      {
        id: 'q2',
        question: 'What engineering innovation did Jean Vincenz introduce to waste management in 1935?',
        options: {
          A: 'He invented the first automated plastic recycling machine.',
          B: 'He built the first high-temperature municipal incinerator.',
          C: 'He compressed trash into thin layers and sealed it under dirt daily.',
        },
        correct: 'C',
        explanation:
          'Vincenz pioneered the sanitary landfill "trench method" — compacting refuse and covering it with daily soil to starve pests of food and oxygen.',
      },
      {
        id: 'q3',
        question: 'Why do organic items like food scraps fail to decompose inside a modern landfill?',
        options: {
          A: 'Because modern landfills are tightly compressed and starved of oxygen.',
          B: 'Because plastic liners chemically freeze decomposition.',
          C: 'Because the trash is sprayed with preservatives before burial.',
        },
        correct: 'A',
        explanation:
          'Landfills are oxygen- and moisture-poor. Without them, natural decomposition stalls — a 1980s newspaper can still be readable today.',
      },
    ],
  },

  academy_1_1_b: {
    quiz_id: 'academy_1_1_b',
    title: 'The Impact of Modern Landfill Laws',
    questions: [
      {
        id: 'q4',
        question:
          'What infrastructure does a modern landfill legally require to protect local drinking-water aquifers?',
        options: {
          A: 'Massive concrete dome lids.',
          B: 'Thick plastic (HDPE) composite liners and clay backings.',
          C: 'Water-filtration fans around the property fence.',
        },
        correct: 'B',
        explanation:
          'The U.S. RCRA Act of 1976 mandated composite liners and clay to catch toxic leachate before it seeps into groundwater.',
      },
      {
        id: 'q5',
        question:
          'What does the landfill "tomb effect" teach us about our individual disposal choices?',
        options: {
          A: 'Everything eventually rots, so what we bin does not matter.',
          B: 'Because buried waste barely breaks down, keeping materials in use (reuse, repair, recycle) matters more than burying them.',
          C: 'Burning trash at home is the cleanest option.',
        },
        correct: 'B',
        explanation:
          'A landfill preserves rather than digests. The most powerful citizen move is to keep materials circulating — the top rungs of the Gratitude Hierarchy.',
      },
    ],
  },

  academy_1_2_a: {
    quiz_id: 'academy_1_2_a',
    title: 'Smart Sorting in the Real World',
    questions: [
      {
        id: 'q1',
        question:
          'You finish a clear plastic drink bottle marked with a "1" (PET) inside the chasing-arrows symbol. What is usually the best move?',
        options: {
          A: 'Trash it — plastic is never really recycled.',
          B: 'Empty and rinse it, then put it in curbside recycling (most programs accept #1 PET and #2 HDPE).',
          C: 'Put it in the compost bin.',
        },
        correct: 'B',
        explanation:
          '#1 PET and #2 HDPE are the most widely accepted curbside plastics worldwide. Empty, rinse, and recycle — don\'t landfill them.',
      },
      {
        id: 'q2',
        question: 'What does the chasing-arrows symbol with a number (1–7) on a plastic item actually tell you?',
        options: {
          A: 'That your local program definitely accepts it.',
          B: 'The resin type the plastic is made of — not a guarantee it is recycled locally.',
          C: 'That the item is compostable.',
        },
        correct: 'B',
        explanation:
          'The number is a resin identification code, not an acceptance promise. Always check your municipality\'s accepted list — this is the #1 myth on our Myths board.',
      },
      {
        id: 'q3',
        question:
          'You have an item and genuinely cannot tell whether your local program takes it. What is the safe default for the recycling bin?',
        options: {
          A: 'When in doubt, throw it in recycling — it can\'t hurt.',
          B: 'When in doubt, leave it out — one wrong item can contaminate a whole load.',
          C: 'Cut it into pieces so the machine can\'t tell.',
        },
        correct: 'B',
        explanation:
          '"Wish-cycling" contaminates loads and sends real recyclables to landfill. If unsure, keep it out of recycling and check the Lookup or your local rules.',
      },
    ],
  },

  academy_1_3_a: {
    quiz_id: 'academy_1_3_a',
    title: 'Mastering Home Micro-Habits',
    questions: [
      {
        id: 'q1',
        question:
          "What is the primary operational benefit of leaving vegetables loose ('naked') during grocery shopping?",
        options: {
          A: 'It allows the store cashier to scan the barcodes faster.',
          B: 'It stops thin-film plastics from entering waste streams, where they easily tangle and jam industrial sorting machinery.',
          C: 'It helps the vegetables absorb more ambient oxygen on the way home.',
        },
        correct: 'B',
        explanation:
          'Thin plastic produce bags are a nightmare for sorting plants. They wrap around mechanical rotating axles and force expensive facility shutdowns.',
      },
      {
        id: 'q2',
        question:
          "Why does setting up a simple '2-Tray System' on your kitchen counter have an exponential positive impact?",
        options: {
          A: 'It acts as a physical reminder to isolate organic waste from oxygen-depleted landfills.',
          B: 'It changes the color of the final agricultural compost mix.',
          C: 'It reduces the amount of household tap water used during cooking.',
        },
        correct: 'A',
        explanation:
          'Keeping organic materials separate from the start ensures they can be cleanly routed to composting — preventing the creation of landfill methane gas.',
      },
    ],
  },

  academy_5_a: {
    quiz_id: 'academy_5_a',
    title: 'Myth-Busting Check',
    questions: [
      {
        id: 'q1',
        question: 'A plastic tub shows a chasing-arrows symbol with a "5" inside. What does that tell you?',
        options: {
          A: 'It is guaranteed recyclable in your curbside bin.',
          B: 'It is the resin type (#5 PP) — not a promise your local program accepts it.',
          C: 'It is compostable.',
        },
        correct: 'B',
        explanation:
          'The number is a resin code. Only #1 PET and #2 HDPE are widely accepted curbside; #3–#7 vary by city. Check your local list.',
      },
      {
        id: 'q2',
        question: 'You\'re unsure whether something belongs in recycling. What\'s the safest move?',
        options: {
          A: 'Put it in recycling just in case — it can\'t hurt.',
          B: 'Leave it out — one wrong item can contaminate a whole load.',
          C: 'Put it in the green compost bin.',
        },
        correct: 'B',
        explanation:
          'Wish-cycling is the most destructive myth. When in doubt, leave it out — contamination sends real recyclables to landfill.',
      },
      {
        id: 'q3',
        question: 'Which is the *most* sustainable choice for an item you no longer need?',
        options: {
          A: 'Recycle it — recycling is always best.',
          B: 'Refuse/reduce/reuse it first; recycling sits near the bottom of the hierarchy.',
          C: 'Throw it away so it doesn\'t contaminate recycling.',
        },
        correct: 'B',
        explanation:
          'Refuse → Reduce → Reuse → Repair → Recycle → Rot → Dispose. Recycling uses energy and water; keeping things in use beats it — the heart of the Gratitude Hierarchy.',
      },
    ],
  },
};
