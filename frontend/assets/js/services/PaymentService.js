export class PaymentService {
  constructor() {
    // Simulación de latencia de red
    this.latency = 1500;
  }

  /**
   * Valida el número de tarjeta usando el Algoritmo de Luhn.
   * @param {string} value - El número de tarjeta limpio (sin espacios).
   * @returns {boolean}
   */
  luhnCheck(value) {
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm
    let nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }

  /**
   * Procesa el pago simulado.
   */
  async processPayment(cardData, amount) {
    return new Promise((resolve, reject) => {
      console.log(`Procesando pago de $${amount}...`);
      
      setTimeout(() => {
        // 1. Validar Luhn
        const isValid = this.luhnCheck(cardData.number);
        
        if (!isValid) {
          reject({ error: 'invalid_card', message: 'El número de tarjeta no es válido (Luhn Check Failed).' });
          return;
        }

        // 2. Simular validación de expiración y CVV básica
        if (cardData.cvv.length < 3) {
          reject({ error: 'invalid_cvv', message: 'CVV incorrecto.' });
          return;
        }

        // 3. Éxito
        resolve({ 
          success: true, 
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000000),
          message: 'Pago aprobado.' 
        });

      }, this.latency);
    });
  }
}

export const paymentService = new PaymentService();
