const dictionary = {
  es: {
    nav_home: "Inicio",
    nav_shop: "Tienda",
    nav_shirts: "Camisas",
    nav_tshirts: "Remeras",
    nav_accessories: "Accesorios",
    nav_pants: "Pantalones",
    nav_sneakers: "Zapatillas",
    nav_members: "Miembros n1",
    nav_soon: "Pronto",
    
    hero_title: "Desfile de Moda Primavera-Verano 1995",
    hero_subtitle: "Próximo Lanzamiento",
    btn_more: "Ver Más",
    
    section_vintage: "Human Vintage Collection",
    section_recent: "Desfile Reciente",
    
    footer_privacy: "Privacidad",
    footer_suppliers: "Proveedores",
    
    // Stats
    stat_designs: "Total Diseños",
    stat_clients: "Clientes Satisfechos",
    stat_sold: "Unidades Vendidas",
    stat_sold_out: "Diseños Agotados",
    
    // Collections
    col_shirts_title: "Colección de Camisas",
    col_shirts_desc: "Inspiradas en toda la moda espacial del futuro.",
    
    col_tshirts_title: "Remeras Finix",
    col_tshirts_desc: "Estilo y resistencia, el icono de la moda retro futurista.",
    
    col_accessories_title: "Accesorios Dragon",
    col_accessories_desc: "Comodidad y estilo para conquistar el espacio."
  },
  en: {
    nav_home: "Home",
    nav_shop: "Shop",
    nav_shirts: "Shirts",
    nav_tshirts: "T-Shirts",
    nav_accessories: "Accessories",
    nav_pants: "Pants",
    nav_sneakers: "Sneakers",
    nav_members: "n1 Members",
    nav_soon: "Soon",
    
    hero_title: "Spring-Summer 1995 Fashion Show",
    hero_subtitle: "Next Release",
    btn_more: "See More",
    
    section_vintage: "Human Vintage Collection",
    section_recent: "Recent Show",
    
    footer_privacy: "Privacy",
    footer_suppliers: "Suppliers",
    
    // Stats
    stat_designs: "Total Designs",
    stat_clients: "Happy Clients",
    stat_sold: "Units Sold",
    stat_sold_out: "Sold Out Designs",
    
    // Collections
    col_shirts_title: "Shirt Collection",
    col_shirts_desc: "Inspired by future space fashion.",
    
    col_tshirts_title: "Finix T-Shirts",
    col_tshirts_desc: "Style and durability, the retro-futuristic fashion icon.",
    
    col_accessories_title: "Dragon Accessories",
    col_accessories_desc: "Comfort and style to conquer space."
  }
};

export class I18nService {
  constructor() {
    this.locale = localStorage.getItem('n1_locale') || 'es';
    this.translatePage();
  }

  setLocale(locale) {
    if (this.locale === locale) return;
    this.locale = locale;
    localStorage.setItem('n1_locale', locale);
    this.translatePage();
  }

  get(key) {
    return dictionary[this.locale][key] || key;
  }

  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.get(key);
      if (translation) {
        // Preservar hijos si es necesario (ej: badges) o solo texto
        // Para simplificar, si tiene hijos (como el badge "Pronto"), 
        // asumimos que la traducción es SOLO la parte de texto principal y el badge se maneja aparte.
        // Pero en este caso, cambiaremos el innerText si no tiene hijos complejos, 
        // o buscaremos una estrategia mejor.
        
        // Estrategia Segura: Si el elemento tiene hijos con clase .badge, traducimos solo el nodo de texto.
        if (el.querySelector('.badge')) {
           const badge = el.querySelector('.badge');
           const badgeKey = badge.getAttribute('data-i18n');
           // Restaurar el badge
           el.innerHTML = `${translation} <span class="badge" data-i18n="${badgeKey}">${this.get(badgeKey)}</span>`;
        } else {
           el.innerText = translation;
        }
      }
    });
  }
}

export const i18nService = new I18nService();
