import { Producto }
from '../Models/productos.model.js';

import { Pedido }
from '../Models/pedidos.model.js';

export const carritoController = {

  // ─────────────────────────────────
  // VER CARRITO
  // ─────────────────────────────────

  verCarrito(req, res) {

    const carrito =
      req.session.carrito || [];

    let total = 0;

    carrito.forEach(item => {

      total +=
        item.precio * item.cantidad;
    });

    res.render('carrito', {
      carrito,
      total
    });
  },

  // ─────────────────────────────────
  // AGREGAR PRODUCTO
  // ─────────────────────────────────

  agregar(req, res) {

    const id =
      parseInt(req.params.id);

    const producto =
      Producto.getById(id);

    if (!producto) {

      return res.redirect(
        '/api/productos?error=Producto no encontrado'
      );
    }

    // Validar stock

    if (producto.stock <= 0) {

      return res.redirect(
        '/api/productos?error=Producto agotado'
      );
    }

    // Buscar si ya existe

    const carrito =
      req.session.carrito;

    const existente =
      carrito.find(
        item => item.id === id
      );

    if (existente) {

      // Validar stock

      if (
        existente.cantidad >=
        producto.stock
      ) {

        return res.redirect(
          '/api/productos?error=Stock insuficiente'
        );
      }

      existente.cantidad++;

    } else {

      carrito.push({

        id: producto.id,

        nombre: producto.nombre,

        precio: producto.precio,

        imagen: producto.imagen,

        cantidad: 1
      });
    }

    res.redirect('/carrito');
  },

  // ─────────────────────────────────
  // ELIMINAR PRODUCTO
  // ─────────────────────────────────

  eliminar(req, res) {

    const id =
      parseInt(req.params.id);

    req.session.carrito =
      req.session.carrito.filter(
        item => item.id !== id
      );

    res.redirect('/carrito');
  },

  // ─────────────────────────────
  // CHECKOUT
  // ─────────────────────────────

  checkout(req, res) {

    const carrito =
      req.session.carrito;

    // Validar vacío

    if (!carrito || carrito.length === 0) {

        return res.redirect(
            '/carrito'
        );
    }

    // Validar stock

    for (const item of carrito) {

        const producto =
            Producto.getById(item.id);

        if (!producto) {

            return res.redirect(
                '/carrito'
            );
        }

        if (
            item.cantidad >
            producto.stock
        ) {

          return res.redirect(
            '/carrito'
          );
        }
    }

    // Calcular total

    let total = 0;

    carrito.forEach(item => {

      total +=
        item.precio * item.cantidad;
    });

    // Descontar stock

    carrito.forEach(item => {

        Producto.updateStock(
            item.id,
            item.cantidad
        );
    });

    // Crear pedido

    Pedido.create({

      productos: carrito,

      total
    });

    // Vaciar carrito

    req.session.carrito = [];

    // Redirigir

    res.redirect(
      '/carrito/pedidos?mensaje=Compra realizada correctamente'
    );
  }, 

  // ─────────────────────────────
  // HISTORIAL PEDIDOS
  // ─────────────────────────────

  verPedidos(req, res) {

    const pedidos =
      Pedido.getAll();

    res.render(
      'pedidos',
      {
        pedidos,
        mensaje: req.query.mensaje
      }
    );
 }

}