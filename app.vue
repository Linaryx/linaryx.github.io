<script setup lang="ts">
const route = useRoute();
const isHome = computed(() => route.path === '/');

const navRef = ref<{ el: HTMLElement | null } | null>(null);
const navHeight = ref(0);
let observer: ResizeObserver | null = null;

const updateNavHeight = () => {
  const el = navRef.value?.el;
  if (!el) return;
  navHeight.value = el.getBoundingClientRect().height;
};

onMounted(() => {
  const el = navRef.value?.el;
  if (!el) return;
  updateNavHeight();
  observer = new ResizeObserver(updateNavHeight);
  observer.observe(el);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="page" :class="{ 'is-home': isHome }" :style="{ '--nav-height': `${navHeight}px` }">
    <NavBar ref="navRef" :hero="isHome" />
    <div :class="['shell', { 'shell--full': isHome }]">
      <NuxtPage />
    </div>
  </div>
</template>
