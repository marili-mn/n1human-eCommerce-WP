import { cartService } from '../services/CartService.js';
import { authService } from '../services/AuthService.js';
import './N1PaymentModal.js';

export class N1CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.initListeners();
    // Escuchar cambios globales en el carrito
    window.addEventListener('n1-cart-updated', () => this.updateUI());
    // Escuchar evento para abrir el carrito
    window.addEventListener('n1-open-cart', () => this.open());
  }

  render() {
    this.innerHTML = `
      <div class="cart-overlay" id="cart-overlay"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
          <h3>Tu Carrito</h3>
          <button id="close-cart" class="close-btn">&times;</button>
        </div>
        
        <div class="cart-body" id="cart-items-container">
          <!-- Items will be injected here -->
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-total-price">$0.00</span>
          </div>
          <button class="checkout-btn">Finalizar Compra</button>
        </div>
      </div>

      <style>
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          z-index: 900;
        }

        .cart-overlay.show {
          opacity: 1;
          pointer-events: all;
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: -450px; /* Un poco más de margen para esconderlo bien */
          width: 85%; /* En mobile ocupa la mayoría de la pantalla */
          max-width: 400px; /* Pero en desktop no se pasa de 400px */
          height: 100%;
          background: #111;
          color: #fff;
          z-index: 1000;
          transition: right 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          display: flex;
          flex-direction: column;
          border-left: 1px solid #333;
          box-shadow: -5px 0 15px rgba(0,0,0,0.5);
        }

        .cart-drawer.is-open {
          right: 0;
        }

        .cart-header {
          padding: 20px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h3 {
          font-family: 'Familjen Grotesk', sans-serif;
          text-transform: uppercase;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s, transform 0.3s;
          padding: 0 10px;
        }
        .close-btn:hover {
          color: #ff4444;
          transform: rotate(90deg);
        }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .cart-footer {
          padding: 20px;
          padding-bottom: calc(20px + env(safe-area-inset-bottom)); /* Mobile Safe Area */
          border-top: 1px solid #333;
          background: #1a1a1a;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .checkout-btn {
          width: 100%;
          padding: 15px;
          background: #fff;
          color: #000;
          border: none;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          white-space: nowrap; /* Prevent vertical text */
        }

        .checkout-btn:hover {
          background: #ccc;
        }

        /* Cart Item Styles */
        .cart-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #222;
        }

        .cart-item img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 4px;
        }

        .item-details {
          flex: 1;
        }

        .item-details h4 {
          font-size: 0.9rem;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }

        .qty-btn {
          background: #333;
          border: none;
          color: #fff;
          width: 20px;
          height: 20px;
          cursor: pointer;
          border-radius: 2px;
        }
      </style>
    `;
    this.updateUI();
  }

  initListeners() {
    this.querySelector('#close-cart').addEventListener('click', () => this.close());
    this.querySelector('#cart-overlay').addEventListener('click', () => this.close());
    
    // Delegación de eventos para botones dinámicos de items
    this.querySelector('#cart-items-container').addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      if (e.target.classList.contains('increase')) {
        cartService.updateQuantity(id, 1);
      } else if (e.target.classList.contains('decrease')) {
        cartService.updateQuantity(id, -1);
      } else if (e.target.classList.contains('remove-item')) {
        cartService.removeItem(id);
      }
    });

    this.querySelector('.checkout-btn').addEventListener('click', () => {
      const total = cartService.getTotal().toFixed(2);
      
      if (parseFloat(total) <= 0) {
        alert('Tu carrito está vacío.');
        return;
      }

      // Auth Guard
      if (!authService.isAuthenticated()) {
        const confirmLogin = confirm('🔒 Debes iniciar sesión para completar la compra.\n\n¿Ir al login ahora?');
        if (confirmLogin) {
          this.close();
          window.location.href = 'n1humanLogin.html';
        }
        return;
      }

      const modal = document.createElement('n1-payment-modal');
      modal.setAttribute('amount', total);
      document.body.appendChild(modal);
      this.close(); 
    });
  }

  open() {
    this.querySelector('#cart-drawer').classList.add('is-open');
    this.querySelector('#cart-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.querySelector('#cart-drawer').classList.remove('is-open');
    this.querySelector('#cart-overlay').classList.remove('show');
    document.body.style.overflow = '';
  }

  updateUI() {
    const items = cartService.getItems();
    const container = this.querySelector('#cart-items-container');
    const totalEl = this.querySelector('#cart-total-price');

    if (items.length === 0) {
      container.innerHTML = '<p style="text-align:center; color: #666; margin-top: 50px;">Tu carrito está vacío.</p>';
      totalEl.innerText = '$0.00';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="cart-item">
        <img src="${item.image || 'assets/img/logo.png'}" alt="${item.name}">
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
          <div class="item-controls">
            <button class="qty-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn increase" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}" style="margin-left: auto; background:none; border:none; color: #ff4444; cursor:pointer; font-size:12px;">Eliminar</button>
          </div>
        </div>
      </div>
    `).join('');

    totalEl.innerText = `$${cartService.getTotal().toFixed(2)}`;
  }
}

customElements.define('n1-cart-drawer', N1CartDrawer);
