# Enext Technical Assessment - Bank Data Orchestrator

**Candidata:** Katheryn Borja  
**Posición:** Fullstack Developer  
**Fecha de Entrega:** 28/01/2026 (Entrega Inmediata)

---

## 🎯 Objetivo del Proyecto

Esta solución fue desarrollada en respuesta a la prueba técnica solicitada por **Enext**. El objetivo fue construir un orquestador de datos bancarios seguro y escalable, cumpliendo estrictamente con los siguientes requerimientos:

1.  **Arquitectura Segura:** Implementación de patrón Proxy/BFF con Node.js para ocultar la API externa.
2.  **Seguridad Avanzada:** Autenticación JWT, Interceptores HTTP y Route Guards en Angular.
3.  **Contenerización Total:** Dockerfiles optimizados (Multi-stage + Alpine) y orquestación con Docker Compose.
4.  **Frontend Moderno:** Angular 21 con Standalone Components y diseño Glassmorphism (CSS puro).

> ✅ **Estado:** Todos los requerimientos fueron completados y verificados exitosamente en un plazo de 24 horas.

---

## 🏗️ Arquitectura de la Solución

### 1. Backend Propio (BFF - Backend for Frontend)
No se accede a la API bancaria directamente. Un servidor **Node.js + Express** actúa como intermediario para:
*   Sanitizar y transformar los datos (`DTOs`).
*   Proteger las credenciales de la API externa.
*   Centralizar la lógica de autenticación.

### 2. Frontend (Angular 21)
Aplicación SPA moderna enfocada en rendimiento y seguridad:
*   **Seguridad:** El token JWT se inyecta automáticamente vía `AuthInterceptor`.
*   **UX:** Manejo reactivo de estados de carga y error.
*   **Diseño:** Interfaz profesional sin dependencias pesadas de UI.

---

## 🐳 Despliegue (Docker)

La aplicación está lista para ser desplegada en cualquier entorno con Docker instalado.

**Comando de Ejecución:**
```bash
docker-compose up --build
```

**Accesos:**
*   **App:** [http://localhost:8080](http://localhost:8080)
*   **API:** [http://localhost:3000](http://localhost:3000)

**Credenciales de Prueba:**
*   User: `admin`
*   Pass: `admin123`

---

## 🛠️ Stack Tecnológico

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

---
*Entregable técnico para proceso de selección Enext.*
