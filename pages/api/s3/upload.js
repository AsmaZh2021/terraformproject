import s3 from '@/utils/s3';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const { name, type } = req.body;
  const fileName = `${uuidv4()}-${name}`;

  const BUCKET_NAME = "asmazhioubucket";

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: type,
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ uploadUrl, key: fileName });
  } catch (error) {
    console.error("Erreur upload S3:", error);
    res.status(500).json({ error: "Erreur serveur - échec de génération de l'URL" });
  }
}
