import express from "express"
import morgan from "morgan"

import { loadApiEndpoints } from "./controllers/api"

// Create Express server
const app = express()

// Express configuration
app.set("port", process.env.PORT ?? 3000)
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))

loadApiEndpoints(app)

export default app
