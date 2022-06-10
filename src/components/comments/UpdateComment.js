import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
  fetchCommentAction,
  updateCommentAction,
} from '../../redux/slices/commentSlices';

export const UpdateComment = () => {
  // Get Id Prameter from the URL
  const params = useParams();
  const id = params.id;

  // Fetch A Category
  const dispatch = useDispatch();

  // Fetching a Comment and populate it values when updating the comment.
  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  const comment = useSelector(state => state?.comment);

  const { commentDetails, isCommentUpdated, loading, appError, serverError } =
    comment;

  // Hanling form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.data?.comment?.description,
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      // Dispatching the data
      const data = {
        id,
        description: values.description,
      };
      dispatch(updateCommentAction(data));
    },
  });

  // Redirecting the User After Updating or Deleting Category
  const navigate = useNavigate();
  if (isCommentUpdated) return navigate(`/posts`);

  return (
    <section>
      <h1 className='hero-text'>Update Comment</h1>

      <div className='display-error'>
        {/* Displaying Error Message */}
        {serverError || appError ? (
          <h2>
            {serverError}! {appError}
          </h2>
        ) : null}
      </div>

      <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='comment-update'>Description</label>

        <div className='form__group'>
          <textarea
            name='comment-update'
            id='description'
            cols='30'
            rows='3'
            className='form__input'
            type='text'
            autoComplete='text'
            value={formik.values?.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          ></textarea>

          <div className='errorMsg'>
            {formik.touched.description && formik.errors.description}
          </div>
        </div>

        <div className='form__control'>
          {loading ? (
            <button type='submit' className='btn'>
              Loading...
            </button>
          ) : (
            <button type='submit' className='btn'>
              Update Comment
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
