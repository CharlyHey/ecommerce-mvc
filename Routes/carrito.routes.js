import { Router }
from 'express';

import { carritoController }
from '../Controllers/carrito.controller.js';

const router = Router();

// Ver carrito
router.get(
  '/',
  carritoController.verCarrito
);

// Agregar producto
router.post(
  '/agregar/:id',
  carritoController.agregar
);

// Eliminar producto
router.post(
  '/eliminar/:id',
  carritoController.eliminar
);

// Proceso de compra
router.post(
    '/checkout',
    carritoController.checkout
);

router.get(
    '/pedidos',
    carritoController.verPedidos
);

export default router;