# 🚀 n1Human - Arquitectura de e-Commerce WordPress Headless

**[Leer en Español](#documentación-en-español) | [Read in English](#english-documentation)**

---

## Documentación en Español

### 🌟 Visión General
**n1Human** es una **Prueba de Concepto (PoC)** diseñada para demostrar una arquitectura de comercio electrónico moderna, escalable y de alto rendimiento utilizando **WordPress Headless**. 

Este proyecto trasciende el desarrollo tradicional de temas de WordPress, exhibiendo una ingeniería de software robusta enfocada en:
*   **Desacoplamiento:** Separación total entre Frontend y Backend.
*   **Performance:** Uso de tecnologías nativas del navegador (Vanilla JS).
*   **Seguridad:** Simulaciones de roles (RBAC) y validación de pagos (Algoritmo de Luhn).

### 🔗 Demos en Producción
*   **Frontend (Tienda SPA):** [Ver en Netlify](https://extraordinary-bavarois-347169.netlify.app/)
*   **Documentación API (Backend Specs):** [Ver en Render](https://n1human-ecommerce-wp.onrender.com/)

### 🏗️ Arquitectura Técnica
El repositorio está estructurado en tres capas lógicas distintas:

1.  **`/frontend` (El Cliente - Single Page Application):**
    *   Construido con **Web Components Nativos** (`HTMLElement`) para modularidad sin dependencias pesadas.
    *   **Gestión de Estado:** Servicios JavaScript personalizados (`CartService`, `AuthService`, `ProductService`) utilizando `localStorage` para persistencia.
    *   **UX/UI:** Diseño "Dark Mode" con efectos de vidrio (Glassmorphism), totalmente responsivo y accesible.
    
2.  **`/backend-architecture` (El Núcleo - WordPress Plugin):**
    *   Código PHP estructurado siguiendo patrones MVC.
    *   Diseñado para ser inyectado como un plugin (`n1human-core`) en cualquier instalación de WordPress.
    *   Expone endpoints REST personalizados (`/wp-json/n1human/v1/...`) que alimentan al frontend.

3.  **`/docs` (El Contrato - OpenAPI/Swagger):**
    *   Especificación formal de la API. Define cómo el frontend y el backend se comunican, facilitando el desarrollo paralelo y la integración.

### 🛡️ Buenas Prácticas & Roadmap a Producción
Aunque esta es una prueba de concepto, el código está diseñado pensando en escalabilidad. Para un entorno de producción real, se implementarían las siguientes mejoras ya contempladas en la arquitectura:

*   **Seguridad API (Backend):**
    *   Implementación de **JWT (JSON Web Tokens)** o Application Passwords para autenticación segura en endpoints POST/PUT.
    *   Uso estricto de `sanitize_text_field()` y `wp_verify_nonce()` en todos los controladores PHP.
    *   Rate Limiting para prevenir abusos de la API.
*   **Gestión de Datos:**
    *   Transición de Mock Arrays a `WP_Query` consultando Custom Post Types (`product`, `shop_order`).
    *   Validación de esquemas JSON usando `rest_validate_request_arg()`.
*   **Performance:**
    *   Implementación de Caching de respuestas REST (Transients API) para endpoints de lectura frecuente (Catálogo).

### 🐳 Docker y Despliegue
La documentación de la API se despliega utilizando **Docker**, lo que garantiza un entorno reproducible y aislado.
*   **Imagen Base:** `swaggerapi/swagger-ui`.
*   **Proceso:** Un `Dockerfile` personalizado inyecta nuestra especificación `openapi.yaml` dentro del contenedor, permitiendo que Render sirva la documentación interactiva sin necesidad de configurar servidores web complejos manualmente.

### 🛠️ Instrucciones de Instalación Local

#### 1. Frontend (Modo Mockup)
*Ideal para desarrollo rápido de interfaz.*
1.  Navega a la carpeta `/frontend`.
2.  Abre `index.html` en tu navegador (o usa Live Server).
3.  **Credenciales de Prueba:**
    *   **Admin:** `admin@n1human.com` / `123` (Acceso a Gestión de Inventario).
    *   **Usuario:** `user@n1human.com` / `123` (Acceso a Historial de Compras).

#### 2. Backend (Integración WordPress)
*Para auditar la lógica PHP.*
1.  Instala WordPress localmente (usando **LocalWP** es recomendado).
2.  Copia la carpeta `backend-architecture/wp-content/plugins/n1human-core` a tu directorio de plugins local.
3.  Activa el plugin desde el administrador de WordPress.
4.  La API estará disponible en tu localhost.

---

## English Documentation

### 🌟 Overview
**n1Human** is a **Proof of Concept (PoC)** demonstrating a scalable, high-performance e-commerce architecture using **Headless WordPress**. 

This project goes beyond traditional theme development, showcasing advanced software engineering skills focused on:
*   **Decoupling:** Complete separation between Frontend and Backend.
*   **Performance:** Utilizing browser-native technologies (Vanilla JS Web Components).
*   **Security:** Role-Based Access Control (RBAC) simulation and Payment Validation (Luhn Algorithm).

### 🔗 Live Deployments
*   **Frontend (SPA Store):** [View on Netlify](https://extraordinary-bavarois-347169.netlify.app/)
*   **API Documentation (Backend Specs):** [View on Render](https://n1human-ecommerce-wp.onrender.com/)

### 🏗️ Technical Architecture
The repository is split into three logical layers:

1.  **`/frontend` (The Client - Single Page Application):**
    *   Built with **Native Web Components** (`HTMLElement`) for modularity without heavy frameworks.
    *   **State Management:** Custom JavaScript services (`CartService`, `AuthService`, `ProductService`) using `localStorage` for persistence.
    *   **UX/UI:** Immersive "Dark Mode" design with Glassmorphism effects, fully responsive and accessible.

2.  **`/backend-architecture` (The Core - WordPress Plugin):**
    *   Structured PHP code following MVC patterns.
    *   Designed to be injected as a plugin (`n1human-core`) into any WordPress installation.
    *   Exposes custom REST endpoints (`/wp-json/n1human/v1/...`) to feed the frontend.

3.  **`/docs` (The Contract - OpenAPI/Swagger):**
    *   Formal API specification. Defines the interface between frontend and backend, facilitating parallel development and integration.

### 🛡️ Best Practices & Production Roadmap
While this is a PoC, the code is architected for scalability. For a live production environment, the following enhancements (already considered in the design) would be implemented:

*   **API Security (Backend):**
    *   Implementation of **JWT (JSON Web Tokens)** or Application Passwords for secure authentication on POST/PUT endpoints.
    *   Strict use of `sanitize_text_field()` and `wp_verify_nonce()` in all PHP controllers.
    *   Rate Limiting to prevent API abuse.
*   **Data Management:**
    *   Transition from Mock Arrays to `WP_Query` fetching Custom Post Types (`product`, `shop_order`).
    *   JSON Schema validation using `rest_validate_request_arg()`.
*   **Performance:**
    *   Implementation of REST response Caching (Transients API) for high-traffic read endpoints (Catalog).

### 🐳 Docker & Deployment
The API documentation is deployed using **Docker**, ensuring a reproducible and isolated environment.
*   **Base Image:** `swaggerapi/swagger-ui`.
*   **Process:** A custom `Dockerfile` injects our `openapi.yaml` specification into the container, allowing Render to serve interactive documentation without manually configuring complex web servers.

### 🛠️ Local Development

#### 1. Frontend (Mock Mode)
*Best for rapid UI development.*
1.  Navigate to `/frontend`.
2.  Open `index.html` in your browser.
3.  **Test Credentials:**
    *   **Admin:** `admin@n1human.com` / `123` (Inventory Management Access).
    *   **User:** `user@n1human.com` / `123` (Order History Access).

#### 2. Backend (WordPress Integration)
*To audit PHP logic.*
1.  Install a local WordPress instance (using **LocalWP** is recommended).
2.  Copy the `backend-architecture/wp-content/plugins/n1human-core` folder to your local plugins directory.
3.  Activate the plugin in WP Admin.
4.  The API will be available at your localhost.

---

**Desarrollado por / Developed by:** Nahuel
*Software Engineer & WordPress Specialist*
