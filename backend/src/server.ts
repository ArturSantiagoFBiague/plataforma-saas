// backend/src/server.ts
import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

export default app