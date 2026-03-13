# Full-Stack-SPA

Aplicación **Full Stack basada en arquitectura SPA (Single Page Application)** que integra frontend y backend para ofrecer una experiencia web dinámica, rápida y escalable.

Este proyecto demuestra la implementación de una aplicación moderna donde el cliente interactúa con una API backend para gestionar datos y lógica del negocio.

---

# Descripción

Este proyecto implementa una **aplicación web full-stack** en la que el frontend consume servicios del backend mediante API.

La aplicación está diseñada siguiendo buenas prácticas de desarrollo web como:

- Separación entre frontend y backend
- Arquitectura basada en APIs
- Manejo de datos desde una base de datos
- Uso de control de versiones con Git

El objetivo del proyecto es demostrar cómo construir una **Single Page Application (SPA)** que permita manejar datos dinámicamente sin recargar toda la página.

---

# Tecnologías utilizadas

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js
- Express

## Base de datos
- PostgreSQL

## Herramientas
- Git
- GitHub
- Visual Studio Code
- Postman

---

# Arquitectura del proyecto

El sistema sigue una arquitectura **cliente-servidor**:
Frontend (SPA)
↓
API REST
↓
Backend
↓
Base de datos


### Flujo de funcionamiento

1. El usuario interactúa con la interfaz web.
2. El frontend envía solicitudes a la API.
3. El backend procesa la lógica de negocio.
4. Se realizan consultas o modificaciones en la base de datos.
5. La API responde con datos en formato JSON al frontend.

---

# Estructura del proyecto
Full-Stack-SPA
│
├── frontend
│ ├── src
│ ├── components
│ ├── services
│ └── styles
│
├── backend
│ ├── controllers
│ ├── routes
│ ├── models
│ └── server.js
│
├── database
│ └── schema.sql
│
├── .env
├── package.json
└── README.md

