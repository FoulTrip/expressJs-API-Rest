const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

app.use(cors())

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    res.append('Acces-Control-Allow-Origin', ['*']);
    res.append('Acces-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Acces-Control-Allow-Headers', 'Content-Type');
    next()
})

// routes
app.use(require('./src/routes/index'))
app.use('/api/movies', require('./src/routes/Movies'))

app.listen(app.get('port'), () => {
    console.log(`Server in port ${app.get('port')}`)
})