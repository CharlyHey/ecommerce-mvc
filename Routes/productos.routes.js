import { productoController } from '../Controllers/productos.controller.js'
import { Router } from 'express'

const router = Router()

// ── Vistas ─────────────────────────────────────────
router.get('/', productoController.getAll)   // Listado
router.get('/nuevo', productoController.nuevo)    // Formulario crear
router.get('/:id', productoController.getById)  // Detalle
router.get('/:id/editar', productoController.editar)   // Formulario editar

// ── Operaciones (con method-override) ─────────────
router.post('/', productoController.create)   // Crear
router.put('/:id', productoController.update)   // Actualizar
router.delete('/:id', productoController.delete)   // Eliminar

/*
Estas sentencias iban antes de incorporar vistas
router.get('/', productoController.getAll)
router.get('/:id', productoController.getById)
router.post('/', productoController.create)
router.put('/:id', productoController.update)
router.delete('/:id', productoController.delete)*/

export default router