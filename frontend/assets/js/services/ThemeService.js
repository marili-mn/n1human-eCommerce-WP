export class ThemeService {
  constructor() {
    this.storageKey = 'n1_theme_preference';
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  }

  toggle() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem(this.storageKey, isLight ? 'light' : 'dark');
    return isLight;
  }

  isLight() {
    return document.body.classList.contains('light-mode');
  }
}

export const themeService = new ThemeService();
