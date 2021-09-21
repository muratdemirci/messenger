const express = require('express')
const {
  blockUserByUsername,
  unBlockUserByUsername
} = require('../../controllers/users')

const router = express.Router()
const validation = require('../../middleware/validate')
const { usrBlockSchema, usrUnblockSchema } = require('../../validations/user')
const { protect, authorize } = require('../../middleware/auth')


router
.route('/block/:susname')
.post(protect, authorize('user', 'deusmur'), validation(usrBlockSchema), blockUserByUsername)

router
.route('/unblock/:susname')
.post(protect, authorize('user', 'deusmur'), validation(usrUnblockSchema), unBlockUserByUsername)

module.exports = router