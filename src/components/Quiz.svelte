<script lang="ts">
  import { QUIZZES, type QuizQuestion } from '../data/quizzes';

  // Reimplements the Gemini vanilla-JS RecyclopediaQuiz engine as a Svelte island
  // matching Lookup.svelte. Fixes: the undefined-containerId ReferenceError, the
  // full-page location.reload() on retake, hardcoded #2e7d32/system-ui styling,
  // and decorative emoji. Styling inherits AP tokens from public/css/style.css.

  let { quizId }: { quizId: string } = $props();

  const quiz = QUIZZES[quizId];

  let index = $state(0);
  let score = $state(0);
  let selected = $state<string | null>(null);
  let done = $state(false);

  const current = $derived<QuizQuestion | undefined>(quiz?.questions[index]);
  const total = $derived(quiz?.questions.length ?? 0);
  const isCorrect = $derived(selected !== null && current?.correct === selected);

  function choose(key: string) {
    if (selected !== null) return; // freeze after first answer
    selected = key;
    if (current && key === current.correct) score += 1;
  }

  function next() {
    if (index + 1 < total) {
      index += 1;
      selected = null;
    } else {
      done = true;
    }
  }

  function retake() {
    index = 0;
    score = 0;
    selected = null;
    done = false;
  }

  function optionClass(key: string): string {
    if (selected === null) return 'quiz__option';
    if (key === current?.correct) return 'quiz__option quiz__option--correct';
    if (key === selected) return 'quiz__option quiz__option--wrong';
    return 'quiz__option quiz__option--muted';
  }
</script>

{#if !quiz}
  <p class="quiz__error">Quiz "{quizId}" not found.</p>
{:else if done}
  <div class="quiz quiz--results">
    <p class="quiz__title">Lesson check complete</p>
    <p class="quiz__score">{score} / {total}</p>
    <p class="quiz__result-note">
      {score === total
        ? 'Perfect — you are ready to champion clean material streams.'
        : 'Review the lesson above and retake to lock it in at 100%.'}
    </p>
    <button class="quiz__btn" type="button" onclick={retake}>Retake</button>
  </div>
{:else if current}
  <div class="quiz">
    <p class="quiz__title">{quiz.title}</p>
    <p class="quiz__progress">Question {index + 1} of {total}</p>
    <p class="quiz__question">{current.question}</p>

    <div class="quiz__options">
      {#each Object.entries(current.options) as [key, val] (key)}
        <button
          class={optionClass(key)}
          type="button"
          disabled={selected !== null}
          onclick={() => choose(key)}
        >
          <span class="quiz__key">{key}</span>{val}
        </button>
      {/each}
    </div>

    {#if selected !== null}
      <div class="quiz__feedback" class:quiz__feedback--ok={isCorrect}>
        <strong>{isCorrect ? '✓ Correct' : '✕ Not quite'}</strong>
        {#if !isCorrect}<span> — answer: {current.correct}</span>{/if}
        <p>{current.explanation}</p>
      </div>
      <button class="quiz__btn" type="button" onclick={next}>
        {index + 1 < total ? 'Next question' : 'See score'}
      </button>
    {/if}
  </div>
{/if}

<style>
  .quiz {
    border: 3px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface);
    padding: 1.25rem;
    margin: 1.5rem 0;
    box-shadow: var(--shadow);
  }
  .quiz__title {
    margin: 0 0 0.35rem;
    color: var(--accent);
    font-weight: bold;
    letter-spacing: 0.03em;
  }
  .quiz__progress {
    margin: 0 0 0.75rem;
    font-size: 0.8rem;
    color: var(--muted);
  }
  .quiz__question {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    color: var(--text);
  }
  .quiz__options {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .quiz__option {
    text-align: left;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface-alt);
    color: var(--text);
    font-family: var(--font);
    font-size: 0.98rem;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .quiz__option:hover:not(:disabled) {
    border-color: var(--accent);
  }
  .quiz__option:disabled {
    cursor: default;
  }
  .quiz__key {
    display: inline-block;
    min-width: 1.6em;
    color: var(--muted);
    font-weight: bold;
  }
  .quiz__option--correct {
    background: var(--status-yes-bg);
    border-color: var(--accent);
    color: var(--accent-deep);
  }
  .quiz__option--wrong {
    background: var(--status-no-bg);
    border-color: var(--status-no);
    color: var(--status-no);
  }
  .quiz__option--muted {
    opacity: 0.6;
  }
  .quiz__feedback {
    margin-top: 1rem;
    padding: 0.8rem 0.9rem;
    border-radius: var(--radius);
    background: var(--status-no-bg);
    color: var(--status-no);
    border: 1px solid var(--status-no);
  }
  .quiz__feedback--ok {
    background: var(--status-yes-bg);
    color: var(--accent-deep);
    border-color: var(--accent);
  }
  .quiz__feedback p {
    margin: 0.4rem 0 0;
    color: var(--text);
  }
  .quiz__btn {
    margin-top: 1rem;
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: var(--radius);
    background: var(--accent);
    color: #fff;
    font-family: var(--font);
    font-weight: bold;
    letter-spacing: 0.03em;
    cursor: pointer;
  }
  .quiz__btn:hover {
    background: var(--accent-hover);
  }
  .quiz--results {
    text-align: center;
  }
  .quiz__score {
    font-size: 2rem;
    color: var(--accent);
    margin: 0.25rem 0;
  }
  .quiz__result-note {
    color: var(--muted);
    margin: 0;
  }
  .quiz__error {
    color: var(--status-no);
  }
</style>
