const ErrorResponse = require('../../middleware/errorResponse')
const asyncHandler = require('../../middleware/async')
const User = require('../../models/User')
const { currentUser } = require('../../middleware/auth')

// @desc      Blocks a user by username
// @route     POST /api/v1/block/:blockedUsername
// @access    Private/Authenticated-User
exports.blockUserByUsername = asyncHandler(async (req, res, next) => {
  try {
    const user = await currentUser(req)
    const suspect = await User.findOne({ username: req.params.susname})

    const filter = { _id: user._id };
    const update = { blacklist: suspect._id }

    await User.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })

    res.status(200).json({
      success: true,
      data: `${suspect.username} is successfully blocked`
    })
  } catch (error) {
    return next(new ErrorResponse('Could not blocked the user', 500))
  }
})


// @desc      Blocks a user by username
// @route     POST /api/v1/unblock/:blockedUsername
// @access    Private/Authenticated-User
exports.unBlockUserByUsername = asyncHandler(async (req, res, next) => {
  try {
    const user = await currentUser(req)
    const suspect = await User.findOne({ username: req.params.susname})

    await User.updateOne(
      { _id: user._id }, 
      { $pull: { 'blacklist': suspect._id } }
    )

    res.status(200).json({
      success: true,
      data: `${suspect.username} is successfully unblocked`
    })
  } catch (error) {
    return next(new ErrorResponse('Could not unblocked the user', 500))
  }
})