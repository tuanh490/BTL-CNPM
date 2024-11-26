import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.use('/', (req, res) => {
    res.json({ name: "John Doe" })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})