import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCommentAction } from '../../redux/slices/commentSlices';
import { useDispatch, useSelector } from 'react-redux';

////////////////////////
// Form Validation

const formSchema = Yup.object({
  description: Yup.string().required('The Field must not be Empty'),
});

export const AddComment = props => {
  // Fetch Comment Data
  const dispatch = useDispatch();

  // Hanling form
  const formik = useFormik({
    initialValues: {
      description: '',
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      const data = {
        postId: props.postId,
        description: values?.description,
      };
      // Dispatching the data from the userLoginAction
      dispatch(createCommentAction(data));
      // console.log(data);
    },

    // Validate the Form using Yup Schema Defined up above
    validationSchema: formSchema,
  });

  const comment = useSelector(state => state?.comment);

  const { loading } = comment;

  return (
    <section>
      <form className='form' onSubmit={formik.handleSubmit}>
        <div className='form__group'>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='3'
            className='form__input'
            type='text'
            autoComplete='text'
            placeholder='Add Comment'
            value={formik.values?.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          ></textarea>

          <div className='errorMsg'>
            {formik?.touched?.description && formik?.errors?.description}
          </div>
        </div>

        {loading ? (
          <h1>Loading</h1>
        ) : (
          <button type='submit' className='btn'>
            post
          </button>
        )}
      </form>
    </section>
  );
};
