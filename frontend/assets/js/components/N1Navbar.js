import { i18nService } from '../services/I18nService.js';
import { cartService } from '../services/CartService.js';
import './N1CartDrawer.js';

export class N1Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.injectCartDrawer();
    this.initEventListeners();
    this.initCartListener();
    i18nService.translatePage();
  }

  injectCartDrawer() {
    if (!document.querySelector('n1-cart-drawer')) {
      const drawer = document.createElement('n1-cart-drawer');
      document.body.appendChild(drawer);
    }
  }

  initCartListener() {
    const updateCount = () => {
      const count = cartService.getCount();
      const badges = this.querySelectorAll('.cart-count');
      badges.forEach(badge => {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
      });
    };
    
    updateCount();
    window.addEventListener('n1-cart-updated', updateCount);
  }

  render() {
    this.innerHTML = `
      <div id="overlay"></div>
      <div id="mobile-menu" class="mobile-main-menu">
        <ul>
          <li><a href="index.html" data-i18n="nav_home">Inicio</a></li>
          <li><a href="tienda.html" data-i18n="nav_shop">Tienda</a></li>
          <li><a href="camisas.html" data-i18n="nav_shirts">Camisas</a></li>
          <li><a href="remeras.html" data-i18n="nav_tshirts">Remeras</a></li>
          <li><a href="accesorios.html" data-i18n="nav_accessories">Accesorios</a></li>
          
          <li style="border:none; margin-top: 20px; display: flex; gap: 20px; justify-content: flex-end;">
             <button id="lang-toggle-mobile" class="nav-icon-btn">ES/EN</button>
          </li>

          <li><a href="n1humanLogin.html" data-i18n="nav_members">n1Human Members</a></li>
        </ul>
      </div>
      
      <header class="main-header">
        <!-- Izquierda: Logo (Desktop) / Carrito + Logo (Mobile) -->
        <div class="header-left">
           <a href="#" class="cart-btn-global mobile-only-flex" id="open-cart-mobile">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-count">0</span>
           </a>

           <div class="logo">
              <a href="index.html">
                <img src="assets/img/2 LOGO OJO INSTAGRAM PNG WHITE.png" alt="Human" />
              </a>
           </div>
        </div>

        <!-- Centro: Menú Desktop -->
        <nav class="desktop-main-menu">
          <ul>
            <!-- Carrito Desktop -->
            <li>
              <a href="#" id="open-cart-desktop" class="cart-btn-global">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
              </a>
            </li>
            <li><a href="tienda.html" data-i18n="nav_shop">Tienda</a></li>
            <li><a href="camisas.html" data-i18n="nav_shirts">Camisas</a></li>
            <li><a href="remeras.html" data-i18n="nav_tshirts">Remeras</a></li>
            <li><a href="accesorios.html" data-i18n="nav_accessories">Accesorios</a></li>
            <li><a href="n1humanLogin.html" class="btn-login"><i class="fas fa-user-astronaut"></i> <span data-i18n="nav_members">Members</span></a></li>
            <li><button id="lang-toggle" class="nav-icon-btn">ES</button></li>
          </ul>
        </nav>

        <!-- Derecha: Hamburguesa (Solo Mobile) -->
        <div class="header-right">
          <button id="menu-btn" class="hamburger" type="button">
            <span class="hamburger-top"></span>
            <span class="hamburger-middle"></span>
            <span class="hamburger-bottom"></span>
          </button>
        </div>
      </header>

      <style>
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          background: transparent; /* Totalmente transparente */
          backdrop-filter: none; /* Sin desenfoque */
          height: 100px; /* Recuperamos un poco de altura para el logo grande */
          border-bottom: none; /* Quitamos el borde para limpieza total */
          position: fixed;
          top: 0; left: 0; width: 100%; z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }

        .logo {
          height: 70px; /* Logo más grande (antes 50px) */
          display: flex;
          align-items: center;
        }

        .logo a { 
          display: block; 
          height: 100%;
        }

        .logo img {
          height: 100%; 
          width: auto;
          object-fit: contain;
        }

        /* Desktop Menu Centrado */
        .desktop-main-menu {
          flex: 3; /* Más espacio para centrar */
          display: flex;
          justify-content: center;
        }

        /* ... resto de estilos ... */

        /* --- MOBILE STYLES --- */
        @media (max-width: 960px) {
          .desktop-main-menu { display: none; }
          .mobile-only-flex { display: flex; }
          
          .main-header {
            height: 80px; 
            padding: 0 15px;
            background: transparent;
          }

          .logo {
            height: 50px; /* Logo más grande en móvil también */
            margin-left: 10px;
          }
          
          /* ... */
      </style>
    `;
  }

  initEventListeners() {
    const btn = this.querySelector('#menu-btn');
    const menu = this.querySelector('#mobile-menu');

    if(btn) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        document.body.classList.toggle('stop-scrolling');
        menu.classList.toggle('show-menu');
      });
    }

    const openCart = (e) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('n1-open-cart'));
    };

    this.querySelector('#open-cart-desktop')?.addEventListener('click', openCart);
    this.querySelector('#open-cart-mobile')?.addEventListener('click', openCart);

    const toggleLang = () => {
      const current = i18nService.locale;
      const next = current === 'es' ? 'en' : 'es';
      i18nService.setLocale(next);
      this.updateLangText();
    };
    
    this.querySelector('#lang-toggle')?.addEventListener('click', toggleLang);
    this.querySelector('#lang-toggle-mobile')?.addEventListener('click', toggleLang);

    this.updateLangText();
  }

  updateLangText() {
    const lang = i18nService.locale.toUpperCase();
    const btns = [this.querySelector('#lang-toggle'), this.querySelector('#lang-toggle-mobile')];
    btns.forEach(b => { if(b) b.innerText = lang; });
  }
}

customElements.define('n1-navbar', N1Navbar);
