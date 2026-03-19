(function() {
  // Header configuration
  const headerConfig = {
    logo: 'Logo Empresa', // Mudar para imagem
    title: 'Nome Empresa',
    contacts: {
      instagram: 'https://instagram.com/yourprofile',
      email: 'mailto:hello@example.com'
    },
    navigation: [
      { name: 'Home', url: 'home.html', id: 'home' },
      { name: 'Websites', url: 'web.html', id: 'web' },
      { name: 'Automação', url: 'automacao.html', id: 'automacao' },
      { name: 'Preços', url: 'precos.html', id: 'precos' },
      { name: 'Sobre', url: 'sobre.html', id: 'sobre' }
    ]
  };

  // Footer configuration
  const footerConfig = {
    copyright: `© ${new Date().getFullYear()} Nome Empresa. Todos os direitos reservados.`,
    contacts: {
      instagram: 'https://instagram.com/yourprofile',
      email: 'mailto:hello@example.com'
    },
    navigation: [
      { name: 'Home', url: 'home.html' },
      { name: 'Websites', url: 'web.html' },
      { name: 'Automação', url: 'automacao.html' },
      { name: 'Preços', url: 'precos.html' },
      { name: 'Sobre', url: 'sobre.html' }
    ]
  };

  // Function to get current page ID from URL
  function getCurrentPageId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'home.html';
    const pageMap = {
      'home.html': 'home',
      'web.html': 'web',
      'automacao.html': 'automacao',
      'precos.html': 'precos',
      'sobre.html': 'sobre'
    };
    return pageMap[filename] || 'home';
  }

  // Function to create header HTML
  function createHeader() {
    const currentPage = getCurrentPageId();
    
    return `
      <header class="site-header">
        <div class="site-header__inner">
          <div class="site-header__row site-header__row--top">
            <div class="site-header__logo">${headerConfig.logo}</div>
            <h1 class="site-header__title">${headerConfig.title}</h1>
            <div class="site-header__contacts" aria-label="Contact links">
              <span class="site-header__contacts-label">Formas de Contato:</span>
              <a class="site-header__icon-link" href="${headerConfig.contacts.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a class="site-header__icon-link" href="${headerConfig.contacts.email}" aria-label="Email">
                <ion-icon name="mail-sharp"></ion-icon>
              </a>
            </div>
          </div>
          <nav class="site-header__row site-header__row--bottom site-header__nav" aria-label="Main navigation">
            ${headerConfig.navigation.map(item => 
              `<a href="${item.url}"${item.id === currentPage ? ' class="is-active"' : ''}>${item.name}</a>`
            ).join('')}
          </nav>
        </div>
      </header>
    `;
  }

  // Function to create footer HTML
  function createFooter() {
    return `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div class="site-footer__row">
            <div class="site-footer__copyright">
              ${footerConfig.copyright}
            </div>
            <div class="site-footer__contacts" aria-label="Contact links">
              <span class="site-footer__contacts-label">Siga-nos:</span>
              <a class="site-footer__icon-link" href="${footerConfig.contacts.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
              <a class="site-footer__icon-link" href="${footerConfig.contacts.email}" aria-label="Email">
                <ion-icon name="mail-sharp"></ion-icon>
              </a>
            </div>
          </div>
          <nav class="site-footer__nav" aria-label="Footer navigation">
            ${footerConfig.navigation.map(item => 
              `<a href="${item.url}">${item.name}</a>`
            ).join(' · ')}
          </nav>
        </div>
      </footer>
    `;
  }

  // Initialize components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    // Remove existing header if any
    const existingHeader = document.querySelector('.site-header');
    if (existingHeader) {
      existingHeader.remove();
    }

    // Insert new header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', createHeader());

    // Check if footer exists, if not add it
    if (!document.querySelector('.site-footer')) {
      document.body.insertAdjacentHTML('beforeend', createFooter());
    }

    // Re-run carousel initialization if it exists
    if (typeof initializeCarousels === 'function') {
      initializeCarousels();
    } else {
      // Copy carousel logic here if needed
      const carousels = document.querySelectorAll(".carousel");
      if (carousels.length > 0) {
        const visibleCount = 3;
        const transitionMs = 600;

        carousels.forEach(function (carousel) {
          const track = carousel.querySelector(".carousel-track");
          if (!track) return;

          const items = Array.from(track.children);
          const originalCount = items.length;
          if (originalCount < visibleCount) return;

          for (var i = 0; i < originalCount; i++) {
            track.appendChild(items[i].cloneNode(true));
          }

          let index = 0;
          let resetTimeout = null;

          function update(noTransition) {
            if (noTransition) track.style.transition = "none";
            var offset = (100 / visibleCount) * index;
            track.style.transform = "translateX(-" + offset + "%)";
            if (noTransition) {
              track.offsetHeight;
              track.style.transition = "";
            }
          }

          carousel.addEventListener("mouseenter", function () {
            carousel.classList.add("carousel--paused");
          });
          carousel.addEventListener("mouseleave", function () {
            carousel.classList.remove("carousel--paused");
          });

          setInterval(function () {
            if (carousel.classList.contains("carousel--paused")) return;
            if (resetTimeout) return;

            index++;
            if (index >= originalCount) {
              update(false);
              resetTimeout = setTimeout(function () {
                index = 0;
                update(true);
                resetTimeout = null;
              }, transitionMs + 50);
            } else {
              update(false);
            }
          }, 5000);

          update(false);
        });
      }
    }
  });
})();