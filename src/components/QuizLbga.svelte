<script lang="ts">
  import { QUIZZES, type QuizQuestion } from '../data/quizzes';

  // LBGA warm-theme knowledge check — card-mode port of "Quiz.dc.html"
  // (Claude Design project "Interactive School Modules"). Same engine as
  // Quiz.svelte plus the streak counter, score ring, and perfect-run burst
  // from the design. Fills its container (the module page gives it 600px).

  let { quizId }: { quizId: string } = $props();

  const quiz = QUIZZES[quizId];
  const questions: QuizQuestion[] = quiz?.questions ?? [];
  const total = questions.length;

  let index = $state(0);
  let score = $state(0);
  let streak = $state(0);
  let best = $state(0);
  let selected = $state<string | null>(null);
  let done = $state(false);

  const current = $derived<QuizQuestion | undefined>(questions[index]);
  const answered = $derived(selected !== null);
  const isLast = $derived(index >= total - 1);
  const isCorrect = $derived(selected !== null && current?.correct === selected);
  const pct = $derived(total ? (index + (answered ? 1 : 0)) / total : 0);
  const perfect = $derived(total > 0 && score === total);

  // Score ring: r=52, stroke 12 in a 120×120 viewBox (matches the design)
  const RING_C = 2 * Math.PI * 52;

  function choose(key: string) {
    if (selected !== null || !current) return; // freeze after first answer
    selected = key;
    if (key === current.correct) {
      score += 1;
      streak += 1;
      best = Math.max(best, streak);
    } else {
      streak = 0;
    }
  }

  function next() {
    if (isLast) {
      done = true;
    } else {
      index += 1;
      selected = null;
    }
  }

  function retake() {
    index = 0;
    score = 0;
    streak = 0;
    best = 0;
    selected = null;
    done = false;
  }

  function optionState(key: string): string {
    if (selected === null) return 'idle';
    if (key === current?.correct) return 'correct';
    if (key === selected) return 'wrong';
    return 'muted';
  }
</script>

