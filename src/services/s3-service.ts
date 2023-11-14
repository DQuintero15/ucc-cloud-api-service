import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

import { env } from "../config"

export class S3Service {
  private readonly s3: S3Client

  constructor() {
    this.s3 = new S3Client({
      region: env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: env.AWS_BUCKET_KEY,
        secretAccessKey: env.AWS_BUCKET_SECRET,
      },
    })
  }

  public async uploadFile(path: string, file: Buffer) {
    const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: this.concatTimestamp(path),
      Body: file,
    }

    const command = new PutObjectCommand(uploadParams)
    return await this.s3.send(command)
  }

  public concatTimestamp(path: string) {
    const timestamp = new Date().getTime()
    const [name, ext] = path.split(".")
    return `${name}-${timestamp}.${ext}`
  }

  public async filesList() {
    const params = {
      Bucket: env.AWS_BUCKET_NAME,
    }
    const command = new ListObjectsCommand(params)
    const { Contents } = await this.s3.send(command)
    return Contents ?? []
  }

  public async fileDelete(key: string) {
    const params = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }
    const command = new DeleteObjectCommand(params)
    return await this.s3.send(command)
  }

  public async fileDownload(key: string) {
    const params = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }
    const command = new GetObjectCommand(params)
    const { Body } = await this.s3.send(command)
    if (!Body) {
      return null
    }

    return await Body.transformToByteArray()
  }
}
