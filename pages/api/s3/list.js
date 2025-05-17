import s3 from '@/utils/s3';

export default async function handler(req, res) {
  const data = await s3.listObjectsV2({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
  }).promise();

  const files = data.Contents.map(file => ({
    key: file.Key,
    lastModified: file.LastModified,
  }));

  res.status(200).json(files);
}
