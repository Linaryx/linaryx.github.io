export async function fetchTwitchFollowers(
  login: string,
  signal?: AbortSignal
): Promise<number | null> {
  try {
    const url = `https://api.ivr.fi/v2/twitch/user?login=${encodeURIComponent(login)}`;
    const res = await fetch(url, { signal, headers: { accept: 'application/json' } });
    const data = await res.json();
    if (Array.isArray(data)) {
      const user = data[0];
      return typeof user?.followers === 'number' ? user.followers : null;
    }
    return typeof data?.followers === 'number' ? data.followers : null;
  } catch {
    return null;
  }
}
