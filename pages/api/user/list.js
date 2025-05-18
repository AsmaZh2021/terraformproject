import { db } from '@/utils/db';

export default async function handler(req, res) {
  try {
    const [users] = await db.execute('SELECT * FROM users');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
