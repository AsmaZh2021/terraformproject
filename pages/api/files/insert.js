import { db } from '@/utils/db';

export default async function handler(req, res) {
  const { filename, s3_key } = req.body;
  try {
    const [rows] = await db.execute(
      'INSERT INTO files (filename, s3_key) VALUES (?, ?)',
      [filename, s3_key]
    );
    res.status(200).json({ insertedId: rows.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}