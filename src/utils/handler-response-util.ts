import { Response } from "express"

export const handlerResponseUtil = {
  success: (res: Response, data: any, status = 200) => {
    return res.status(status).json({
      success: true,
      data,
    })
  },

  error: (res: Response, error: any, status = 500) => {
    return res.status(status).json({
      success: false,
      error,
    })
  },
}
