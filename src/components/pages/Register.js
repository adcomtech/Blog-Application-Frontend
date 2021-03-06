import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik'; // for handling form
import * as Yup from 'yup'; // for form validation
import { userRegistrationAction } from '../../redux/slices/usersSlices';

// handling validation
const formSchema = Yup.object({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: Yup.string().required('Email is Required'),
  password: Yup.string().required('Password is Required'),
  passwordConfirm: Yup.string().required('Password do not Match'),
});

export const Register = () => {
  // dispatching action or displaying information using created reducer
  const dispatch = useDispatch();

  // Handling form Initial Values using formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },

    onSubmit: values => {
      // dispatching userRegistration Action
      dispatch(userRegistrationAction(values));
      // console.log(values);
    },

    validationSchema: formSchema,
  });

  // Selecting Data from Store which are messages like 'Error, loading, success message" using useSelector hook
  const storeData = useSelector(store => store.users);

  // distructing storeData
  const { loading, appError, serverError, registered } = storeData;
  console.log(appError, serverError);

  // Redirecting the Registered User  to Profile Page
  const navigate = useNavigate();
  if (registered) {
    return navigate('/profile', { replace: true });
  }

  return (
    <section className='form-section'>
      <div className='container section-centre'>
        <div className='form-heading'>
          <h1>Registration page</h1>

          {/* Displaying Error Message */}
          {serverError || appError ? (
            <h2>
              {serverError}! {appError}
            </h2>
          ) : null}
        </div>
        <form className='form' onSubmit={formik.handleSubmit}>
          <div className='form__group'>
            <input
              value={formik.values.firstName}
              onChange={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              className='form__input'
              type='text'
              placeholder='First Name'
            />
            <div className='errorMsg'>
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>

          <div className='form__group'>
            <input
              value={formik.values.lastName}
              onChange={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              className='form__input'
              type='text'
              placeholder='Last Name'
            />

            <div className='errorMsg'>
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>

          <div className='form__group'>
            <input
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              className='form__input'
              type='email'
              placeholder='Enter your Email Address'
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
              placeholder='Enter Password'
            />

            <div className='errorMsg'>
              {formik.touched.password && formik.errors.password}
            </div>
          </div>

          <div className='form__group'>
            <input
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange('passwordConfirm')}
              onBlur={formik.handleBlur('passwordConfirm')}
              className='form__input'
              type='password'
              placeholder='Confirm Password'
            />

            <div className='errorMsg'>
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            </div>
          </div>
          {/* Check if it is loading and change the button */}
          {loading ? (
            <button>loading....</button>
          ) : (
            <button type='submit' className='btn'>
              Register
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
