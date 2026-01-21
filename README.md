# 🚀 n1Human - Headless e-Commerce Architecture

> **Prueba de Concepto (PoC)** de arquitectura escalable para WordPress Headless, Web Components y Seguridad.
> Diseñado para demostrar capacidades de ingeniería de software más allá del desarrollo de temas tradicionales.

---

## 🏗️ Arquitectura del Proyecto

El repositorio está dividido en tres capas lógicas para demostrar desacoplamiento y mantenibilidad:

1.  **`/frontend` (The Client):** Single Page Application (SPA) construida con Vanilla JS y Web Components Nativos. No depende de frameworks pesados. Consume una API (simulada o real).
2.  **`/backend-architecture` (The Core):** Código PHP estructurado para WordPress (Plugin MVC). Define la lógica de negocio, endpoints REST personalizados y seguridad.
3.  **`/docs` (The Contract):** Especificación OpenAPI (Swagger) que define la interfaz entre ambas partes.

---

## 💻 Instrucciones de Instalación y Prueba

Este proyecto puede ejecutarse en dos modos: **Modo Mockup (Rápido)** y **Modo Ingeniero (Full WordPress)**.

### Opción A: Modo Mockup (Frontend Only)
*Ideal para visualizar la UI, UX y flujos de usuario inmediatamente sin configurar servidores.*

1.  Navega a la carpeta `/frontend`.
2.  Abre el archivo `index.html` en tu navegador.
    *   *Recomendado:* Usar **Live Server** en VS Code para simular un servidor local.
3.  **Credenciales de Prueba:**
    *   **Admin:** `admin@n1human.com` / `123`
    *   **User:** `user@n1human.com` / `123`
    *   **Sandbox Card (Visa):** `4111 1111 1111 1111` (Cualquier fecha futura, CVV 123).

### Opción B: Modo Backend (WordPress Integration)
*Para auditar la calidad del código PHP y la arquitectura del plugin.*

1.  Tener una instalación local de WordPress funcionando.
2.  Copiar la carpeta `backend-architecture/wp-content/plugins/n1human-core` a tu carpeta local de plugins (`wp-content/plugins/`).
3.  Activar el plugin **"n1Human Core"** desde el admin de WordPress.
4.  El plugin expondrá los endpoints en `/wp-json/n1human/v1/products` replicando la estructura del mock.

---

## 🛡️ Características Implementadas

### Frontend & UX
*   **Web Components:** `<n1-navbar>`, `<n1-product-card>`, `<n1-cart-drawer>` para modularidad.
*   **State Management:** Carrito persistente y Sesión de Usuario usando `localStorage` y Servicios JS (`AuthService`, `CartService`).
*   **Accesibilidad (a11y):** Navegación por teclado, etiquetas ARIA, y mitigación de riesgos fotosensibles en video.
*   **Diseño:** Interfaz "Dark Mode" inmersiva con efectos Glassmorphism.

### Lógica de Negocio & Seguridad
*   **RBAC (Role-Based Access Control):** Paneles de control diferenciados para **Admin** (Gestión de Inventario) y **Usuario** (Historial de Pedidos).
*   **Auth Guard:** Protección de rutas críticas (Checkout, Dashboard).
*   **Validación de Pagos:** Implementación real del **Algoritmo de Luhn** para validar tarjetas de crédito en el cliente antes de procesar.
*   **Sandbox Testing:** Modal de pagos integrado con herramientas de prueba para desarrolladores.

---

## 📂 Estructura de Directorios

```text
/
├── frontend/                  # Aplicación Cliente
│   ├── api/                   # JSON Mocks (Simulación REST)
│   ├── assets/                # Estilos, Scripts y Multimedia
│   │   ├── js/
│   │   │   ├── components/    # Web Components (UI)
│   │   │   └── services/      # Lógica de Negocio (Auth, Cart, Orders)
│   └── *.html                 # Vistas (Index, Login, Dashboard, Tienda)
│
├── backend-architecture/      # Código WordPress
│   └── wp-content/plugins/
│       └── n1human-core/      # Plugin MVC (Controllers, Models)
│
└── docs/                      # Documentación API
    └── openapi.yaml           # Swagger Spec
```

---

**Desarrollado por:** Nahuel
*Ingeniería de Software & WordPress Avanzado*