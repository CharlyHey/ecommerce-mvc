import express from 'express';
import methodOverride from 'method-override'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import productodRoutes from './Routes/productos.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();

// ── Motor de vistas ────────────────────────────────
app.set('view engine', 'ejs') // Indicamos a Express qué motor de plantillas usar (ejs)
app.set('views', join(__dirname, 'views')) // Define la carpeta donde Express buscará las vistas

// ── Archivos estáticos ─────────────────────────────
app.use(express.static(join(__dirname, 'public'))) // Monta la carpeta public/ como servidor de archivos estáticos. 
// Todo lo que esté aquí (CSS, imágenes, JS del cliente) queda accesible directamente desde el navegador. 

// ── Middlewares ────────────────────────────────────
app.use(express.urlencoded({ extended: true })) // Parsea el body de los formularios HTML 
// Sin esto, req.body llega vacío y no se pueden leer los campos del formulario. 
// extended: true permite valores anidados como objetos o arrays.
app.use(express.json()) // Parsea body en formato JSON

// ── Method Override (PUT/DELETE desde forms HTML) ──
// Soporta ?_method=PUT en la query string
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    return req.body._method
  }
  return req.query._method
}))
// methodOverride: Resuelve una limitación del HTML: los formularios solo soportan GET y POST, nunca PUT ni DELETE. 
// Este middleware inspecciona cada petición entrante y, si encuentra un campo _method, sustituye el método real de 
// la petición por ese valor antes de que llegue al router.

// ── Rutas ──────────────────────────────────────────
app.use('/api/productos', productodRoutes)

// ── Ruta raíz → redirige al listado ───────────────
app.get('/', (_, res) => res.redirect('/api/productos'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});