{#if !quiz}
  <p class="lq-error">Quiz "{quizId}" not found.</p>
{:else}
  <div class="lq">
    <div class="lq-head">
      <div class="lq-brand">
        <span class="lq-dot lq-dot--lettuce"></span>
        <span class="lq-dot lq-dot--beet"></span>
        <span class="lq-dot lq-dot--grapefruit"></span>
        <span class="lq-brand__label">LBGA · Academy</span>
      </div>
      <div class="lq-title">{quiz.title}</div>
      <div class="lq-track">{quiz.track ? `${quiz.track} · ` : ''}{quiz.module ?? ''}</div>
      <div class="lq-bar"><div class="lq-bar__fill" style:width={`${Math.round((done ? 1 : pct) * 100)}%`}></div></div>
      <div class="lq-meta">
        <span class="lq-qlabel">{done ? 'Complete' : `Question ${index + 1} of ${total}`}</span>
        {#if streak > 0 && !done}
          <span class="lq-streak">Streak ×{streak}</span>
        {/if}
      </div>
    </div>

    <div class="lq-body">
      {#if done}
        <div class="lq-results">
          <div class="lq-ring">
            {#if perfect}
              <div class="lq-burst" aria-hidden="true">
                {#each Array.from({ length: 6 }) as _, i}
                  <span
                    class="lq-burst__dot"
                    class:lq-burst__dot--alt={i % 2 === 1}
                    style:animation-delay={`${i * 0.05}s`}
                    style:--bx={`${Math.cos((i / 6) * Math.PI * 2) * 70}px`}
                    style:--by={`${Math.sin((i / 6) * Math.PI * 2) * 70}px`}
                  ></span>
                {/each}
              </div>
            {/if}
            <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E7E0CF" stroke-width="12" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={perfect ? '#E9663F' : '#57862F'}
                stroke-width="12" stroke-linecap="round"
                stroke-dasharray={RING_C}
                stroke-dashoffset={RING_C * (1 - (total ? score / total : 0))}
                transform="rotate(-90 60 60)"
                class="lq-ring__fg"
              />
            </svg>
            <div class="lq-ring__center">
              <div class="lq-ring__score">{score}/{total}</div>
              <div class="lq-ring__label">correct</div>
            </div>
          </div>
          <div class="lq-headline">{perfect ? 'Perfect run' : 'Lesson complete'}</div>
          <div class="lq-message">
            {perfect
              ? "You're ready to champion clean waste streams."
              : score / total >= 0.5
                ? 'Solid work — review the misses and retake to hit 100%.'
                : 'Give the lesson another read, then retake to lock it in.'}
          </div>
          {#if best > 1}
            <span class="lq-best">Best streak · {best}</span>
          {/if}
          <button type="button" class="lq-cta" onclick={retake}>Retake quiz</button>
        </div>
      {:else if current}
        <div class="lq-question">{current.question}</div>
        <div class="lq-options">
          {#each Object.entries(current.options) as [key, text] (key)}
            <button
              type="button"
              class={`lq-option lq-option--${optionState(key)}`}
              disabled={answered}
              onclick={() => choose(key)}
            >
              <span class="lq-option__key">{key}</span>
              <span class="lq-option__text">{text}</span>
              <span class="lq-option__mark">{optionState(key) === 'correct' ? '✓' : optionState(key) === 'wrong' ? '✕' : ''}</span>
            </button>
          {/each}
        </div>
        {#if answered}
          <div class="lq-feedback" class:lq-feedback--ok={isCorrect}>
            <strong>{isCorrect ? 'Correct' : 'Not quite'}.&nbsp;</strong>{current.explanation}
          </div>
          <button type="button" class="lq-cta" onclick={next}>{isLast ? 'See results' : 'Next question'}</button>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  /* LBGA quiz palette (Quiz.dc.html defaults):
     paper #F4EFE4 · ink #26241E · muted #77705F · line #E7E0CF
     lettuce #57862F · beet #9A2E5C · grapefruit #E9663F
     soft tints precomputed from the design's mix() at the default palette */
  .lq {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #F4EFE4;
    font-family: 'Hanken Grotesk', system-ui, sans-serif;
    color: #26241E;
    overflow: hidden;
    box-sizing: border-box;
  }

  .lq-head { padding: 18px 20px 12px; flex: 0 0 auto; background: #F4EFE4; }
  .lq-brand { display: flex; align-items: center; gap: 7px; margin-bottom: 12px; }
  .lq-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .lq-dot--lettuce { background: #57862F; }
  .lq-dot--beet { background: #9A2E5C; }
  .lq-dot--grapefruit { background: #E9663F; }
  .lq-brand__label { font-size: 10.5px; letter-spacing: .15em; text-transform: uppercase; color: #77705F; font-weight: 600; margin-left: 3px; }
  .lq-title { font-family: 'Newsreader', Georgia, serif; font-size: 17px; font-weight: 500; line-height: 1.25; }
  .lq-track { font-size: 11px; color: #77705F; margin-top: 3px; letter-spacing: .02em; }
  .lq-bar { height: 6px; border-radius: 999px; background: #E7E0CF; margin-top: 14px; overflow: hidden; }
  .lq-bar__fill { height: 100%; background: #57862F; border-radius: 999px; transition: width .45s cubic-bezier(.2,.8,.2,1); }
  .lq-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 9px; min-height: 22px; }
  .lq-qlabel { font-size: 11.5px; color: #77705F; font-weight: 500; }
  .lq-streak { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; background: #F2D4C3; color: #E9663F; font-size: 11.5px; font-weight: 700; }

  .lq-body { flex: 1; overflow-y: auto; padding: 6px 20px 24px; }
  .lq-question { font-family: 'Newsreader', Georgia, serif; font-size: 20px; line-height: 1.35; font-weight: 500; margin-bottom: 16px; text-wrap: pretty; }

  .lq-options { display: flex; flex-direction: column; gap: 10px; }
  .lq-option {
    display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
    padding: 13px 15px; border-radius: 14px; border: 1.5px solid #E7E0CF; background: #fff;
    cursor: pointer; font-family: 'Hanken Grotesk', system-ui, sans-serif;
    font-size: 14.5px; line-height: 1.35; color: #26241E;
    transition: border-color .18s ease, background .18s ease, opacity .18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .lq-option:disabled { cursor: default; }
  .lq-option--idle:hover { border-color: #26241E; }
  .lq-option--correct { border-color: #57862F; background: #D5DAC0; color: #2f4d1c; }
  .lq-option--wrong { border-color: #9A2E5C; background: #E6D0CE; color: #9A2E5C; }
  .lq-option--muted { opacity: .42; }
  .lq-option__key {
    flex: 0 0 auto; width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center;
    font-size: 12.5px; font-weight: 700; background: #F1ECDF; color: #77705F; transition: all .18s;
  }
  .lq-option--correct .lq-option__key { background: #57862F; color: #fff; }
  .lq-option--wrong .lq-option__key { background: #9A2E5C; color: #fff; }
  .lq-option--muted .lq-option__key { opacity: .5; }
  .lq-option__text { flex: 1; }
  .lq-option__mark { flex: 0 0 auto; font-size: 15px; font-weight: 700; color: #57862F; opacity: 0; transition: opacity .2s; }
  .lq-option--correct .lq-option__mark { opacity: 1; }
  .lq-option--wrong .lq-option__mark { color: #9A2E5C; opacity: 1; }

  .lq-feedback {
    margin-top: 14px; padding: 13px 15px; border-radius: 14px; font-size: 13px; line-height: 1.55;
    background: #E6D0CE; color: #9A2E5C; border-left: 3px solid #9A2E5C;
  }
  .lq-feedback--ok { background: #D5DAC0; color: #2f4d1c; border-left-color: #57862F; }

  .lq-cta {
    margin-top: 16px; width: 100%; padding: 13px; border-radius: 12px; border: none;
    background: #57862F; color: #fff; font-weight: 700; font-size: 14.5px;
    font-family: 'Hanken Grotesk', system-ui, sans-serif; cursor: pointer;
  }

  .lq-results { text-align: center; padding: 20px 8px 8px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .lq-ring { position: relative; width: 120px; height: 120px; margin-bottom: 6px; }
  .lq-ring svg { display: block; }
  .lq-ring__fg { transition: stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1); }
  .lq-ring__center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .lq-ring__score { font-family: 'Newsreader', serif; font-size: 30px; font-weight: 500; line-height: 1; }
  .lq-ring__label { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #77705F; margin-top: 3px; }
  .lq-headline { font-family: 'Newsreader', serif; font-size: 22px; font-weight: 500; }
  .lq-message { font-size: 13.5px; color: #77705F; max-width: 280px; line-height: 1.55; }
  .lq-best { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; background: #F2D4C3; color: #E9663F; font-size: 12px; font-weight: 700; margin-top: 2px; }
  .lq-results .lq-cta { max-width: 280px; }

  .lq-burst { position: absolute; inset: 0; pointer-events: none; }
  .lq-burst__dot {
    position: absolute; left: 50%; top: 50%; width: 8px; height: 8px; border-radius: 50%;
    background: #57862F; transform: translate(-50%, -50%);
    animation: lbgBurst 1.1s ease-out forwards;
  }
  .lq-burst__dot--alt { background: #E9663F; }
  @keyframes lbgBurst {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(.4); }
    22% { opacity: 1; }
    100% { opacity: 0; transform: translate(calc(-50% + var(--bx)), calc(-50% + var(--by))) scale(1); }
  }

  .lq-error { color: #9A2E5C; font-family: 'Hanken Grotesk', system-ui, sans-serif; padding: 16px; }
</style>
