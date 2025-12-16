// @ts-nocheck
import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const channel = (query.channel as string | undefined)?.trim();
  const type = (query.type as string | undefined)?.trim()?.toLowerCase() || 'mods';

  if (!channel) {
    throw createError({ statusCode: 400, statusMessage: 'channel is required' });
  }
  if (type !== 'mods' && type !== 'vips') {
    throw createError({ statusCode: 400, statusMessage: 'type must be mods or vips' });
  }

  const url = `https://tools.2807.eu/api/get${type}/${encodeURIComponent(channel)}`;
  return await $fetch(url);
});
