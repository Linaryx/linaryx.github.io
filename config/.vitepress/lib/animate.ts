import type { Ref } from 'vue';

export function animateCounter(ref: Ref<number>, target: number, duration = 2000): () => void {
  const start = 0;
  const step = Math.max(1, Math.floor(target / Math.max(1, duration / 16)));
  let current = start;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      ref.value = target;
      clearInterval(timer);
    } else {
      ref.value = current;
    }
  }, 16);
  return () => clearInterval(timer);
}
