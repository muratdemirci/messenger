const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('./errorResponse')
const User = require('../models/User')
const Logger = require('./logger')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1]
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    Logger.log('info', `${req.ip} Not authorized to access this route`)
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)

    Logger.log('info', `${req.ip} token verified!`)
    next()
  } catch (err) {
    Logger.log('error', `${err}`)
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )      
    }
    Logger.log('info', `${req.ip} User role ${req.user.role} is not authorized to access this route`)
    next()
  }
}

exports.currentUser = asyncHandler(async (req, res, next) => {

  try {

    let token
        
    token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const currentUser = await User.findOne({ _id: decoded.id })

    return currentUser
    
  } catch (err) {
    Logger.log('error', `${err}`)
    return new ErrorResponse('Not authorized to access this route', 401)
  }

})
