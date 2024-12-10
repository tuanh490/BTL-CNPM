import 'dotenv/config'
import express from "express"
import path from "path"
import { fileURLToPath } from "url";
import ejsMate from 'ejs-mate'
import methodOverride from 'method-override'

import roomRoute from './router/rooms.js'
import personRoute from './router/person.js'
import billRoute from './router/bills.js'
import userRoute from './router/users.js'

import ExpressError from './utils/ExpressError.js'
import { getItem } from './database.js';

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Test mysql 
app.use('/getItem', async (req, res) => {
    const age = req.body.age;
    const item = await getItem(age);
    res.send(item)
})

app.use('/quy_dinh', (req, res) => {
    res.render('quy_dinh')
})

app.use('/tra_cuu', (req, res) => {
    res.render('tra_cuu')
})

app.use('/bills', billRoute)
app.use('/rooms', roomRoute)
app.use('/person', personRoute)

app.use('/', userRoute)

app.get('/', (req, res) => {
    res.render('index');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong!';
    const preErrorUrl = req._parsedOriginalUrl?.pathname || 'Unknown URL';

    if (req.accepts('json')) {
        res.status(statusCode).json({
            error: {
                message: err.message,
                status: statusCode,
                path: preErrorUrl
            }
        });
    } else {
        res.status(statusCode).send({ err, preErrorUrl });
    }
});


app.listen(3000, () => {
    console.log("Listening on port 3000")
})