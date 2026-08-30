import { useState } from 'react';
import { Button, TextField, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Dropzone from 'react-dropzone';


// **********Form validation using Formik and Yup**********
const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  occupation: yup.string().required('required'),
  location: yup.string().required('required'),
  picture: yup.string().required('not required')
  // picture: yup.mixed().required('required')
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});


const NewForm = ({showAlert}) => {
  const [pageType, setPageType] = useState('Login');
  const { palette } = useTheme();
  const dark = palette.primary.dark;
  const main = palette.primary.main;
  const light = palette.primary.light;
  const pinkHot = palette.secondary.dark;
  const pinkWarm = palette.secondary.main;
  const pinkCool = palette.secondary.light;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === 'Login';
  const isRegister = pageType === 'Register';
  

  const registerValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
  };
  
  const loginValues = {
    email: '',
    password: '',
  }

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append('picturePath', values.picture.name);

    const savedUserResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      showAlert('Register successful')
      setPageType('Login');
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      
      if (loggedIn.user && loggedIn.token) { // This will verify the existing user
        showAlert('Login successful')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          }),
        );
        navigate('/home');
      }
    
  };
  
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={
        isLogin
          ? loginValues
          : registerValues
      }
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({handleSubmit, handleBlur, handleChange, touched, resetForm, setFieldValue, errors, values}) => {
        return (
          <Form onSubmit={handleSubmit} className=''>
            <div className='flex flex-col justify-center items-center'>
              {isRegister && (
                <div className='flex flex-col'>
                  <div className='flex gap-2'>
                    <TextField
                      className='lg:w-100 w-40 rounded-[5px]'
                      sx={{ background: dark, marginY: '8px' }}
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      className='lg:w-100 w-40 rounded-[5px]'
                      sx={{ background: dark, marginY: '8px' }}
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                    />
                  </div>
                  <div className='flex gap-2'>
                    <TextField
                      className='lg:w-100 w-40 rounded-[5px]'
                      sx={{ background: dark, marginY: '8px' }}
                      label="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                    />
                    <TextField
                      className='lg:w-100 w-40 rounded-[5px]'
                      sx={{ background: dark, marginY: '8px' }}
                      label="Occupation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={
                        Boolean(touched.occupation) && Boolean(errors.occupation)
                      }
                      helperText={touched.occupation && errors.occupation}
                    />
                  </div>
                  <div className="border border-dotted rounded-2xl p-2 m-2" style={{borderColor: pinkCool}}>
                    <Dropzone
                      accept={
                        {'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'], 'image/jpg': ['.jpeg', '.jpg']}
                      }
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue('picture', acceptedFiles[0])
                      }}
                      >
                      {({ getRootProps, getInputProps }) => {
                      return (
                          <div
                            {...getRootProps()}
                            style={{borderColor: pinkHot}}
                            className="border-2 p-2 w-full cursor-pointer rounded-2xl"
                          >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                              <p style={{color: '#fff'}} >Add Picture Here...</p>
                            ) : (
                              <div className='flex justify-between'>
                                <p style={{color: '#fff'}} >{values.picture.name}</p>
                                <EditOutlinedIcon style={{color: '#fff'}} />
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </Dropzone>
                  </div>
                </div>
              )}
              {/* register ends here */}
              {isLogin ? (
                <div className='flex flex-col gap-2'>
                  <TextField
                    className='w-80 rounded-[5px]'
                    sx={{ background: dark, marginY: '8px' }}
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    className='w-80 rounded-[5px]'
                    sx={{ background: dark, marginY: '8px' }}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
              ) : (
                <div className='flex gap-2'>
                  <TextField
                    className='lg:w-100 w-40 rounded-[5px]'
                    sx={{ background: dark, marginY: '8px' }}
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    className='lg:w-100 w-40 rounded-[5px]'
                    sx={{ background: dark, marginY: '8px' }}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    type="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
              )}

              {/* Buttons */}
              <div>
                <Button type='submit' sx={{
                    "&:hover": {
                        background: pinkWarm,
                        boxShadow: `0 0 5px 0 ${light}`,
                        transition: 'all linear 0.1s'
                    },
                    transition: 'all linear 0.1s',
                    padding: '8px 24px',
                    background: pinkHot, color: 'white', borderRadius: '16px'
                    }}
                    className='rounded-2xl cursor-pointer'>
                  {isLogin ? 'Login' : 'Register'}
                </Button>

                <h1 style={{color: dark}}>
                  {isLogin ? <p style={{color: 'white'}}>Don't have an account?
                    <span onClick={() => {
                      setPageType(() => (isLogin ? 'Register' : 'Login'));
                      resetForm()
                    }} style={{color: pinkWarm, cursor: 'pointer'}}> Sign Up here</span>
                    </p>
                    : <p style={{color: 'white'}}>Already have an account?
                    <span onClick={() => {
                      setPageType(() => (isLogin ? 'Register' : 'Login'));
                      resetForm()
                    }} style={{color: pinkWarm, cursor: 'pointer'}}> Login here</span>
                    </p>
                  }
                </h1>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewForm;