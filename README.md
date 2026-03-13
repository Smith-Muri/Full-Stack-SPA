Full-Stack-SPA

Aplicación Full Stack basada en arquitectura SPA (Single Page Application) que integra frontend y backend para ofrecer una experiencia web dinámica, rápida y escalable.

El proyecto demuestra la implementación de una aplicación moderna donde el cliente interactúa con una API backend para gestionar datos y lógica del negocio.

Descripción

Este proyecto implementa una aplicación web full-stack en la que el frontend consume servicios del backend mediante API.

La aplicación está diseñada siguiendo buenas prácticas de desarrollo web como:

Separación entre frontend y backend

Arquitectura basada en APIs

Manejo de datos desde una base de datos

Uso de control de versiones

El objetivo del proyecto es demostrar cómo construir una Single Page Application (SPA) que permita manejar datos dinámicamente sin recargar toda la página.

Tecnologías utilizadas
Frontend

HTML5

CSS3

JavaScript

Framework SPA (según implementación del proyecto)

Backend

Node.js / Express (o tecnología usada en el proyecto)

API REST

Base de datos

PostgreSQL / otra base de datos utilizada

Herramientas

Git

GitHub

Visual Studio Code

Postman (para pruebas de API)

Arquitectura del proyecto

El sistema sigue una arquitectura cliente-servidor:

Frontend (SPA)
↓
API REST
↓
Backend
↓
Base de datos

Flujo

El usuario interactúa con la interfaz web.

El frontend envía solicitudes a la API.

El backend procesa la lógica.

Se consultan o almacenan datos en la base de datos.

La API responde con datos en formato JSON.

Estructura del proyecto
Full-Stack-SPA
│
├── frontend
│   ├── src
│   ├── components
│   ├── services
│   └── styles
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── server.js
│
├── database
│   └── schema.sql
│
├── .env
├── package.json
└── README.md
Instalación
1 Clonar el repositorio
git clone https://github.com/Smith-Muri/Full-Stack-SPA.git
2 Entrar al proyecto
cd Full-Stack-SPA
3 Instalar dependencias

Backend

cd backend
npm install

Frontend

cd frontend
npm install
4 Configurar variables de entorno

Crear un archivo .env

Ejemplo:

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
5 Ejecutar el backend
npm start
6 Ejecutar el frontend
npm run dev
Funcionalidades

CRUD de datos

Consumo de API REST

Interfaz dinámica tipo SPA

Comunicación frontend-backend

Manejo de base de datos

Ejemplo de endpoints
GET    /api/items
GET    /api/items/:id
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
Buenas prácticas implementadas

Separación de responsabilidades

Uso de control de versiones

Arquitectura modular

Manejo de variables de entorno

Estructura escalable del proyecto
