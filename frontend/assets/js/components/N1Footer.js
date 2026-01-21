export class N1Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer>
        <ul>
          <li>Human &copy; ${year}</li>
          <li><a href="https://www.n1human.com" target="_blank">Web Oficial (Tienda Nube)</a></li>
          <li><a href="https://www.instagram.com/n1human/" target="_blank">Instagram</a></li>
          <li><a href="#">Legal</a></li>
        </ul>
        <div class="wp-status" style="text-align: center; margin-top: 20px; font-size: 0.8rem; color: #555;">
          <span style="display: inline-flex; align-items: center; gap: 5px;">
            <span style="width: 8px; height: 8px; background-color: #00ff00; border-radius: 50%; display: inline-block;"></span>
            WordPress Headless API: <strong>Connected</strong>
          </span>
        </div>
      </footer>
    `;
  }
}

customElements.define('n1-footer', N1Footer);