import express from 'express';
import productodRoutes from './Routes/productos.routes.js'

const app = express();

app.use(express.json()) // Middleware

app.use('/api/productos', productodRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});