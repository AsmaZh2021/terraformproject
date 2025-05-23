import { db } from '@/utils/db';

export default async function handler(req, res) {
  const { name, email, image } = req.body;

  try {
    const [rows] = await db.execute(
      'INSERT INTO users (name, email, image) VALUES (?, ?, ?)',
      [name, email, image]
    );

    res.status(200).json({ insertedId: rows.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
