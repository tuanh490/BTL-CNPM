import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

import roomRoute from './router/room'
import householdRoute from './router/household'
import personRoute from './router/person'
import billRoute from './router/bill'
import userRoute from './router/user'

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.use('/', userRoute)
app.use('/room', roomRoute)
app.use('/household', householdRoute)
app.use('/person', personRoute)
app.use('/bill', billRoute)


app.use('/', (req, res) => {
    res.json({ name: "John Doe" })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})