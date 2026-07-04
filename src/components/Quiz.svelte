<script lang="ts">
  import { tick } from 'svelte';
  import { QUIZZES, type QuizQuestion } from '../data/quizzes';

  let { quizId }: { quizId: string } = $props();

  const quiz = QUIZZES[quizId];
  const circumference = 2 * Math.PI * 52;

  let root: HTMLDivElement;
  let index = $state(0);
  let score = $state(0);
  let streak = $state(0);
  let bestStreak = $state(0);
  let selected = $state<string | null>(null);
  let done = $state(false);

  const current = $derived<QuizQuestion | undefined>(quiz?.questions[index]);
  const total = $derived(quiz?.questions.length ?? 0);
  const isCorrect = $derived(selected !== null && current?.correct === selected);
  const progress = $derived(total ? ((index + (selected !== null ? 1 : 0)) / total) * 100 : 0);
  const scorePercent = $derived(total ? score / total : 0);
  const ringOffset = $derived(circumference * (1 - scorePercent));

  function choose(key: string) {
    if (selected !== null || !current) return;
    selected = key;

    if (key === current.correct) {
      score += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
    } else {
      streak = 0;
    }
  }

  async function next() {
    if (index + 1 < total) {
      index += 1;
      selected = null;
    } else {
      done = true;
    }

    await tick();
    root?.focus();
  }

  async function retake() {
    index = 0;
    score = 0;
    streak = 0;
    bestStreak = 0;
    selected = null;
    done = false;

    await tick();
    root?.focus();
  }

  function optionClass(key: string): string {
    if (selected === null) return 'quiz__option';
    if (key === current?.correct) return 'quiz__option quiz__option--correct';
    if (key === selected) return 'quiz__option quiz__option--wrong';
    return 'quiz__option quiz__option--muted';
  }

  function optionMark(key: string): string {
    if (selected === null) return '';
    if (key === current?.correct) return '✓';
    if (key === selected) return '×';
    return '';
  }
</script>

