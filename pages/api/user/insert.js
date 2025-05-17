import { connectToDatabase } from '@/utils/db';

export default async function handler(req, res) {
  const { name, email, image } = req.body;
  const db = await connectToDatabase();
  await db.execute('INSERT INTO users (name, email, image) VALUES (?, ?, ?)', [name, email, image]);
  res.status(200).json({ message: 'User inserted' });
}
