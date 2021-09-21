'use strict'

const createServer = async () => {
    // mind patch check if process.env.api_url == fs.existsSync(folderName)
    // than define const api url
    const express = require('express')    
    const morgan = require('morgan')
    const colors = require('colors')
    const cookieParser = require('cookie-parser')
    const mongoSanitize = require('express-mongo-sanitize')
    const helmet = require('helmet')
    const xss = require('xss-clean')
    const rateLimit = require('express-rate-limit')
    const hpp = require('hpp')
    const cors = require('cors')
    const compression = require('compression')
    const errorHandler = require('../api/v1/middleware/error')
    const logger = require('../api/v1/middleware/logger')
    const connectDB = require('../config/db')
    // Connect to database
    connectDB()
    // Route files
    const auth = require('../api/v1/routes/auth')
    const messages = require('../api/v1/routes/messages')
    const users = require('../api/v1/routes/users')
    const app = express()
    const apiUrl = process.env.API_URL || '/api/v1'
    // Body parser, need these for POST and PUT request
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // Cookie parser
    app.use(cookieParser())
    // compress all responses
    app.use(compression())
    // Dev logging middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))        
        logger.log('info', `Winston Logger initiated`)
    }
    // Sanitize data
    app.use(mongoSanitize())
    // Set security headers
    app.use(helmet())
    // Prevent XSS attacks
    app.use(xss())
    // Rate limiting
    const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
    });
    app.use(limiter)
    // Prevent http param pollution
    app.use(hpp())
    // Enable CORS
    app.use(cors())
    // Mount routers use path
    app.use(`${apiUrl}/users`, users)
    app.use(`${apiUrl}/messages`, messages)
    app.use(`${apiUrl}/auth`, auth)
    app.use(errorHandler)

    const PORT = process.env.PORT || 5000

    const server = app.listen(
        PORT,
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
        ),
        console.log(            `

        ██   ██ ███████ ██████  ███    ███ ███████ ███████      ██████  ███    ██ ██      ██ ███    ██ ███████ 
        ██   ██ ██      ██   ██ ████  ████ ██      ██          ██    ██ ████   ██ ██      ██ ████   ██ ██      
        ███████ █████   ██████  ██ ████ ██ █████   ███████     ██    ██ ██ ██  ██ ██      ██ ██ ██  ██ █████   
        ██   ██ ██      ██   ██ ██  ██  ██ ██           ██     ██    ██ ██  ██ ██ ██      ██ ██  ██ ██ ██      
        ██   ██ ███████ ██   ██ ██      ██ ███████ ███████      ██████  ██   ████ ███████ ██ ██   ████ ███████                                                                                                                                                                                  
      `.green.bold)
    )
}

module.exports = createServer