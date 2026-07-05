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
  track?: string;
  module?: string;
  questions: QuizQuestion[];
}

export const QUIZZES: Record<string, Quiz> = {
  academy_1_1_a: {
    quiz_id: 'academy_1_1_a',
    title: 'Understanding the Evolution of Trash',
    track: 'Citizen Science & Action',
    module: '1.1',
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
    track: 'Citizen Science & Action',
    module: '1.1',
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
    track: 'Citizen Science & Action',
    module: '1.2',
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
    track: 'Citizen Science & Action',
    module: '1.3',
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
    track: 'Citizen Science & Action',
    module: '5',
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

  academy_1_4_a: {
    quiz_id: 'academy_1_4_a',
    title: 'The Upcycling Masterclass',
    track: 'Citizen Science & Action',
    module: '1.4',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary difference between standard industrial recycling and localized upcycling?',
        options: {
          A: 'Recycling is done for profit, while upcycling can only be done as a hobby.',
          B: 'Upcycling transforms materials in their current state into higher-value items, skipping energy-heavy industrial melting.',
          C: 'Recycling requires plant-based bioplastics, while upcycling only works on scrap metal.',
        },
        correct: 'B',
        explanation:
          "Upcycling bypasses the entire municipal shipping, processing, and re-manufacturing pipeline by using creative design to extend an item's functional life right where it is.",
      },
      {
        id: 'q2',
        question: 'Why is a capillary wick (cotton string) essential in a Self-Watering Sub-Irrigation Planter?',
        options: {
          A: 'It filters out microplastics from the soil matrix.',
          B: 'It automatically draws water upward from the lower basin to the roots, preventing evaporation and water waste.',
          C: 'It chemically breaks down the plastic bottle inside the planter.',
        },
        correct: 'B',
        explanation:
          'The wick uses natural capillary forces to keep soil moist without over-watering, turning an old plastic bottle into an efficient agricultural system.',
      },
    ],
  },

  academy_1_5_a: {
    quiz_id: 'academy_1_5_a',
    title: 'The Zero-Waste Shopping Matrix',
    track: 'Citizen Science & Action',
    module: '1.5',
    questions: [
      {
        id: 'q1',
        question: 'Why is an aluminum can ranked higher in the matrix than a plastic beverage bottle?',
        options: {
          A: 'Aluminum protects the liquid flavor better over time.',
          B: 'Aluminum can be recycled infinitely without degrading, while plastic degrades and downcycles after one or two uses.',
          C: 'Aluminum is a plant-based material that dissolves in the rain.',
        },
        correct: 'B',
        explanation:
          'Aluminum is infinitely recyclable. Plastics lose structural integrity when melted down, so they quickly end up in a landfill regardless of recycling efforts.',
      },
      {
        id: 'q2',
        question: 'What makes multi-layer packaging (like baby-food squeeze pouches or chip bags) Tier 4, landfill-bound?',
        options: {
          A: 'They are too lightweight for sorting sensors to detect.',
          B: 'They fuse different materials together (plastic and aluminum foil), making them impossible to separate and recycle.',
          C: 'They are coated with standard industrial wax.',
        },
        correct: 'B',
        explanation:
          'Fused multi-layer plastics cannot be separated. They are impossible to process through recycling infrastructure and are designed exclusively for the trash.',
      },
    ],
  },

  academy_1_6_a: {
    quiz_id: 'academy_1_6_a',
    title: 'The Circular Wardrobe',
    track: 'Citizen Science & Action',
    module: '1.6',
    questions: [
      {
        id: 'q1',
        question: 'What ecological threat do synthetic fabrics like polyester and nylon present when washed?',
        options: {
          A: 'They consume three times more water than cotton towels.',
          B: 'They shed plastic microfibers that wash directly into rivers, oceans, and marine food chains.',
          C: 'They cause rust to build up inside municipal water treatment infrastructure.',
        },
        correct: 'B',
        explanation:
          'Polyester and nylon are plastics. Laundering them releases microplastics into wastewater streams, bypassing municipal filtration systems.',
      },
      {
        id: 'q2',
        question: 'What is the ultimate environmental advantage of choosing 100% natural fibers like cotton, hemp, or linen?',
        options: {
          A: 'They are completely fireproof in everyday conditions.',
          B: 'They can be broken down completely in compost systems at end-of-life, leaving no toxic plastic residue.',
          C: 'They weigh significantly less than synthetic clothes.',
        },
        correct: 'B',
        explanation:
          'Pure un-blended natural fibers are organic matter. Once worn out, they can safely rot down into nutrient-rich soil, unlike oil-based plastics.',
      },
    ],
  },

  // ── Track 2 · Professional Operations Certification ──────────────

  academy_2_1_a: {
    quiz_id: 'academy_2_1_a',
    title: 'Reading the Circular Economy Dashboard',
    track: 'Professional Operations Certification',
    module: '2.1',
    questions: [
      {
        id: 'q1',
        question: 'A city reports a "diversion rate" of 45%. What does that number describe?',
        options: {
          A: 'The share of residents who own a recycling bin.',
          B: 'The share of total waste kept out of landfill and incineration through recycling, composting, and reuse.',
          C: 'The percentage of the waste budget spent on trucks.',
        },
        correct: 'B',
        explanation:
          'Diversion rate is the headline metric of a municipal waste program: total tons diverted ÷ total tons generated. The US national average sits around 32%; strong programs clear 50%.',
      },
      {
        id: 'q2',
        question: 'Which figure tells you the direct cost your city pays every time a ton of trash is buried?',
        options: {
          A: 'The tipping fee (gate fee) charged per ton at the landfill.',
          B: 'The property tax rate.',
          C: 'The diversion rate.',
        },
        correct: 'A',
        explanation:
          'The tipping fee is the per-ton charge to dump at the landfill or transfer station — often $50–$100+. Multiplying it by tons landfilled reveals the money a diversion program can save.',
      },
    ],
  },
};
