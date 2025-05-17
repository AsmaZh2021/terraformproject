export default function handler(req, res) {
  res.status(200).json({
    BUCKET: process.env.AWS_S3_BUCKET_NAME|| "asmazhioubucket",
    ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  });
}
