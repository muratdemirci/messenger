'use strict'

const initServer = require('./src/api/mind')

require('dotenv').config()

const start = async () => {
    try {
        await initServer()
    } catch (error) {
        console.error(error)
    }
}

start()