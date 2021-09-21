const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    seen: {
      type: Boolean,
      default: false
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    text: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)
