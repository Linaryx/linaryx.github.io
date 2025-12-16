<script setup lang="ts">
const props = defineProps<{ hero?: boolean }>();
const navEl = ref<HTMLElement | null>(null);
defineExpose({ el: navEl });
</script>

<template>
  <header ref="navEl" :class="['nav', { 'nav--hero': props.hero }]">
    <NuxtLink class="nav-brand" to="/">
      <span class="nav-logo">Ruina.team</span>
    </NuxtLink>
    <nav class="nav-links">
      <NuxtLink to="/guides">Guides</NuxtLink>
      <NuxtLink to="/modpacks">Modpacks</NuxtLink>
      <NuxtLink to="/chat-tiers">Chat Tiers</NuxtLink>
    </nav>
  </header>
</template>
