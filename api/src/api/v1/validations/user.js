const yup = require('yup')

const usrRegisterSchema = yup.object({
  body: yup.object({
    username: yup.string().min(3).max(25).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
     .required()
  })
})

const usrLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8).max(25)
      .required('Please Enter your password')
  })
})

const usrBlockSchema = yup.object({
  params: yup.object({
    susname: yup.string().min(3).max(25).required()
  })
})

const usrUnblockSchema = yup.object({
  params: yup.object({
    susname: yup.string().min(3).max(25).required()
  })
})

module.exports = { usrRegisterSchema, usrLoginSchema, usrBlockSchema, usrUnblockSchema }