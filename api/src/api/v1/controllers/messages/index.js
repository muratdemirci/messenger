const ErrorResponse = require('../../middleware/errorResponse')
const asyncHandler = require('../../middleware/async')
const Message = require('../../models/Message')
const User = require('../../models/User')
const moment = require('moment')
const { currentUser } = require('../../middleware/auth')
const Logger = require('../../middleware/logger')

// @desc      Send message
// @route     POST /api/v1/messages
// @access    Private/Authenticated-User
exports.sendMessage = asyncHandler(async (req, res, next) => {  
    try {
      const sender = await currentUser(req)
      const receiver = await User.findOne({ username: req.body.sendMsgTo })
      let visible;

      var isBlocked = receiver.blacklist.some(function (suspect) {
        return suspect.equals(sender._id);
      })

      //while message sender or receiver is blocked, set visible false
      if (isBlocked) {
        // if users are blocked send 403
        visible = false
        next(new ErrorResponse('Could not send message', 403))
        Logger.log('info', `Could not send message`)
      }else{
        res.status(200).json({
          success: true,
          data: `Your message has been sent to ${receiver.username}`
        })
        Logger.log('info', `${sender.username} sent message to ${receiver.username}`)
      }

      const newMessage = {
        senderId: sender._id,
        receiverId: receiver._id,
        visible: visible,
        text: req.body.text
      }

      await Message.create(newMessage)

    } catch (error) {
      Logger.log('error', `${sender._id} could not send message`)
      return next(new ErrorResponse('Could not send message', 500))
    }

  })

// @desc      Get all messages
// @route     GET /api/v1/messages
// @access    Private/Authenticated-User
exports.getMessages = asyncHandler(async (req, res, next) => {

  try {
    const receiver = await currentUser(req)

    const messages = await Message.find({ 
      $or: [
        { 'senderId': receiver._id.toString()},
        { 'receiverId': receiver._id.toString()}
      ],
      visible: true
    })
    .sort({'createdAt': 'desc'})

    const conversation = messages
    .map(msg =>       
      ({
        "text": msg.text,
        "sendAt": moment(msg.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      }))

    res.status(200).json({
      success: true,
      data: conversation
    })
    Logger.log('info', `${receiver._id} gets all messages`)
  } catch (err) {
    Logger.log('error', `${err}`)
    return next(new ErrorResponse('Could not found a messages', 500))
  }
  
})


// @desc      Find a messages between dateranges
// @route     POST /api/v1/messages/find/:startsAt/:endsAt
// @date-format 2021-09-18 00:00:00 / 2021-09-19 06:17:00
// @access    Private/Authenticated-User
exports.findMsgsBtwDates = asyncHandler(async (req, res, next) => {
  try {

    const receiver = await currentUser(req)
    const startDate = moment(req.params.startsAt).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    const endDate   = moment(req.params.endsAt).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ")

    const messages = await Message.find({
      $or: [
        { 'senderId': receiver._id.toString()},
        { 'receiverId': receiver._id.toString()}
      ],
      createdAt: {
        $gte: startDate,
        $lte: endDate
      },
      visible: true
    })
    .sort({'createdAt': 'desc'})
    
    const conversation = messages
    .map(msg =>
      ({
        "text": msg.text,
        "sendAt": moment(msg.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      }))

    res.status(200).json({
      success: true,
      data: conversation
    })

    Logger.log('info', `${receiver._id} gets all messages between ${startDate} ${endDate}`)

  } catch (error) {
    Logger.log('error', `${error}`)
    return next(new ErrorResponse('Could not found a conversation', 500))
  }  
})

// @desc      Get all unread messages
// @route     GET /api/v1/messages/unread
// @access    Private/Authenticated-User
exports.getUnreadMessages = asyncHandler(async (req, res, next) => {

  try {
    const receiver = await currentUser(req)

    const messages = await Message.find({ 
      $or: [
        { 'senderId': receiver._id.toString()},
        { 'receiverId': receiver._id.toString()}
      ],
      visible: true,
      seen: false
    })
    .sort({'createdAt': 'desc'})

    const conversation = messages
    .map(msg =>       
      ({
        "text": msg.text,
        "sendAt": moment(msg.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      }))

      Logger.log('info', `${receiver._id} gets all unread messages`)

    res.status(200).json({
      success: true,
      data: conversation
    })

  } catch (err) {
    Logger.log('error', `${err}`)
    return next(new ErrorResponse('Could not found a messages', 500))
  }

})


