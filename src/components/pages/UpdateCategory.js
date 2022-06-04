import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  deleteCategoryAction,
  fetchCategoryDetailsAction,
  updateCategoryAction,
} from '../../redux/slices/categorySlices';

//////////////////////////////////////////////////
// Form Validation

const formSchema = Yup.object({
  title: Yup.string().required('Title is Required to Create Category'),
});

export const UpdateCategory = () => {
  // Get Id Prameter from the URL
  const params = useParams();
  const id = params.id;

  // Fetch A Category
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryDetailsAction(id));
  }, [dispatch, id]);

  // Get Data from Store
  const state = useSelector(state => state?.category);
  // Pull Category Data from the State
  const {
    category,
    isCategoryEdited,
    isCategoryDeleted,
    loading,
    appError,
    serverError,
  } = state;

  // Hanling form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      // Dispatching the data
      dispatch(updateCategoryAction({ title: values.title, id }));
    },

    // Validate the Form using Yup Schema Defined up above
    validationSchema: formSchema,
  });

  // Redirecting the User After Updating or Deleting Category
  const navigate = useNavigate();
  if (isCategoryEdited || isCategoryDeleted)
    return navigate('/admin/category-list');

  return (
    <div>
      <section>
        <h1 className='hero-text'>Update Category</h1>
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
              placeholder='Update Category'
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
              <React.Fragment>
                <button type='submit' className='btn'>
                  Update Category
                </button>

                <button
                  className='btn'
                  onClick={() => dispatch(deleteCategoryAction(id))}
                >
                  Delete Category
                </button>
              </React.Fragment>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};
