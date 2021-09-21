const express = require('express')
const {
  register,
  login,
  logout,
  getMe
} = require('../../controllers/auth')

const router = express.Router()
const validation = require('../../middleware/validate')
const { usrRegisterSchema, usrLoginSchema } = require('../../validations/user')
const { protect, authorize } = require('../../middleware/auth')

router.post('/register', validation(usrRegisterSchema), register)
router.post('/login', validation(usrLoginSchema), login)
router.get('/logout', logout)
router.get('/me', protect, authorize('user', 'deusmur'), getMe)

module.exports = router
