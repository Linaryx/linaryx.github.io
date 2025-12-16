<template>
  <div class="summary">
    <div>
      <p class="label">Период</p>
      <p class="value">
        {{ period }}
        <span class="muted"> ({{ timezone }})</span>
      </p>
    </div>
    <div>
      <p class="label">Чаттеров</p>
      <p class="value">{{ users.toLocaleString() }}</p>
    </div>
    <div>
      <p class="label">Сообщений</p>
      <p class="value">{{ messages.toLocaleString() }}</p>
    </div>
    <div>
      <p class="label">Уникальных</p>
      <p class="value">{{ unique.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  period: string;
  timezone: string;
  users: number;
  messages: number;
  unique: number;
}>();
</script>

<style scoped>
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.label {
  margin: 0;
  font-size: 12px;
}
.value {
  margin: 2px 0 0;
  font-weight: 700;
  color: var(--color-text-1);
}
.muted {
  color: #9ca3af;
}
</style>
