import { Request, Response } from "express"

import { handlerResponseUtil } from "../utils"

export class CommonController {
  public static notFound(req: Request, res: Response): void {
    handlerResponseUtil.error(res, "Not found", 404)
  }
}
