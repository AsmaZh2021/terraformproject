import { connectToDatabase } from '@/utils/db';

export default async function handler(req, res) {
  const { email } = req.body;
  const db = await connectToDatabase();
  await db.execute('DELETE FROM users WHERE email = ?', [email]);
  res.status(200).json({ message: 'User deleted' });
}
