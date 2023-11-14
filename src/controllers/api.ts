import { Application } from "express"

import { S3Service } from "../services"
import { CommonController } from "./common-controller"
import { FilesController } from "./files-controller"

const s3Service = new S3Service()
const filesController = new FilesController(s3Service)

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api/files", filesController.list)
  app.get("/api/files/:key", filesController.download)
  app.post("/api/upload", filesController.upload)
  app.delete("/api/files/:key", filesController.delete)
  app.get("*", CommonController.notFound)
}
