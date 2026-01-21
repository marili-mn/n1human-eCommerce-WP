export class ProductService {
  constructor() {
    this.storageKey = 'n1_products_db';
    this.initPromise = null;
  }

  async init() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise(async (resolve, reject) => {
      // 1. Verificar si ya tenemos DB local
      const localData = localStorage.getItem(this.storageKey);
      
      if (localData) {
        resolve(JSON.parse(localData));
        return;
      }

      // 2. Si no, sembrar (seed) desde el JSON
      try {
        const response = await fetch('api/products.json');
        const products = await response.json();
        this.save(products);
        resolve(products);
      } catch (error) {
        console.error('Error seeding DB:', error);
        resolve([]);
      }
    });

    return this.initPromise;
  }

  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id) {
    const products = this.getAll();
    return products.find(p => p.id == id);
  }

  save(products) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
    // Notificar cambios a otras pestañas/componentes
    window.dispatchEvent(new CustomEvent('n1-db-changed'));
  }

  create(product) {
    const products = this.getAll();
    // Generar ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 101;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    this.save(products);
    return newProduct;
  }

  update(id, updatedFields) {
    let products = this.getAll();
    products = products.map(p => {
      if (p.id == id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    this.save(products);
  }

  delete(id) {
    let products = this.getAll();
    products = products.filter(p => p.id != id);
    this.save(products);
  }
}

export const productService = new ProductService();
