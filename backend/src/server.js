import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { pool } from './db.js';
import { authRequired } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import robotsRoutes from './routes/robots.js';
import tasksRoutes from './routes/tasks.js';
import inventoryRoutes from './routes/inventory.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.ORIGIN?.split(',') || ['http://localhost:5173'] }
});

app.use((req, _res, next) => { req.io = io; next(); });
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN?.split(',') || ['http://localhost:5173'] }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/robots', authRequired, robotsRoutes);
app.use('/api/tasks', authRequired, tasksRoutes);
app.use('/api/inventory', authRequired, inventoryRoutes);

const port = Number(process.env.PORT || 3026);
server.listen(port, () => {
  console.log('Server listening on port', port);
});