import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createCategoryAction } from '../../redux/slices/categorySlices';

//////////////////////////////////////////////////
// Form Validation

const formSchema = Yup.object({
  title: Yup.string().required('Title is Required to Create Category'),
});

export const AddNewCategory = () => {
  const dispatch = useDispatch();

  // Hanling form
  const formik = useFormik({
    initialValues: {
      title: '',
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      // Dispatching the data from the createCategoryAction
      dispatch(createCategoryAction(values));
      console.log(values);
    },

    // Validate the Form using Yup Schema Defined up above
    validationSchema: formSchema,
  });

  // Get Data from Store
  const category = useSelector(state => state?.category);

  const { loading, appError, serverError } = category;

  return (
    <div>
      <section>
        <h1 className='hero-text'>Add New Category</h1>
        <p>Add categories user will select when creating a post</p>

        <div className='display-error'>
          {/* Displaying Error Message */}
          {serverError || appError ? (
            <h2>
              {serverError}! {appError}
            </h2>
          ) : null}
        </div>

        <form className='form' onSubmit={formik.handleSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className=''>
            <label htmlFor='email-address'>name</label>
          </div>
          <div className='form__group'>
            <input
              value={formik.values.title}
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              className='form__input'
              type='text'
              autoComplete='text'
              placeholder='Add New Category'
            />

            <div className='errorMsg'>
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <div className='form__control'>
            {loading ? (
              <button type='submit' className='btn'>
                Loading...
              </button>
            ) : (
              <button type='submit' className='btn'>
                Add Category
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};
