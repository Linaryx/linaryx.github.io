<template>
  <main class="home">
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-inner">
        <h1>
          RUINA
          <br />
          TEAM
        </h1>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-card">
        <div class="footer-inner">
          <h2>Кто мы</h2>
          <p class="footer-text">
            Команда людей, кому не всё равно. Делаем гайды, модпаки и инструменты для стримеров и их
            комьюнити.
          </p>

          <div class="footer-actions">
            <a class="action" href="mailto:contact@ruina.team">
              <i class="pi pi-envelope" aria-hidden="true"></i>
              <span>contact@ruina.team</span>
            </a>
            <a class="action" href="https://github.com/Linaryx/linaryx.github.io" target="_blank" rel="noopener noreferrer">
              <i class="pi pi-github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
// логики пока не нужно - и это хорошо
</script>

<style scoped>
/* ===== PAGE ===== */

.home {
  background: transparent;
}

/* ===== HERO ===== */

.hero {
  position: relative;
  width: 100%;
  min-height: 64vh;
  margin: 0;
  border-radius: 0;
  overflow: hidden;
  border: none;
  box-shadow: none;
  background: url("~/assets/img/bg.webp") center / cover no-repeat;
}

/* ===== TITLE ===== */

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(9, 9, 11, 0.15) 0%, rgba(9, 9, 11, 0.4) 100%),
    url("~/assets/img/ruines.webp") center bottom / min(1400px, 100%) no-repeat;
}

.hero-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-inner h1 {
  margin: 0;
  font-size: clamp(5rem, 20vw, 8rem);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 0 24px rgba(255, 255, 255, 0.4);
  transform: translateY(-150px);
}

/* ===== MOBILE ===== */

@media (max-width: 768px) {
  .hero {
    min-height: 60vh;
  }

  .hero-inner h1 {
    font-size: clamp(3.4rem, 8vw, 6.8rem);
  }
}

.footer {
  position: relative;
  z-index: 2;
  background: url("~/assets/img/bg.webp") center / cover no-repeat, #0b0b0e;
}

.footer-card {
  width: 100%;
  background: rgba(12, 12, 14, 0.92);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-inner {
  width: min(1080px, calc(100% - 32px));
  margin: 0 auto;
  padding: 44px 0 56px;
}

.footer-card h2 {
  margin: 0 0 10px;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.footer-text {
  margin: 0 0 12px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 78ch;
}

.footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.action {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  transition: background 0.12s ease, border-color 0.12s ease, transform 0.12s ease;
}

.action i {
  font-size: 16px;
  line-height: 1;
}

.action:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}
</style>
