import { Router } from 'express';

import { productoController }
from '../Controllers/productos.controller.js';

import { upload }
from '../Middlewares/upload.js';

const router = Router();

// ─────────────────────────────────────
// VISTAS
// ─────────────────────────────────────

// Catálogo
router.get(
  '/',
  productoController.getAll
);

// Formulario crear
router.get(
  '/nuevo',
  productoController.nuevo
);

// Detalle producto
router.get(
  '/:id',
  productoController.getById
);

// Formulario editar
router.get(
  '/:id/editar',
  productoController.editar
);

// ─────────────────────────────────────
// CRUD PRODUCTOS
// ─────────────────────────────────────

// Crear producto
router.post(
  '/',
  upload.single('imagen'),
  productoController.create
);

// Actualizar producto
router.put(
  '/:id',
  upload.single('imagen'),
  productoController.update
);

// Eliminar producto
router.delete(
  '/:id',
  productoController.delete
);

export default router;