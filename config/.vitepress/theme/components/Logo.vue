<template>
  <div
    class="custom-logo"
    aria-label="Wikyx — на главную"
  >
    <span
      class="logo-icon-wrap"
      aria-hidden="true"
    >
      <img
        src="/favicon.ico"
        alt=""
        class="logo-icon"
      >
    </span>
    <span class="logo-text">Wikyx</span>
  </div>
</template>

<script setup></script>

<style scoped>
.custom-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: transform 200ms ease;
}

.custom-logo:hover {
  transform: translateY(-1px) scale(1.02);
}

.logo-icon-wrap {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  flex: 0 0 auto;
}

.logo-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  transition:
    transform 220ms ease,
    filter 220ms ease;
}

.custom-logo:hover .logo-icon {
  transform: rotate(6deg) scale(1.06);
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
}

.logo-text {
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #8b5cf6 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: logo-gradient-shift 6s linear infinite;
}

.logo-icon-wrap::after {
  content: '';
  position: absolute;
  top: -30%;
  left: -80%;
  width: 40%;
  height: 160%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-20deg);
  pointer-events: none;
}

.custom-logo:hover .logo-icon-wrap::after {
  animation: logo-glint 800ms ease-out forwards;
}

@keyframes logo-gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes logo-glint {
  0% {
    left: -80%;
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  100% {
    left: 140%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-text {
    animation: none;
  }
  .custom-logo:hover {
    transform: none;
  }
  .custom-logo:hover .logo-icon {
    transform: none;
  }
  .custom-logo:hover .logo-icon-wrap::after {
    animation: none;
  }
}

@media (max-width: 640px) {
  .logo-text {
    display: none;
  }
  .custom-logo {
    gap: 0;
  }
  .logo-icon-wrap {
    width: 28px;
    height: 28px;
  }
  .logo-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
