-- SQL script to create database schema and insert sample data for mascotas e-commerce

-- drop and create tables
DROP TABLE IF EXISTS detalle_orden;
DROP TABLE IF EXISTS ordenes;
DROP TABLE IF EXISTS tickets_soporte;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    cliente_id INTEGER REFERENCES clientes(id),
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    total NUMERIC(10,2) NOT NULL
);

CREATE TABLE detalle_orden (
    id SERIAL PRIMARY KEY,
    orden_id INTEGER REFERENCES ordenes(id),
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE tickets_soporte (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    cliente_id INTEGER REFERENCES clientes(id),
    categoria VARCHAR(100) NOT NULL,
    prioridad VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    agente VARCHAR(100)
);

-- sample data
-- clientes
INSERT INTO clientes (nombre, ciudad, estado) VALUES
('Ana Garcia','Bogota','Activo'),
('Javier Perez','Medellin','Activo'),
('Luisa Martinez','Cali','Inactivo'),
('Carlos Torres','Bogota','Activo');

-- categorias
INSERT INTO categorias (nombre) VALUES
('Alimentos'),
('Juguetes'),
('Accesorios');

-- productos
INSERT INTO productos (nombre, precio, categoria_id) VALUES
('Croquetas para perro', 50.00, 1),
('Pelota de goma', 10.00, 2),
('Correa ajustable', 20.00, 3);

-- ordenes y detalle
INSERT INTO ordenes (fecha, cliente_id, ciudad, estado, total) VALUES
('2024-01-05',1,'Bogota','Entregada',150.00),
('2024-02-10',2,'Medellin','Pendiente',60.00),
('2024-03-15',1,'Bogota','Cancelada',0.00),
('2024-04-20',3,'Cali','Entregada',80.00);

INSERT INTO detalle_orden (orden_id, producto_id, cantidad, precio_unitario) VALUES
(1,1,2,50.00),
(1,2,1,10.00),
(2,2,3,10.00),
(3,1,1,50.00),
(4,3,4,20.00);

-- tickets de soporte
INSERT INTO tickets_soporte (fecha, cliente_id, categoria, prioridad, estado, agente) VALUES
('2024-01-06',1,'Pago','Alta','Abierto','Laura'),
('2024-02-11',2,'Producto','Media','Cerrado','Miguel'),
('2024-03-16',1,'Entrega','Baja','En Proceso','Ana'),
('2024-04-21',3,'Otros','Alta','Abierto','Carlos');
