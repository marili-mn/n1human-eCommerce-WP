export class OrderService {
  constructor() {
    this.storageKey = 'n1_orders_db';
  }

  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getByUser(email) {
    const allOrders = this.getAll();
    // Filtrar pedidos que pertenezcan al usuario logueado
    return allOrders.filter(order => order.userEmail === email).sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  createOrder(user, items, total, transactionId) {
    const orders = this.getAll();
    
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      userEmail: user.email,
      userName: user.name, // Nuevo campo para Admin
      date: new Date().toISOString(),
      items: items,
      total: total,
      transactionId: transactionId,
      status: 'processing'
    };

    orders.push(newOrder);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
    return newOrder;
  }
}

export const orderService = new OrderService();
