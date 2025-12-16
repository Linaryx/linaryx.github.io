import { useRuntimeConfig } from '#app';
import { ofetch } from 'ofetch';
import type { Mode, Scope, TierResponse } from '~/types/tiers';
import { useSupabaseClient } from './supabase';

type TiersParams = {
  channel: string;
  scope: Scope;
  year: number;
  month?: number;
  day?: number;
  mode?: Mode;
  excludeBots?: string;
};

export const useApiBase = () => {
  const config = useRuntimeConfig();
  return config.public.apiBase || '';
};

export async function fetchTiers(params: TiersParams): Promise<TierResponse | null> {
  const base = useApiBase();
  const { channel, scope, year, month, day, mode = 'all', excludeBots } = params;
  if (!channel.trim()) return null;

  let path = '';
  if (scope === 'year') {
    path = `/channel/${encodeURIComponent(channel)}/tiers/${year}`;
  } else if (scope === 'month') {
    path = `/channel/${encodeURIComponent(channel)}/tiers/${year}/${month}`;
  } else {
    path = `/channel/${encodeURIComponent(channel)}/tiers/${year}/${month}/${day}`;
  }

  const query = new URLSearchParams();
  query.set('mode', mode);
  if (excludeBots?.trim()) query.set('exclude_bots', excludeBots.trim());

  const url = `${base}${path}?${query.toString()}`;
  return await ofetch<TierResponse>(url, { method: 'GET' });
}

export async function fetchTiersSupabase(params: TiersParams): Promise<TierResponse | null> {
  const { channel, scope, year, month, day, mode = 'all' } = params;
  if (!channel.trim()) return null;

  const sb = useSupabaseClient();
  const period_key =
    scope === 'day'
      ? `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`
      : scope === 'month'
      ? `${year}${String(month).padStart(2, '0')}`
      : `${year}`;

  const { data, error } = await sb
    .from('tiers_snapshots')
    .select('*')
    .eq('channel', channel)
    .eq('scope', scope)
    .eq('mode', mode)
    .eq('period_key', period_key)
    .limit(1)
    .single();

  if (error) throw error;

  return {
    year,
    month,
    day,
    timezone: 'Europe/Moscow',
    totalUsers: data.total_users,
    totalMessages: data.total_messages,
    totalUniqueMessages: data.total_unique_messages,
    entries: data.entries,
  };
}
