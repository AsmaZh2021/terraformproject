import { db } from '@/utils/db';

export default async function handler(req, res) {
  try {
    const [files] = await db.execute('SELECT * FROM files');
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}