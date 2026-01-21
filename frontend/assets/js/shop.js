import './components/N1ProductCard.js';
import { productService } from './services/ProductService.js';

async function loadProducts() {
  const container = document.getElementById('product-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  try {
    // Inicializar DB (Carga JSON si es la primera vez, o usa LocalStorage)
    await productService.init();
    
    const render = (category = 'all') => {
      // Obtener datos frescos del servicio
      const products = productService.getAll();
      
      container.innerHTML = '';
      const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

      if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No hay productos en esta categoría.</p>';
        return;
      }

      filtered.forEach(p => {
        const card = document.createElement('n1-product-card');
        card.setAttribute('product', JSON.stringify(p));
        container.appendChild(card);
      });
    };

    // Render inicial
    render();

    // Filtros
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.filter;
        render(category);
      });
    });

  } catch (error) {
    console.error('Error loading products:', error);
    container.innerHTML = '<p>Error cargando los productos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);