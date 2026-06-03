import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import productosRoutes from './Routes/productos.routes.js';

import carritoRoutes
from './Routes/carrito.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ─────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────

const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────
// MOTOR DE VISTAS
// ─────────────────────────────────────

app.set('view engine', 'ejs');

app.set(
  'views',
  join(__dirname, 'views')
);

// ─────────────────────────────────────
// ARCHIVOS ESTÁTICOS
// ─────────────────────────────────────

app.use(
  express.static(
    join(__dirname, 'public')
  )
);

// ─────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────

// Formularios HTML
app.use(
  express.urlencoded({
    extended: true
  })
);

// JSON
app.use(express.json());

// ─────────────────────────────────────
// SESIONES
// ─────────────────────────────────────

app.use(session({

  secret: 'ecommerce_secret_key',

  resave: false,

  saveUninitialized: true,

  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}));

// ─────────────────────────────────────
// CARRITO GLOBAL EN SESIÓN
// ─────────────────────────────────────

app.use((req, res, next) => {

  if (!req.session.carrito) {
    req.session.carrito = [];
  }

  // Disponible en todas las vistas
  res.locals.carrito =
    req.session.carrito;

  next();
});

// ─────────────────────────────────────
// METHOD OVERRIDE
// ─────────────────────────────────────

app.use(methodOverride((req) => {

  if (
    req.body &&
    typeof req.body === 'object' &&
    '_method' in req.body
  ) {
    return req.body._method;
  }

  return req.query._method;
}));

// ─────────────────────────────────────
// RUTAS
// ─────────────────────────────────────

app.use(
  '/api/productos',
  productosRoutes
);

app.use(
  '/carrito',
  carritoRoutes
);

// ─────────────────────────────────────
// HOME
// ─────────────────────────────────────

app.get('/', (_, res) => {

  res.redirect('/api/productos');
});

// ─────────────────────────────────────
// MANEJO DE ERRORES
// ─────────────────────────────────────

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).send(
    'Error interno del servidor'
  );
});

// ─────────────────────────────────────
// SERVIDOR
// ─────────────────────────────────────

app.listen(PORT, () => {

  console.log(
    `Servidor en http://localhost:${PORT}`
  );
});