<template>
  <footer class="footer">
    <div class="footer-container">
      <p class="footer-text"> ShopVue: Built with Vue.js 3 & Fake Store API</p>
      <div class="footer-links">
        <a href="https://fakestoreapi.com/" target="_blank" rel="noopener" class="footer-link">API</a>
        <span class="separator">•</span>
        <a href="https://vuejs.org/" target="_blank" rel="noopener" class="footer-link">Vue.js</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.footer-text {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  opacity: 0.9;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 0.7;
}

.separator {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1rem;
  }

  .footer-text {
    font-size: 0.9rem;
  }
}
</style>
