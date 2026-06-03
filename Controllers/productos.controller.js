import { Producto } from '../Models/productos.model.js';

export const productoController = {

  // ─────────────────────────────────────
  // GET /api/productos
  // Mostrar catálogo
  // ─────────────────────────────────────
  getAll(req, res) {

    const productos = Producto.getAll();

    const { mensaje, error } = req.query;

    res.render('index', {
      productos,
      mensaje,
      error
    });
  },

  // ─────────────────────────────────────
  // GET /api/productos/nuevo
  // Formulario nuevo producto
  // ─────────────────────────────────────
  nuevo(req, res) {

    res.render('new', {
      error: null,
      datos: {}
    });
  },

  // ─────────────────────────────────────
  // GET /api/productos/:id
  // Detalle producto
  // ─────────────────────────────────────
  getById(req, res) {

    const id = parseInt(req.params.id);

    const producto = Producto.getById(id);

    if (!producto) {

      return res.status(404).render('index', {
        productos: Producto.getAll(),
        error: 'Producto no encontrado'
      });
    }

    res.render('show', { producto });
  },

  // ─────────────────────────────────────
  // GET /api/productos/:id/editar
  // Formulario editar
  // ─────────────────────────────────────
  editar(req, res) {

    const id = parseInt(req.params.id);

    const producto = Producto.getById(id);

    if (!producto) {
      return res.redirect('/api/productos?error=Producto no encontrado');
    }

    res.render('edit', {
      producto,
      error: null
    });
  },

  // ─────────────────────────────────────
  // POST /api/productos
  // Crear producto
  // ─────────────────────────────────────
  create(req, res) {

    const {
      nombre,
      descripcion,
      precio,
      categoria,
      stock
    } = req.body;

    // Imagen
    const imagen = req.file
      ? `/uploads/${req.file.filename}`
      : '';

    // ── Validaciones ─────────────────

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      stock === undefined
    ) {

      return res.status(400).render('new', {
        error: 'Todos los campos son obligatorios',
        datos: req.body
      });
    }

    if (parseFloat(precio) <= 0) {

      return res.status(400).render('new', {
        error: 'El precio debe ser mayor a 0',
        datos: req.body
      });
    }

    if (parseInt(stock) < 0) {

      return res.status(400).render('new', {
        error: 'El stock no puede ser negativo',
        datos: req.body
      });
    }

    // ── Crear producto ─────────────────

    Producto.create({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      stock: parseInt(stock),
      imagen
    });

    res.redirect(
      '/api/productos?mensaje=Producto creado correctamente'
    );
  },

  // ─────────────────────────────────────
  // PUT /api/productos/:id
  // Actualizar producto
  // ─────────────────────────────────────
  update(req, res) {

    const id = parseInt(req.params.id);

    const producto = Producto.getById(id);

    if (!producto) {

      return res.redirect(
        '/api/productos?error=Producto no encontrado'
      );
    }

    const {
      nombre,
      descripcion,
      precio,
      categoria,
      stock
    } = req.body;

    // Imagen opcional
    const imagen = req.file
      ? `/uploads/${req.file.filename}`
      : producto.imagen;

    // ── Validaciones ─────────────────

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoria ||
      stock === undefined
    ) {

      return res.status(400).render('edit', {
        producto,
        error: 'Todos los campos son obligatorios'
      });
    }

    if (parseFloat(precio) <= 0) {

      return res.status(400).render('edit', {
        producto,
        error: 'Precio inválido'
      });
    }

    if (parseInt(stock) < 0) {

      return res.status(400).render('edit', {
        producto,
        error: 'Stock inválido'
      });
    }

    // ── Actualizar ─────────────────

    Producto.update(id, {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      stock: parseInt(stock),
      imagen
    });

    res.redirect(`/api/productos/${id}`);
  },

  // ─────────────────────────────────────
  // DELETE /api/productos/:id
  // Eliminar producto
  // ─────────────────────────────────────
  delete(req, res) {

    const id = parseInt(req.params.id);

    const eliminado = Producto.delete(id);

    if (!eliminado) {

      return res.redirect(
        '/api/productos?error=No se pudo eliminar'
      );
    }

    res.redirect(
      '/api/productos?mensaje=Producto eliminado correctamente'
    );
  }
};