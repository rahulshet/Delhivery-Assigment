import { pool } from '../db.js';

export async function auditLog({ userId, action, entityType, entityId, payload }) {
  try {
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, entity_type, entity_id, payload) VALUES (?, ?, ?, ?, ?)',
      [userId || null, action, entityType, entityId || null, payload ? JSON.stringify(payload) : null]
    );
  } catch (e) {
    console.error('Audit log failed', e.message);
  }
}