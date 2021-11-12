const express = require('express')
const path = requiire('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')



//Load config
dotenv.config({ path: './config/config.env' })

//Load DB
connectDB()


const app = express()

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT

app.listen(PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)