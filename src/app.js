import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
import ejsMate from 'ejs-mate'
import methodOverride from 'method-override'

import roomRoute from './router/rooms.js'
import personRoute from './router/person.js'
import billRoute from './router/bills.js'
import userRoute from './router/users.js'

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute)
app.use('/room', roomRoute)
app.use('/person', personRoute)
app.use('/bill', billRoute)

app.use('/', (req, res) => {
    res.render('helloworld', { name: 'John Doe' })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})