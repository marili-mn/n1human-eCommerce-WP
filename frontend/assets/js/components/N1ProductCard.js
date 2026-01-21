import { cartService } from '../services/CartService.js';

export class N1ProductCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const product = JSON.parse(this.getAttribute('product'));
    this.render(product);
  }

  render(product) {
    this.innerHTML = `
      <div class="product-card">
        <div class="image-container">
          <img src="${product.image}" alt="${product.name}">
          <div class="overlay">
            <button class="add-to-cart-btn">Agregar al Carrito</button>
          </div>
        </div>
        <div class="info">
          <h3>${product.name}</h3>
          <p class="category">${product.category}</p>
          <p class="price">$${product.price}</p>
        </div>
      </div>
      <style>
        .product-card {
          background: #111;
          border: 1px solid #333;
          transition: transform 0.3s;
          overflow: hidden;
        }
        .product-card:hover {
          transform: translateY(-5px);
          border-color: #fff;
        }
        .image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .product-card:hover img {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          top: 0; 
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .product-card:hover .overlay {
          opacity: 1;
        }
        .add-to-cart-btn {
          background: #fff;
          color: #000;
          border: none;
          padding: 10px 20px;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          transform: translateY(20px);
          transition: transform 0.3s;
        }
        .product-card:hover .add-to-cart-btn {
          transform: translateY(0);
        }
        .info {
          padding: 15px;
          text-align: center;
        }
        .info h3 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: #fff;
        }
        .category {
          color: #888;
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
        }
      </style>
    `;

    this.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      cartService.addItem(product);
      // Animación visual de confirmación o abrir el drawer
      window.dispatchEvent(new CustomEvent('n1-open-cart'));
    });
  }
}

customElements.define('n1-product-card', N1ProductCard);
