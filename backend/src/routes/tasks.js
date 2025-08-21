import { Router } from 'express';
import { pool } from '../db.js';
import { chooseRobot } from '../services/taskAllocator.js';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { description, item_id, from_location, to_station } = req.body;
  if (!description || !from_location || !to_station) return res.status(400).json({ error: 'Missing fields' });

  // Create task as pending
  const [result] = await pool.query(
    'INSERT INTO tasks (description, item_id, from_location, to_station, status) VALUES (?, ?, ?, ?, "pending")',
    [description, item_id || null, from_location, to_station]
  );

  // Try to auto-assign
  const robot = await chooseRobot();
  if (robot) {
    await pool.query('UPDATE tasks SET status="assigned", robot_assigned=? WHERE id=?', [robot.id, result.insertId]);
    await pool.query('UPDATE robots SET status="busy" WHERE id=?', [robot.id]);
    req.io?.emit('task_assigned', { taskId: result.insertId, robotId: robot.id });
  }

  res.json({ id: result.insertId, assigned_robot: robot ? robot.id : null });
});

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending','assigned','in_progress','completed','failed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  // When completed, free robot
  const [[task]] = await pool.query('SELECT * FROM tasks WHERE id=?', [id]);
  await pool.query('UPDATE tasks SET status=? WHERE id=?', [status, id]);
  if (status === 'completed' && task?.robot_assigned) {
    await pool.query('UPDATE robots SET status="idle" WHERE id=?', [task.robot_assigned]);
  }
  res.json({ ok: true });
});

export default router;