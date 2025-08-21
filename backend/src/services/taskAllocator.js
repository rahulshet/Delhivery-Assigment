import { pool } from '../db.js';

/** Pick an idle robot with battery > 30; tie-breaker: highest battery. */
export async function chooseRobot() {
  const [rows] = await pool.query(
    "SELECT * FROM robots WHERE status='idle' AND battery_level > 30 ORDER BY battery_level DESC LIMIT 1"
  );
  return rows[0] || null;
}