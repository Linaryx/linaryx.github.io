<template>
  <div
    ref="statsContainer"
    class="stats-grid"
  >
    <div class="stat-card">
      <div class="stat-number">
        {{ followers.toLocaleString() }}
      </div>
      <div class="stat-label">
        Подписчики на Twitch
      </div>
      <div class="stat-subtitle">
        @zakvielchannel
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-number">
        {{ guidesCount }}
      </div>
      <div class="stat-label">
        Гайды
      </div>
      <div class="stat-subtitle">
        Полезные материалы
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-number">
        {{ sborkaCount }}
      </div>
      <div class="stat-label">
        Сборки
      </div>
      <div class="stat-subtitle">
        Страницы сборок
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';
import { fetchTwitchFollowers } from '../lib/twitch';
import { animateCounter } from '../lib/animate';

const followers = ref(0);
const guidesCount = ref(0);
const sborkaCount = ref(0);
const statsContainer = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);
const { site } = useData();

let observer: IntersectionObserver | null = null;
let stopFollowersAnim: (() => void) | null = null;
let stopGuidesAnim: (() => void) | null = null;
let stopSborkaAnim: (() => void) | null = null;

const startAnimation = async () => {
  if (hasAnimated.value) return;
  hasAnimated.value = true;
  const loaded = await fetchTwitchFollowers('zakvielchannel');
  const targetFollowers = loaded ?? 456335;
  stopFollowersAnim = animateCounter(followers, targetFollowers);
  // derive counts from theme sidebar (robust in dev/prod)
  const collectLinks = (sb: any): string[] => {
    const links: string[] = [];
    const visit = (arr: any[]) => {
      for (const it of arr || []) {
        if (it?.link) links.push(it.link);
        if (it?.items) visit(it.items);
      }
    };
    if (Array.isArray(sb)) visit(sb);
    else if (sb && typeof sb === 'object') {
      for (const k of Object.keys(sb)) visit(sb[k]);
    }
    return Array.from(new Set(links));
  };

  const links = collectLinks((site.value as any)?.themeConfig?.sidebar);
  const guidesLinks = links.filter(
    (l) => typeof l === 'string' && l.startsWith('/guides') && l !== '/guides' && l !== '/guides/'
  );
  let modpackLinks = links.filter(
    (l) =>
      typeof l === 'string' && l.startsWith('/modpacks') && l !== '/modpacks' && l !== '/modpacks/'
  );
  if (modpackLinks.length === 0) {
    // fallback to legacy single pack route
    modpackLinks = links.filter((l) => typeof l === 'string' && l.startsWith('/sborka'));
  }

  stopGuidesAnim = animateCounter(guidesCount, guidesLinks.length);
  stopSborkaAnim = animateCounter(sborkaCount, modpackLinks.length);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) startAnimation();
      }
    },
    { threshold: 0.3 }
  );
  if (statsContainer.value) observer.observe(statsContainer.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (stopFollowersAnim) stopFollowersAnim();
  if (stopGuidesAnim) stopGuidesAnim();
  if (stopSborkaAnim) stopSborkaAnim();
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 2rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand-soft);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  font-family: 'Bounded', 'Montserrat', sans-serif;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.stat-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .stat-card {
    padding: 1.5rem 1rem;
  }
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