{#if !quiz}
  <p class="quiz__error">Taste Test "{quizId}" not found.</p>
{:else}
  <div class="quiz" class:quiz--results={done} bind:this={root} tabindex="-1">
    <header class="quiz__header">
      <div class="quiz__brand">
        <span class="quiz__dot quiz__dot--lettuce"></span>
        <span class="quiz__dot quiz__dot--beet"></span>
        <span class="quiz__dot quiz__dot--grapefruit"></span>
        <span>LBGA · Taste Test</span>
      </div>
      <p class="quiz__title">{quiz.title}</p>
      <div
        class="quiz__progress-track"
        role="progressbar"
        aria-label="Taste Test progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(done ? 100 : progress)}
      >
        <span style={`width: ${done ? 100 : progress}%`}></span>
      </div>
      <div class="quiz__meta">
        <span>{done ? 'Complete' : `Question ${index + 1} of ${total}`}</span>
        {#if streak > 0 && !done}
          <span class="quiz__streak">Streak ×{streak}</span>
        {/if}
      </div>
    </header>

    {#if done}
      <div class="quiz__results" aria-live="polite">
        <div class="quiz__ring">
          <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="12"></circle>
            <circle
              class="quiz__ring-value"
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={score === total ? 'var(--grapefruit)' : 'var(--accent)'}
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray={circumference}
              stroke-dashoffset={ringOffset}
              transform="rotate(-90 60 60)"
            ></circle>
          </svg>
          <div class="quiz__ring-copy">
            <strong>{score}/{total}</strong>
            <span>correct</span>
          </div>
        </div>
        <p class="quiz__result-title">
          {score === total ? 'Perfect run' : 'Lesson complete'}
        </p>
        <p class="quiz__result-note">
          {score === total
            ? 'You are ready to champion clean material streams.'
            : scorePercent >= 0.5
              ? 'Solid work — review the misses and retake to hit 100%.'
              : 'Give the lesson another read, then retake to lock it in.'}
        </p>
        {#if bestStreak > 1}
          <span class="quiz__best">Best streak · {bestStreak}</span>
        {/if}
        <button class="quiz__btn" type="button" onclick={retake}>Retake Taste Test</button>
      </div>
    {:else if current}
      <div class="quiz__body">
        <p class="quiz__question">{current.question}</p>

        <div class="quiz__options">
          {#each Object.entries(current.options) as [key, val] (key)}
            <button
              class={optionClass(key)}
              type="button"
              disabled={selected !== null}
              onclick={() => choose(key)}
            >
              <span class="quiz__key">{key}</span>
              <span class="quiz__option-text">{val}</span>
              <span class="quiz__mark" aria-hidden="true">{optionMark(key)}</span>
            </button>
          {/each}
        </div>

        {#if selected !== null}
          <div
            class="quiz__feedback"
            class:quiz__feedback--ok={isCorrect}
            aria-live="polite"
          >
            <strong>{isCorrect ? 'Correct.' : 'Not quite.'}</strong>
            <span>{current.explanation}</span>
          </div>
          <button class="quiz__btn" type="button" onclick={next}>
            {index + 1 < total ? 'Next question' : 'See results'}
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  .quiz {
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--surface-alt);
    margin: 1.5rem 0;
    box-shadow: var(--shadow);
    outline: none;
  }

  .quiz:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .quiz__header {
    padding: 1.2rem 1.25rem 0.9rem;
  }

  .quiz__brand {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
    color: var(--muted);
    font-family: var(--font);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .quiz__brand span:last-child {
    margin-left: 0.2rem;
  }

  .quiz__dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
  }

  .quiz__dot--lettuce { background: var(--accent); }
  .quiz__dot--beet { background: var(--beet); }
  .quiz__dot--grapefruit { background: var(--grapefruit); }

  .quiz__title {
    margin: 0;
    color: var(--text);
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 500;
    line-height: 1.25;
  }

  .quiz__progress-track {
    height: 0.4rem;
    overflow: hidden;
    margin-top: 0.9rem;
    border-radius: 999px;
    background: var(--surface-soft);
  }

  .quiz__progress-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent);
    transition: width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .quiz__meta {
    min-height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.55rem;
    color: var(--muted);
    font-family: var(--font);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .quiz__streak,
  .quiz__best {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background: var(--status-hazard-bg);
    color: var(--grapefruit);
    font-weight: 700;
  }

  .quiz__body {
    padding: 0.35rem 1.25rem 1.25rem;
  }

  .quiz__question {
    margin: 0 0 1rem;
    color: var(--text);
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 3vw, 1.45rem);
    font-weight: 500;
    line-height: 1.35;
    text-wrap: pretty;
  }

  .quiz__options {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .quiz__option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 0.95rem;
    border: 1.5px solid var(--line);
    border-radius: 14px;
    background: var(--surface);
    color: var(--text);
    font-family: var(--font);
    font-size: 0.96rem;
    line-height: 1.4;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s, opacity 0.18s;
  }

  .quiz__option:hover:not(:disabled),
  .quiz__option:focus-visible:not(:disabled) {
    border-color: var(--border);
  }

  .quiz__option:focus-visible,
  .quiz__btn:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--accent) 35%, transparent);
    outline-offset: 2px;
  }

  .quiz__option:disabled {
    cursor: default;
  }

  .quiz__key {
    flex: 0 0 auto;
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: var(--surface-soft);
    color: var(--muted);
    font-size: 0.8rem;
    font-weight: 700;
  }

  .quiz__option-text {
    flex: 1;
  }

  .quiz__mark {
    flex: 0 0 auto;
    font-size: 1rem;
    font-weight: 700;
  }

  .quiz__option--correct {
    background: var(--status-yes-bg);
    border-color: var(--accent);
    color: var(--accent-deep);
  }

  .quiz__option--correct .quiz__key {
    background: var(--accent);
    color: #fff;
  }

  .quiz__option--wrong {
    background: var(--status-no-bg);
    border-color: var(--beet);
    color: var(--beet);
  }

  .quiz__option--wrong .quiz__key {
    background: var(--beet);
    color: #fff;
  }

  .quiz__option--muted {
    opacity: 0.45;
  }

  .quiz__feedback {
    display: grid;
    gap: 0.25rem;
    margin-top: 0.9rem;
    padding: 0.85rem 0.95rem;
    border-left: 3px solid var(--beet);
    border-radius: 14px;
    background: var(--status-no-bg);
    color: var(--status-no);
    font-family: var(--font);
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .quiz__feedback--ok {
    border-color: var(--accent);
    background: var(--status-yes-bg);
    color: var(--accent-deep);
  }

  .quiz__feedback span {
    color: var(--text);
  }

  .quiz__btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.85rem;
    border: none;
    border-radius: 12px;
    background: var(--accent);
    color: #fff;
    font-family: var(--font);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
  }

  .quiz__btn:hover {
    background: var(--accent-hover);
  }

  .quiz__results {
    min-height: 25rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    text-align: center;
  }

  .quiz__ring {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .quiz__ring-value {
    transition: stroke-dashoffset 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .quiz__ring-copy {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .quiz__ring-copy strong {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 500;
    line-height: 1;
  }

  .quiz__ring-copy span {
    margin-top: 0.2rem;
    color: var(--muted);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .quiz__result-title {
    margin: 0.25rem 0 0;
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 500;
  }

  .quiz__result-note {
    max-width: 31rem;
    margin: 0;
    color: var(--muted);
  }

  .quiz__error {
    color: var(--status-no);
  }

  @media (prefers-reduced-motion: reduce) {
    .quiz__progress-track span,
    .quiz__ring-value {
      transition: none;
    }
  }
</style>
