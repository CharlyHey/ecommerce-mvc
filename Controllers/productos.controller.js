import { Producto } from '../Models/productos.model.js'

export const productoController = {
  // ── GET /api/productos
  getAll(req, res) {
    const productos = Producto.getAll()
    res.json(productos)
  },

  // ── GET /api/productos/:id
  getById(req, res) {
    const id = parseInt(req.params.id)
    const producto = Producto.getById(id)
    if (!producto) res.status(404).json({ error: 'No encontrado' })
    res.json(producto)
  },

  // ── POST /api/productos
  create(req, res) {
    const { nombre, precio, categoria, stock } = req.body
    if (!nombre || !precio || !categoria || !stock)
      res.status(404).json({ error: 'Faltan datos ' })
    const nuevo = Producto.create({ nombre, precio, categoria, stock })
    res.status(201).json(nuevo)
  },

  // ── PUT /api/productos/:id
  update(req, res) {
    const id = parseInt(req.params.id)
    const actualizado = Producto.update(id, req.body)
    if (!actualizado) res.status(404).json({ error: 'Producto no encontrado' })
    res.status(200).json(actualizado)
  },

  // ── DELETE /api/productos/:id
  delete(req, res) {
    const id = parseInt(req.params.id)
    const eliminado = Producto.delete(id)
    if (!eliminado) res.status(404).json({ error: 'Producto no encontrado' })
    res.status(200).json({ mensaje: 'Eliminado correctamente ' })
  }
}