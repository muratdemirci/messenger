const yup = require('yup')

const msgSchema = yup.object({
  body: yup.object({
    seen: yup.boolean(),    
    sendMsgTo: yup.string().min(3).max(25).required(),
    visible: yup.boolean(),
    text: yup.string().min(1).max(4096).required()
  })
})
// Maximum limit of Telegram Message is 4096 characters.
// So im gonna use this limit too

const msgFindBtwDatesSchema = yup.object({
  params: yup.object({
    startsAt: yup.string().required(),
    endsAt: yup.string().required()
  })
})

module.exports = { msgSchema, msgFindBtwDatesSchema }