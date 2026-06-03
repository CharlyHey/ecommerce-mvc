# 🛍️ Proyecto E-Commerce MVC

Aplicación web de tienda en línea desarrollada con **Node.js**, **Express**, **EJS** y arquitectura **MVC (Modelo - Vista - Controlador)**.

El sistema permite administrar productos, gestionar un carrito de compras y simular un proceso de compra en línea.

---

# 📌 Características

## ✅ CRUD de Productos

* Crear productos
* Editar productos
* Eliminar productos
* Visualizar catálogo
* Visualizar detalle de producto

## ✅ Carrito de Compras

* Agregar productos
* Eliminar productos
* Manejo de cantidades
* Cálculo automático del total

## ✅ Checkout

* Simulación de compra
* Validación de stock
* Descuento automático de inventario
* Vaciado del carrito

## ✅ Historial de Pedidos

* Registro de compras realizadas
* Visualización de pedidos anteriores

## ✅ Manejo de Imágenes

* Subida de imágenes con Multer
* Almacenamiento de rutas en la base de datos

## ✅ Diseño Responsive

* Compatible con dispositivos móviles
* Interfaz adaptable

---

# 🧱 Arquitectura MVC

El proyecto utiliza arquitectura MVC:

```txt
Models/        → Lógica y acceso a datos
Views/         → Vistas EJS
Controllers/   → Lógica de negocio
Routes/        → Definición de rutas
Middleware/    → Middlewares personalizados
public/        → CSS, imágenes y archivos estáticos
```

---

# 🚀 Tecnologías Utilizadas

* Node.js
* Express.js
* EJS
* Express-session
* Multer
* Method-override
* CSS3
* JavaScript

---

# 📂 Instalación

## 1. Clonar repositorio

```bash
git clone <url-del-repositorio>
```

## 2. Instalar dependencias

Con pnpm:

```bash
pnpm install
```

## 3. Ejecutar proyecto

Modo desarrollo:

```bash
pnpm run dev
```

Modo normal:

```bash
pnpm start
```

---

# 🌐 Rutas Principales

## Productos

| Método | Ruta               | Descripción         |
| ------ | ------------------ | ------------------- |
| GET    | /api/productos     | Listar productos    |
| GET    | /api/productos/:id | Ver producto        |
| POST   | /api/productos     | Crear producto      |
| PUT    | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto   |

---

## Carrito

| Método | Ruta                  | Descripción       |
| ------ | --------------------- | ----------------- |
| GET    | /carrito              | Ver carrito       |
| POST   | /carrito/agregar/:id  | Agregar producto  |
| POST   | /carrito/eliminar/:id | Eliminar producto |
| POST   | /carrito/checkout     | Finalizar compra  |

---

## Pedidos

| Método | Ruta             | Descripción          |
| ------ | ---------------- | -------------------- |
| GET    | /carrito/pedidos | Historial de pedidos |

---

# 📦 Funcionalidades Implementadas

* Arquitectura MVC
* CRUD completo
* Validación de stock
* Carrito con sesiones
* Historial de pedidos
* Subida de imágenes
* Diseño responsive
* Checkout simulado

---

# 🔒 Seguridad

* Manejo de sesiones con express-session
* Validaciones backend
* Protección básica de formularios

---

# 📸 Capturas

* Catálogo
* Carrito
* Checkout
* Historial de pedidos

---

# 👨‍💻 Autor

Buitron Arreola Juan Carlos

---

# 📄 Licencia

MIT
