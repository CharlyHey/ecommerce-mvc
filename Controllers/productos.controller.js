import { Producto } from '../Models/productos.model.js'

export const productoController = {
  // ── GET /api/productos
  getAll(req, res) {
    const productos = Producto.getAll()
    const { mensaje } = req.query
    res.render('index', { productos, mensaje })
    // res.json(productos)
  },

  // ── GET /api/productos/nuevo
  nuevo(req, res) {
    res.render('new', {})
  },

  // ── GET /api/productos/:id
  getById(req, res) {
    const id = parseInt(req.params.id)
    const producto = Producto.getById(id)
    // if (!producto) res.status(404).json({ error: 'No encontrado' })
    if (!producto) return res.status(404).render('index', {
      productos: Producto.getAll(),
      error: 'Producto no encontrado'
    })
    // res.json(producto)
    res.render('show', { producto })
  },

  // ── GET /api/productos/:id/editar
  editar(req, res) {
    const id = parseInt(req.params.id)
    const producto = Producto.getById(id)
    if (!producto) return res.redirect('/api/productos')
    res.render('edit', { producto })
  },

  // ── POST /api/productos
  create(req, res) {
    const { nombre, precio, categoria, stock } = req.body
    //if (!nombre || !precio || !categoria || !stock)
    //  res.status(404).json({ error: 'Faltan datos ' })
    // const nuevo = Producto.create({ nombre, precio, categoria, stock })
    // res.status(201).json(nuevo)
    if (!nombre || !precio || !categoria || !stock) {
      return res.status(400).render('new', {
        error: 'Todos los campos son obligatorios',
        datos: req.body
      })
    }
    Producto.create({
      nombre,
      precio: parseFloat(precio),
      categoria,
      stock: parseInt(stock)
    })
    res.redirect('/api/productos?mensaje=Producto creado correctamente')
  },

  // ── PUT /api/productos/:id
  update(req, res) {
    const id = parseInt(req.params.id)
    // const actualizado = Producto.update(id, req.body)
    // if (!actualizado) res.status(404).json({ error: 'Producto no encontrado' })
    // res.status(200).json(actualizado)
    const actualizado = Producto.update(id, {
      nombre: req.body.nombre,
      precio: parseFloat(req.body.precio),
      categoria: req.body.categoria,
      stock: parseInt(req.body.stock)
    })
    if (!actualizado) {
      const producto = Producto.getById(id)
      return res.status(404).render('edit', {
        producto,
        error: 'No se pudo actualizar el producto'
      })
    }
    res.redirect(`/api/productos/${id}`)
  },

  // ── DELETE /api/productos/:id
  delete(req, res) {
    const id = parseInt(req.params.id)
    // const eliminado = Producto.delete(id)
    // if (!eliminado) res.status(404).json({ error: 'Producto no encontrado' })
    // res.status(200).json({ mensaje: 'Eliminado correctamente ' })
    const eliminado = Producto.delete(id)
    if (!eliminado) return res.redirect('/api/productos')
    res.redirect('/api/productos?mensaje=Producto eliminado correctamente')
  }
}