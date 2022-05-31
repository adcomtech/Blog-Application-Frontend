import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userLoginAction } from '../../redux/slices/usersSlices';

const formSchema = Yup.object({
  email: Yup.string().required('Email is Required to Login'),
  password: Yup.string().required('Password is Required to Login'),
});

export const LoginPage = () => {
  // calling the instance of useDispatch hook
  const dispatch = useDispatch();

  // Hanling form
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      // Dispatching the data from the userLoginAction
      dispatch(userLoginAction(values));
      console.log(values);
    },

    // Validate the Form using Yup Schema Defined up above
    validationSchema: formSchema,
  });

  // Check if there is Logged In User and Redirect to Profile Page
  const store = useSelector(state => state.users);
  const { loggedInUser, loading, serverError, appError } = store; // pull user Data from Our Store
  // actual redirect
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      return navigate('/', { replace: true });
    }
  }, [navigate, loggedInUser]);

  return (
    <section>
      <div className='container'>
        <h1>Ready to Explore, Login</h1>
        {/* Displaying Error Message */}
        {serverError || appError ? (
          <h2>
            {serverError}! {appError}
          </h2>
        ) : loggedInUser ? (
          <h2>Login Successful</h2>
        ) : null}

        <form className='form' onSubmit={formik.handleSubmit}>
          <div className='form__group'>
            <input
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              className='form__input'
              type='email'
              placeholder='Enter your Email'
            />
            <div className='errorMsg'>
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className='form__group'>
            <input
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              className='form__input'
              type='password'
              placeholder='Enter your Password'
            />
            <div className='errorMsg'>
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          {loading ? (
            <button disabled>Loading...</button>
          ) : (
            <button type='submit' className='btn'>
              Login
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
