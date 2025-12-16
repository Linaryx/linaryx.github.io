<template>
  <div class="controls">
    <label>
      <span>Channel</span>
      <input v-model="local.channel" type="text" />
    </label>

    <label>
      <span>Scope</span>
      <select v-model="local.scope">
        <option v-for="opt in scopeOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </label>

    <label v-if="local.scope !== 'day'">
      <span>Year</span>
      <select v-model.number="local.year">
        <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
      </select>
    </label>

    <label v-if="local.scope !== 'year' && local.scope !== 'day'">
      <span>Month</span>
      <select v-model.number="local.month">
        <option v-for="m in monthOptions" :key="m.value" :value="m.value">
          {{ m.label }}
        </option>
      </select>
    </label>

    <label v-if="local.scope === 'day'">
      <span>Дата</span>
      <input
        type="date"
        :value="dateValue"
        :min="minDate"
        :max="maxDate"
        @input="onDateChange"
      />
    </label>

    <label>
      <span>Mode</span>
      <select v-model="local.mode">
        <option v-for="opt in modeOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </label>

  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Mode, Scope } from '~/types/tiers';

const props = defineProps<{
  channel: string;
  scope: Scope;
  year: number;
  month: number;
  day: number;
  mode: Mode;
}>();

const emit = defineEmits<{
  (e: 'update:channel', v: string): void;
  (e: 'update:scope', v: Scope): void;
  (e: 'update:year', v: number): void;
  (e: 'update:month', v: number): void;
  (e: 'update:day', v: number): void;
  (e: 'update:mode', v: Mode): void;
  (e: 'reload'): void;
}>();

const modeOptions: { label: string; value: Mode }[] = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
];
const scopeOptions: { label: string; value: Scope }[] = [
  { label: 'Year', value: 'year' },
  { label: 'Month', value: 'month' },
  { label: 'Day', value: 'day' },
];

const local = reactive({
  channel: props.channel,
  scope: props.scope,
  year: props.year,
  month: props.month,
  day: props.day,
  mode: props.mode,
});

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 2021 }, (_, i) => currentYear - i);
const monthOptions = [
  { value: 1, label: '01 · Январь' },
  { value: 2, label: '02 · Февраль' },
  { value: 3, label: '03 · Март' },
  { value: 4, label: '04 · Апрель' },
  { value: 5, label: '05 · Май' },
  { value: 6, label: '06 · Июнь' },
  { value: 7, label: '07 · Июль' },
  { value: 8, label: '08 · Август' },
  { value: 9, label: '09 · Сентябрь' },
  { value: 10, label: '10 · Октябрь' },
  { value: 11, label: '11 · Ноябрь' },
  { value: 12, label: '12 · Декабрь' },
];
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

const minDate = '2022-01-01';
const pad = (n: number) => n.toString().padStart(2, '0');
const dateValue = computed(() => {
  return `${local.year}-${pad(local.month)}-${pad(local.day)}`;
});
const maxDate = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
});

const onDateChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  if (!val || val.length < 10) return;
  const [y, m, d] = val.split('-').map((v) => parseInt(v, 10));
  if (Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)) {
    local.year = y;
    local.month = m;
    local.day = d;
  }
};

watch(
  () => ({ ...local }),
  (v) => {
    emit('update:channel', v.channel);
    emit('update:scope', v.scope);
    emit('update:year', v.year);
    emit('update:month', v.month);
    emit('update:day', v.day);
    emit('update:mode', v.mode);
  },
  { deep: true }
);

</script>

<style scoped>
.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin: 20px 0;
}
.controls label {
  display: grid;
  gap: 6px;
  font-size: 13px;
}
.controls input,
.controls select {
  background: #0b0b0b;
  border: 1px solid #2d2d2d;
  color: #fff;
  border-radius: 10px;
  padding: 10px 12px;
  appearance: none;
}
.controls select {
  cursor: pointer;
}
.controls .btn {
  align-self: end;
  height: 42px;
}
</style>
