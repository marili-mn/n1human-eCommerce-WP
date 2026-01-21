export class AuthService {
  constructor() {
    this.sessionKey = 'n1_auth_session';
    this.usersKey = 'n1_users_db';
    this.initUsers();
  }

  initUsers() {
    if (!localStorage.getItem(this.usersKey)) {
      // Seed inicial
      const defaultUsers = [
        { name: 'Usuario Demo', email: 'user@n1human.com', password: '123', role: 'customer' },
        { name: 'Admin Boss', email: 'admin@n1human.com', password: '123', role: 'admin' }
      ];
      localStorage.setItem(this.usersKey, JSON.stringify(defaultUsers));
    }
  }

  load() {
    const data = localStorage.getItem(this.sessionKey);
    return data ? JSON.parse(data) : null;
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey));
  }

  register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getUsers();
        
        if (users.find(u => u.email === email)) {
          reject('El email ya está registrado.');
          return;
        }

        const newUser = { name, email, password, role: 'customer' };
        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        resolve(newUser);
      }, 800);
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          reject('Credenciales incorrectas.');
          return;
        }

        const session = {
          user: { name: user.name, email: user.email, role: user.role },
          token: 'mock_jwt_' + Date.now()
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(session));
        resolve(session);
      }, 800);
    });
  }

  logout() {
    localStorage.removeItem(this.sessionKey);
    window.location.href = 'n1humanLogin.html';
  }

  isAuthenticated() {
    return !!this.load();
  }

  isAdmin() {
    const session = this.load();
    return session && session.user.role === 'admin';
  }

  getUser() {
    const session = this.load();
    return session ? session.user : null;
  }
}

export const authService = new AuthService();