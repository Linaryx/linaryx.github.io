<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="card">
      <header class="head">
        <div class="user">
          <img v-if="userData.logo" :src="userData.logo" alt="" />
          <div>
            <p class="title">{{ displayName }}</p>
            <p class="muted mono">ID: {{ userData.id }}</p>
          </div>
        </div>
        <button class="btn primary" @click="$emit('close')">Закрыть</button>
      </header>

      <div class="metrics" v-if="metricItems.length">
        <div v-for="item in metricItems" :key="item.label" class="metric">
          <p class="label">{{ item.label }}</p>
          <p class="value">{{ item.value }}</p>
        </div>
      </div>

      <div class="metric" v-if="selectedEntry">
        <p class="label">Сообщения / Уникальные</p>
        <p class="value">{{ selectedEntry.messages }} / {{ selectedEntry.uniqueMessages }}</p>
      </div>

      <div class="tiers" v-if="selectedEntry">
        <TierChip label="1м" :tier="selectedEntry.tier1m" :hours="formatHours(selectedEntry.windows1m, 1)" :colors="tierColors" />
        <TierChip label="5м" :tier="selectedEntry.tier5m" :hours="formatHours(selectedEntry.windows5m, 5)" :colors="tierColors" />
        <TierChip label="15м" :tier="selectedEntry.tier15m" :hours="formatHours(selectedEntry.windows15m, 15)" :colors="tierColors" />
        <TierChip label="30м" :tier="selectedEntry.tier30m" :hours="formatHours(selectedEntry.windows30m, 30)" :colors="tierColors" />
        <TierChip label="60м" :tier="selectedEntry.tier60m" :hours="formatHours(selectedEntry.windows60m, 60)" :colors="tierColors" />
        <div class="metric score">
          <p class="label">Место в топе</p>
          <p class="value">
            {{ selectedRank != null ? `#${selectedRank + 1}` : (selectedEntry?.rank != null ? `#${selectedEntry.rank + 1}` : '—') }}
          </p>
        </div>
      </div>

      <div class="metric" v-else>
        <p class="label">В этом срезе</p>
        <p class="value">Нет в текущем списке тиров</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TierChip from './TierChip.vue';
import type { TierEntry } from '~/types/tiers';

type User = {
  id: string;
  login: string;
  displayName: string;
  logo?: string;
  followers?: number | null;
  createdAt?: string;
  roles?: { isAffiliate?: boolean; isPartner?: boolean | null };
};

const props = defineProps<{
  userData: User;
  displayName: string;
  createdText: string;
  followText: string;
  subText: string;
  roleText: string;
  selectedEntry: TierEntry | null;
  selectedRank: number | null;
  tierColors: Record<string, string>;
}>();

defineEmits<{ (e: 'close'): void }>();

const metricItems = [
  { label: 'Подписчики', value: props.userData.followers ?? '—' },
  { label: 'Создан', value: props.createdText },
  { label: 'Фоллов на канал', value: props.followText },
  { label: 'Подписка', value: props.subText },
  ...(props.roleText ? [{ label: 'Роль', value: props.roleText }] : []),
];

const formatHours = (count: number, minutes: number) => {
  const hours = (count * minutes) / 60;
  return `${hours.toFixed(1)}h`;
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 30;
}
.card {
  background: #var(--color-surface);
  border: 1px solid #1f1f1f;
  border-radius: 14px;
  padding: 10px;
  width: 100%;
  max-width: clamp(320px, 80vw, 440px);
  color: #fff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* disable hover lift specifically for this modal card */
  transition: none !important;
}
.card:hover {
  transform: none !important;
  /* preserve the original shadow on hover but prevent any lift */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35) !important;
  border-color: #1f1f1f !important;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.user {
  display: flex;
  gap: 10px;
  align-items: center;
}
.user img {
  width: clamp(40px, 10vw, 48px);
  height: clamp(40px, 10vw, 48px);
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #2d2d2d;
}
.title {
  margin: 0;
}
.muted {
  color: #9ca3af;
}
.mono {
  font-family: var(--font-base);
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px 12px;
}
.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--color-bg);
  border: 1px solid #2d2d2d;
  border-radius: 10px;
  padding: 10px;
}
.label {
  margin: 0;
  font-size: 12px;
  color: #cbd5e1;
}
.value {
  margin: 0;
  font-weight: 700;
  color: var(--color-text-1);
}
.tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  align-items: stretch;
}
.metric.score {
  justify-content: center;
  min-height: 58px;
  width: 100%;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.15s ease;
  border: 1px solid #2d2d2d;
  background: #0a0a0a;
  color: #fff;
  box-shadow: none;
}
.btn.primary:hover {
  border-color: #444;
  background: #var(--color-surface);
  transform: none;
}
.btn.primary:active {
  transform: none;
  border-color: #666;
  background: #var(--color-surface);
} 
</style>
