// Ribeiro & Spricigo — interações da página

// Header muda de estilo ao rolar
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// Newsletter: renderiza os artigos definidos em conteudo.js
const newsGrid = document.getElementById('newsGrid');
if (newsGrid && typeof ARTIGOS !== 'undefined') {
  newsGrid.innerHTML = ARTIGOS.map(
    (a) => `
    <article class="n-card reveal">
      <div class="n-card__meta">
        <span class="n-card__tag">${a.categoria}</span>
        <time>${a.data}</time>
      </div>
      <h3>${a.titulo}</h3>
      <p>${a.resumo}</p>
      <span class="n-card__author">Por ${a.autora}</span>
    </article>`
  ).join('');
}

// Depoimentos: renderiza as avaliações definidas em conteudo.js
const reviewsGrid = document.getElementById('reviewsGrid');
if (reviewsGrid && typeof DEPOIMENTOS !== 'undefined') {
  if (DEPOIMENTOS.length === 0) {
    document.getElementById('reviewsEmpty').hidden = false;
  } else {
    reviewsGrid.innerHTML = DEPOIMENTOS.map(
      (d) => `
      <blockquote class="r-card reveal">
        <span class="r-card__stars" aria-label="${d.estrelas} de 5 estrelas">${'★'.repeat(d.estrelas)}${'☆'.repeat(5 - d.estrelas)}</span>
        <p>“${d.texto}”</p>
        <footer>${d.nome} · avaliação no Google</footer>
      </blockquote>`
    ).join('');
  }
}

// Revelação suave dos blocos ao entrar na tela
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Ano corrente no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
