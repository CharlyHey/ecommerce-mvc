import {
  readFileSync,
  writeFileSync
} from 'fs';

import {
  fileURLToPath
} from 'node:url';

import {
  dirname,
  join
} from 'node:path';

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  dirname(__filename);

// ─────────────────────────────

const DB_PATH =
  join(__dirname, '../db.json');

// ─────────────────────────────

function leerDB() {

  return JSON.parse(
    readFileSync(DB_PATH, 'utf-8')
  );
}

function escribirDB(data) {

  writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2)
  );
}

// ─────────────────────────────

export const Pedido = {

  // Obtener todos

  getAll() {

    const db = leerDB();

    return db.pedidos;
  },

  // Crear pedido

  create(data) {

    const db = leerDB();

    const nuevoPedido = {

      id:
        db.pedidos.length + 1,

      fecha:
        new Date().toLocaleString(),

      ...data
    };

    db.pedidos.push(
      nuevoPedido
    );

    escribirDB(db);

    return nuevoPedido;
    
  }

};