import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM inventory ORDER BY id ASC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { item_name, location, quantity } = req.body;
  if (!item_name || !location) return res.status(400).json({ error: 'Missing fields' });
  const [result] = await pool.query(
    'INSERT INTO inventory (item_name, location, quantity) VALUES (?, ?, ?)',
    [item_name, location, quantity || 0]
  );
  res.json({ id: result.insertId });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, location, quantity } = req.body;
  const fields = []; const values = [];
  if (item_name !== undefined) { fields.push('item_name=?'); values.push(item_name); }
  if (location !== undefined)  { fields.push('location=?'); values.push(location); }
  if (quantity !== undefined)  { fields.push('quantity=?'); values.push(quantity); }
  if (fields.length === 0) return res.status(400).json({ error: 'No fields' });
  values.push(id);
  await pool.query(`UPDATE inventory SET ${fields.join(', ')} WHERE id=?`, values);
  res.json({ ok: true });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM inventory WHERE id=?', [id]);
  res.json({ ok: true });
});

export default router;