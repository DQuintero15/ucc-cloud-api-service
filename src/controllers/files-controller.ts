import { Request, Response } from "express"

import { multerMiddleware } from "../middlewares"
import { S3Service } from "../services"
import { handlerResponseUtil } from "../utils"

export class FilesController {
  constructor(private readonly s3Service: S3Service) {}

  public list = async (req: Request, res: Response) => {
    try {
      const files = await this.s3Service.filesList()
      handlerResponseUtil.success(res, files)
    } catch (error) {
      handlerResponseUtil.error(res, error)
    }
  }

  public download = async (req: Request, res: Response) => {
    try {
      const { key } = req.params
      const file = await this.s3Service.fileDownload(key)
      if (!file) {
        handlerResponseUtil.error(res, "File not found", 404)
        return
      }
      res.setHeader("Content-Type", "application/octet-stream")
      res.setHeader("Content-Disposition", `attachment; filename=${key}`)
      res.attachment(key)
      res.status(200).send(file)
      return
    } catch (error) {
      handlerResponseUtil.error(res, error)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { key } = req.params
      await this.s3Service.fileDelete(key)
      handlerResponseUtil.success(res, true)
    } catch (error) {
      handlerResponseUtil.error(res, error)
    }
  }

  public upload = (req: Request, res: Response) => {
    try {
      multerMiddleware(req, res, async () => {
        const { file } = req

        if (!file) {
          handlerResponseUtil.error(res, "File not found", 400)
          return
        }

        const { originalname, buffer } = file
        await this.s3Service.uploadFile(originalname, buffer)

        handlerResponseUtil.success(res, true)
      })
    } catch (error) {
      handlerResponseUtil.error(res, error)
    }
  }
}
