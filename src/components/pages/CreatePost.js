import React from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createPostAction } from '../../redux/slices/postSlices';
import { CategoryDropDown } from '../CategoryDropDown';

//////////////////////////////////////////////////
// Form Validation

const formSchema = Yup.object({
  title: Yup.string().required('Provide Title for the Post'),
  description: Yup.string().required('Provide Description of the Post'),
  category: Yup.object().required('Select a Category for the Post'),
  image: Yup.string().required('Provide image for the post'),
});

//css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
border-color:'red'
  transition: border 0.24s ease-in-out;
`;

export const CreatePost = () => {
  const dispatch = useDispatch();

  // Hanling form
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },

    // Handle Submit when login button is pressed
    onSubmit: values => {
      const data = {
        title: values.title,
        category: values.category.label,
        description: values.description,
        image: values.image,
      };
      // Dispatching the data from the createCategoryAction
      dispatch(createPostAction(data));
      console.log(values);
    },

    // Validate the Form using Yup Schema Defined up above
    validationSchema: formSchema,
  });

  return (
    <section>
      <h1 className='hero-text'>Create New Post</h1>
      <p>Create an Ideas that will Change Lives</p>

      <div className='display-error'>
        {/* Displaying Error Message */}
        {/* {serverError || appError ? (
          <h2>
            {serverError}! {appError}
          </h2>
        ) : null} */}
      </div>

      <form className='form' onSubmit={formik.handleSubmit}>
        <div className='form__group'>
          <input
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            className='form__input'
            type='text'
            autoComplete='tile'
            placeholder='Add New Post'
          />

          <div className='errorMsg'>
            {formik?.touched?.title && formik?.errors?.title}
          </div>
        </div>

        <div className='for__group'>
          <CategoryDropDown
            value={formik.values.category}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors?.category}
            touched={formik.touched?.category}
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

        {/* DropZone Component for Image Upload while Creating Post */}
        <Container className='container'>
          <Dropzone
            onBlur={formik.handleBlur('image')}
            accept='image/jpeg, image/png'
            onDrop={acceptedFiles => {
              formik.setFieldValue('image', acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className='container'>
                <div
                  {...getRootProps({
                    className: 'dropzone',
                    onDrop: event => event.stopPropagation(),
                  })}
                >
                  <input {...getInputProps()} />
                  <p className='text-gray-300 text-lg cursor-pointer hover:text-gray-500'>
                    Click here to select image
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
        </Container>

        <div className='form__control'>
          <button type='submit' className='btn'>
            Create Post
          </button>
          {/* )} */}
        </div>
      </form>
    </section>
  );
};
