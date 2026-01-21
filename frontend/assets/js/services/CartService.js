export class CartService {
  constructor() {
    this.storageKey = 'n1_cart';
    this.items = this.load();
  }

  load() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('n1-cart-updated'));
  }

  getItems() {
    return this.items;
  }

  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  updateQuantity(id, change) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.save();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  getCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }
}

export const cartService = new CartService();
