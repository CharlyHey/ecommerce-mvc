import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import path, { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Ruta DB ────────────────────────────
const DB_PATH = join(__dirname, '../db.json');

// ── Helpers ────────────────────────────
function leerDB() {
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function escribirDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const Producto = {

  // ── Obtener todos ────────────────────────────
  getAll() {
    const db = leerDB();
    return db.productos;
  },

  // ── Obtener por ID ────────────────────────────
  getById(id) {
    const db = leerDB();

    return db.productos.find(
      p => p.id === parseInt(id)
    );
  },

  // ── Crear producto ────────────────────────────
  create(data) {
    const db = leerDB();

    // Generar ID único
    const nuevoId = db.productos.length > 0
      ? Math.max(...db.productos.map(p => p.id)) + 1
      : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock),
      categoria: data.categoria,
      imagen: data.imagen || '',
      createdAt: new Date().toISOString()
    };

    db.productos.push(nuevoProducto);

    escribirDB(db);

    return nuevoProducto;
  },

  // ── Actualizar producto ────────────────────────────
  update(id, data) {
    const db = leerDB();

    const idx = db.productos.findIndex(
      p => p.id === parseInt(id)
    );

    if (idx === -1) return null;

    db.productos[idx] = {
      ...db.productos[idx],
      ...data,
      precio: data.precio
        ? parseFloat(data.precio)
        : db.productos[idx].precio,

      stock: data.stock
        ? parseInt(data.stock)
        : db.productos[idx].stock
    };

    escribirDB(db);

    return db.productos[idx];
  },

  // ── Eliminar producto ────────────────────────────
  delete(id) {
    const db = leerDB();

    const idx = db.productos.findIndex(
      p => p.id === parseInt(id)
    );

    if (idx === -1) return false;

    db.productos.splice(idx, 1);

    escribirDB(db);

    return true;
  },

  // ─────────────────────────────
  // ACTUALIZAR STOCK
  // ─────────────────────────────

  updateStock(id, cantidad) {

    const db = leerDB();

    const producto =
      db.productos.find(
        p => p.id === parseInt(id)
      );

    if (!producto) return null;

    producto.stock -= cantidad;

    escribirDB(db);

    return producto;
  },

  // ── Validar stock ────────────────────────────
  validarStock(id, cantidad) {
    const producto = this.getById(id);

    if (!producto) return false;

    return producto.stock >= cantidad;
  },

  // ── Descontar stock ────────────────────────────
  descontarStock(id, cantidad) {
    const db = leerDB();

    const producto = db.productos.find(
      p => p.id === parseInt(id)
    );

    if (!producto) return null;

    producto.stock -= cantidad;

    escribirDB(db);

    return producto;
  }

};