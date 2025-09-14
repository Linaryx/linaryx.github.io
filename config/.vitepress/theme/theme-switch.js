export function initThemeWave() {
  if (typeof window === 'undefined') return;
  window.addEventListener('load', setupThemeWave);
}

function setupThemeWave() {
  let themeToggle = document.querySelector('.VPSwitchAppearance');
  if (!themeToggle)
    themeToggle = document.querySelector('.VPNavBar .VPNavBarMenu .VPNavBarMenuLink');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeToggle.classList.add('theme-toggle-click');
    requestAnimationFrame(() => createThemeWave(e, themeToggle));
    setTimeout(() => themeToggle.classList.remove('theme-toggle-click'), 600);
  });
}

function createThemeWave(event, button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const isDark = document.documentElement.classList.contains('dark');
  const newThemeColor = isDark ? '#1a1a1a' : '#ffffff';
  const wave = document.createElement('div');
  wave.className = 'theme-wave';
  wave.style.position = 'fixed';
  wave.style.left = `${centerX}px`;
  wave.style.top = `${centerY}px`;
  wave.style.transform = 'translate(-50%, -50%) scale(0)';
  wave.style.background = `radial-gradient(circle, ${newThemeColor} 0%, ${newThemeColor} 70%, transparent 100%)`;
  wave.style.pointerEvents = 'none';
  wave.style.zIndex = '9999';
  wave.style.borderRadius = '50%';
  wave.style.width = '100vw';
  wave.style.height = '100vh';
  document.body.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove());
}

export default initThemeWave;
