import s3 from '@/utils/s3';

export default async function handler(req, res) {
  const { key } = req.body;
  try {
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise();
    res.status(200).json({ message: 'Objet S3 supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}