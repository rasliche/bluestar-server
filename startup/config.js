const bodyParser = require('body-parser')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')

module.exports = function (app) {
    app.use(helmet())
    if (config.util.getEnv('NODE_ENV') === 'development') {
        app.use(morgan('dev'))
    }

    app.use(bodyParser.json())
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        next()
    })
}
