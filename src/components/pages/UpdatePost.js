import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import * as Yup from 'yup';

import {
  updatePostAction,
  fetchPostDetailsAction,
} from '../../redux/slices/postSlices';
import { CategoryDropDown } from '../CategoryDropDown';
//////////////////////////////////////////////////
// Form Validation

// const formSchema = Yup.object({
//   title: Yup.string().required('Title is Required to Create Category'),
//   description: Yup.string().requiredd('')
// });

export const UpdatePost = props => {
  // Get Id Prameter from the URL
  const params = useParams();
  const postId = params.postId;

  // Fetch A Category
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(postId));
  }, [dispatch, postId]);

  // Get Data from Store
  const post = useSelector(state => state?.post);
  // Pull Category Data from the State
  const { postDetails, loading, appError, serverError } = post;

  const postUpdatedData = useSelector(state => state?.post);
  const { isPostUpdated } = postUpdatedData;

  // Hanling form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title,
      description: postDetails?.description,
      category: '',
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      // Dispatching the data
      const data = {
        title: values?.title,
        description: values?.description,
        postId,
      };

      dispatch(updatePostAction(data));
    },

    // Validate the Form using Yup Schema Defined up above
    // validationSchema: formSchema,
  });

  // Redirecting the User After Updating Post
  const navigate = useNavigate();
  if (isPostUpdated) return navigate('/posts');

  return (
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

        <div className='for__group'>
          <CategoryDropDown
            value={formik.values.category?.label}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.category}
            touched={formik.touched.category}
          />
        </div>

        <div className='form__group'>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            className='form__input'
            type='text'
            autoComplete='text'
            placeholder='Add Post Description'
            value={formik.values?.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          ></textarea>

          <div className='errorMsg'>
            {formik?.touched?.description && formik?.errors?.description}
          </div>
        </div>

        <div className='form__control'>
          {loading ? (
            <button disabled className='btn'>
              Loading...
            </button>
          ) : (
            <>
              <button type='submit' className='btn'>
                Update Post
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};
