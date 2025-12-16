import { reactive } from 'vue';

export const useRoles = () => {
  const mods = reactive<Set<string>>(new Set());
  const vips = reactive<Set<string>>(new Set());
  const state = reactive<{ lastChannel: string; lastLoadedAt: number; loading: boolean }>({
    lastChannel: '',
    lastLoadedAt: 0,
    loading: false,
  });

  const loadRoles = async (channel: string) => {
    const chan = channel.trim();
    if (!chan) return;

    // simple cache: skip if already loaded recently for the same channel
    const now = Date.now();
    if (
      state.loading ||
      (state.lastChannel === chan && now - state.lastLoadedAt < 5 * 60 * 1000)
    ) {
      return;
    }

    state.loading = true;
    mods.clear();
    vips.clear();
    try {
      const res: any = await $fetch(`/api/roles?channel=${encodeURIComponent(chan)}&type=mods`);
      (Array.isArray(res) ? res : []).forEach((m: any) => mods.add(m.id || m.login || m.name));
    } catch {
      /* ignore */
    }
    try {
      const res: any = await $fetch(`/api/roles?channel=${encodeURIComponent(chan)}&type=vips`);
      (Array.isArray(res) ? res : []).forEach((v: any) => vips.add(v.id || v.login || v.name));
    } catch {
      /* ignore */
    }

    state.lastChannel = chan;
    state.lastLoadedAt = now;
    state.loading = false;
  };

  const avatarClasses = (id: string) => ({
    'role-mod-border': mods.has(id),
    'role-vip-border': vips.has(id),
  });

  return {
    mods,
    vips,
    loadRoles,
    avatarClasses,
  };
};
