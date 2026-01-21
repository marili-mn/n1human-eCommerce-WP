import { paymentService } from '../services/PaymentService.js';
import { cartService } from '../services/CartService.js';
import { authService } from '../services/AuthService.js';
import { orderService } from '../services/OrderService.js';

export class N1PaymentModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.amount = this.getAttribute('amount') || '0.00';
    this.render();
    this.initListeners();
  }

  render() {
    this.innerHTML = `
      <div class="payment-overlay">
        <div class="payment-card">
          <div class="modal-header">
            <h3>Pago Seguro</h3>
            <button class="close-modal">&times;</button>
          </div>
          
          <div class="amount-display">
            Total a pagar: <span>$${this.amount}</span>
          </div>

          <form id="payment-form">
            <div class="form-group">
              <label>Titular de la Tarjeta</label>
              <input type="text" id="card-name" placeholder="Como aparece en la tarjeta" required>
            </div>

            <div class="form-group">
              <label>Número de Tarjeta</label>
              <div class="input-icon-wrapper">
                <input type="text" id="card-number" placeholder="0000 0000 0000 0000" maxlength="19" required>
                <i class="fas fa-credit-card icon-right" id="brand-icon"></i>
              </div>
              <small id="luhn-error" class="error-msg"></small>
            </div>

            <div class="row">
              <div class="form-group">
                <label>Vencimiento</label>
                <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5" required>
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input type="password" id="card-cvv" placeholder="123" maxlength="4" required>
              </div>
            </div>

            <div class="test-cards-hint">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <p style="margin:0; color:#fff;"><strong>Modo Sandbox Activado</strong></p>
                <a href="https://developer.paypal.com/tools/sandbox/card-testing/" target="_blank" style="color:#00ff00; font-size:0.8rem; text-decoration:underline;">Ver Docs Oficiales</a>
              </div>
              
              <div class="copy-row" style="background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; display:flex; align-items:center; justify-content:space-between;">
                <div>
                  <span style="color:#888; font-size:0.75rem; display:block;">Visa Test Card:</span>
                  <code id="sandbox-card" style="color:#fff; font-size:0.9rem;">4111 1111 1111 1111</code>
                </div>
                <button type="button" id="copy-btn" style="background:transparent; border:1px solid #555; color:#aaa; font-size:0.75rem; padding:4px 8px; cursor:pointer; border-radius:3px;">Copiar</button>
              </div>
              
              <p style="font-size:0.75rem; color:#666; margin-top:10px;">
                <i class="fas fa-info-circle"></i> Para completar el flujo: Usa cualquier fecha futura (ej: 12/30) y cualquier CVV de 3 dígitos (ej: 123).
              </p>
            </div>

            <button type="submit" class="pay-btn">
              <span class="btn-text">Pagar Ahora</span>
              <div class="spinner"></div>
            </button>
          </form>
        </div>
      </div>

      <style>
        .payment-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);
          display: flex; justify-content: center; align-items: center;
          z-index: 2000; animation: fadeIn 0.3s;
        }

        .payment-card {
          background: #111; border: 1px solid #333; width: 90%; max-width: 450px;
          border-radius: 12px; padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          position: relative;
        }

        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 15px;
        }

        .close-modal {
          background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;
        }

        .amount-display {
          background: #050505; border: 1px solid #222; padding: 15px;
          text-align: center; border-radius: 6px; margin-bottom: 20px;
          font-family: 'Familjen Grotesk', sans-serif; text-transform: uppercase;
        }
        .amount-display span { font-size: 1.5rem; font-weight: bold; color: #00ff00; display: block;}

        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; color: #aaa; font-size: 0.85rem; text-transform: uppercase;}
        
        input {
          width: 100%; padding: 12px; background: #222; border: 1px solid #444;
          color: #fff; border-radius: 4px; font-size: 1rem; outline: none;
          transition: border-color 0.3s;
        }
        input:focus { border-color: #fff; }
        input.invalid { border-color: #ff4444; }
        input.valid { border-color: #00ff00; }

        .row { display: flex; gap: 15px; }
        .row .form-group { flex: 1; }

        .input-icon-wrapper { position: relative; }
        .icon-right { position: absolute; right: 15px; top: 15px; color: #666; }

        .error-msg { color: #ff4444; font-size: 0.8rem; display: none; margin-top: 5px; }

        .pay-btn {
          width: 100%; padding: 15px; background: #fff; color: #000;
          border: none; font-weight: bold; text-transform: uppercase;
          cursor: pointer; margin-top: 10px; border-radius: 4px;
          position: relative;
        }
        .pay-btn:disabled { background: #555; cursor: not-allowed; }

        .spinner {
          width: 20px; height: 20px; border: 3px solid rgba(0,0,0,0.3);
          border-top: 3px solid #000; border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto; display: none;
        }
        .pay-btn.loading .btn-text { display: none; }
        .pay-btn.loading .spinner { display: block; }

        .test-cards-hint {
          background: rgba(255,255,255,0.05); padding: 10px; font-size: 0.8rem;
          margin-bottom: 15px; border-radius: 4px; color: #888;
        }
        .test-cards-hint code { color: #00ff00; display: block; margin-top: 5px;}

        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `;
  }

  initListeners() {
    this.querySelector('.close-modal').addEventListener('click', () => this.remove());
    
    // Copy Logic
    this.querySelector('#copy-btn').addEventListener('click', () => {
      const cardNum = "4111111111111111"; // Raw number
      navigator.clipboard.writeText(cardNum).then(() => {
        const btn = this.querySelector('#copy-btn');
        const originalText = btn.innerText;
        btn.innerText = "¡Copiado!";
        btn.style.borderColor = "#00ff00";
        btn.style.color = "#00ff00";
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.borderColor = "#555";
          btn.style.color = "#aaa";
        }, 2000);
      });
    });
    
    // Formatting Card Number
    const numInput = this.querySelector('#card-number');
    numInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = value;
      
      // Live Luhn Check visual
      if (value.replace(/\s/g, '').length >= 13) {
        const isValid = paymentService.luhnCheck(value);
        if(isValid) {
          numInput.classList.add('valid');
          numInput.classList.remove('invalid');
          this.querySelector('#luhn-error').style.display = 'none';
        } else {
          numInput.classList.add('invalid');
          numInput.classList.remove('valid');
        }
      }
    });

    // Formatting Expiry
    const expInput = this.querySelector('#card-expiry');
    expInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
      e.target.value = value;
    });

    // Submit Logic
    this.querySelector('#payment-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = this.querySelector('.pay-btn');
      const numInput = this.querySelector('#card-number');
      const errMsg = this.querySelector('#luhn-error');

      // Pre-validation
      if (!paymentService.luhnCheck(numInput.value)) {
        numInput.classList.add('invalid');
        errMsg.innerText = "Número inválido (Luhn Check Failed)";
        errMsg.style.display = 'block';
        return;
      }

      // Start Loading
      btn.classList.add('loading');
      btn.disabled = true;

      try {
        const result = await paymentService.processPayment({
          number: numInput.value,
          cvv: this.querySelector('#card-cvv').value
        }, this.amount);

        // Save Order Logic
        const user = authService.getUser();
        const items = cartService.getItems();
        
        orderService.createOrder(user, items, this.amount, result.transactionId);

        alert(`✅ ${result.message}\nID: ${result.transactionId}`);
        cartService.clear(); 
        this.remove(); 
        window.location.href = 'dashboard-user.html'; 

      } catch (error) {
        alert(`❌ Error: ${error.message}`);
        btn.classList.remove('loading');
        btn.disabled = false;
      }
    });
  }
}

customElements.define('n1-payment-modal', N1PaymentModal);
