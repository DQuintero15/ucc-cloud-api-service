import "dotenv/config"

export const env = {
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
  AWS_BUCKET_KEY: process.env.AWS_BUCKET_KEY as string,
  AWS_BUCKET_SECRET: process.env.AWS_BUCKET_SECRET as string,
}
