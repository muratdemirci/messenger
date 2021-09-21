const express = require('express')
const {
    sendMessage,
    getMessages,
    findMsgsBtwDates,
    getUnreadMessages
} = require('../../controllers/messages')
// buraya valid
const router = express.Router()
const validation = require('../../middleware/validate')
const { msgSchema, msgFindBtwDatesSchema }  = require('../../validations/message')
const { protect, authorize } = require('../../middleware/auth')


router
  .route('/')
  .get(protect, authorize('user', 'deusmur'), getMessages)
  .post(protect, authorize('user', 'deusmur'), validation(msgSchema), sendMessage)
  
router
  .route('/find/:startsAt/:endsAt')
  .get(protect, authorize('user', 'deusmur'), validation(msgFindBtwDatesSchema), findMsgsBtwDates)

router
  .route('/unread')
  .get(protect, authorize('user', 'deusmur'), getUnreadMessages)


module.exports = router