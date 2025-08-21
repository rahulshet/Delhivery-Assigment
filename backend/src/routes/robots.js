import { Router } from 'express';
import { pool } from '../db.js';
import { auditLog } from '../services/audit.js';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM robots ORDER BY id ASC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { robot_id, location = 'Dock', status = 'idle', battery_level = 100 } = req.body;
  if (!robot_id) return res.status(400).json({ error: 'robot_id required' });
  const [result] = await pool.query(
    'INSERT INTO robots (robot_id, location, status, battery_level) VALUES (?, ?, ?, ?)',
    [robot_id, location, status, battery_level]
  );
  await auditLog({ userId: req.user?.id, action: 'create', entityType: 'robot', entityId: result.insertId, payload: req.body });
  req.io?.emit('robot_created', { id: result.insertId, robot_id, location, status, battery_level });
  res.json({ id: result.insertId });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { location, status, battery_level } = req.body;
  const fields = []; const values = [];
  if (location !== undefined) { fields.push('location=?'); values.push(location); }
  if (status !== undefined) { fields.push('status=?'); values.push(status); }
  if (battery_level !== undefined) { fields.push('battery_level=?'); values.push(battery_level); }
  if (fields.length === 0) return res.status(400).json({ error: 'No fields' });
  values.push(id);
  await pool.query(`UPDATE robots SET ${fields.join(', ')} WHERE id=?`, values);
  await auditLog({ userId: req.user?.id, action: 'update', entityType: 'robot', entityId: Number(id), payload: req.body });
  req.io?.emit('robot_updated', { id: Number(id), ...req.body });
  res.json({ ok: true });
});

export default router;