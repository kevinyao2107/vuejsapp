import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import unploadRoute from './routes/unploadRoute.js';
import operationRoute from './routes/operationRoutes.js';

const app = express();
dotenv.config();
db();

app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', unploadRoute);
app.use('/api/operation', operationRoute);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Api envoyé');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`application lancé au ${PORT}`);
});
