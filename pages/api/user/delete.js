import { db } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.body;
  try {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}