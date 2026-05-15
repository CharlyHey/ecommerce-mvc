import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url'
import path, { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ── Helpers de datos ────────────────────────────
const DB_PATH = join(__dirname, '../db.json');

function leerDB() {
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function escribirDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const Producto = {
  // ── GET /api/productos
  getAll() {
    const db = leerDB();
    return db.productos
  },

  // ── GET /api/productos/:id
  getById(id) {
    const db = leerDB()
    const producto = db.productos.find(
      p => p.id === id
    )
    return producto
  },

  // ── POST /api/productos
  create(data) {
    const db = leerDB();
    const nuevo = {
      id: db.productos.length + 1,
      ...data
    }
    db.productos.push(nuevo);
    escribirDB(db);
    return nuevo
  },

  // ── PUT /api/productos/:id
  update(id, data) {
    const db = leerDB();
    const idx = db.productos.findIndex(
      p => p.id === parseInt(id)
    );
    if (idx === -1) return null
    db.productos[idx] = { ...db.productos[idx], ...data };
    escribirDB(db);
    return db.productos[idx]
  },

  // ── DELETE /api/productos/:id
  delete(id) {
    const db = leerDB();
    const idx = db.productos.findIndex(
      p => p.id === parseInt(id)
    );
    if (idx === -1) return false
    db.productos.splice(idx, 1)
    escribirDB(db);
    return true
  }
}