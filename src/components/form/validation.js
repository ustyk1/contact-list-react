import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  contactName: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  job: Yup.string(),
  avatar: Yup.string(),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender'),
  group: Yup.string().oneOf(['', 'work', 'family', 'private', 'friends', 'other'], 'Invalid Group').required('Group is required'),
  favorite: Yup.boolean()
})

export { validationSchema }