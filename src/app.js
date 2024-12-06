import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
import ejsMate from 'ejs-mate'

import roomRoute from './router/room.js'
import householdRoute from './router/household.js'
import personRoute from './router/person.js'
import billRoute from './router/bill.js'
import userRoute from './router/user.js'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', userRoute)
app.use('/room', roomRoute)
app.use('/household', householdRoute)
app.use('/person', personRoute)
app.use('/bill', billRoute)

app.use('/', (req, res) => {
    res.render('helloworld', { name: 'John Doe' })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})