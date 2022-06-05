import React, { useEffect } from 'react';
import Select from 'react-select'; // use to create  Drop Down List
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategoryAction } from '../redux/slices/categorySlices';

export const CategoryDropDown = props => {
  //   console.log(props);
  // Get Category Action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  // Select Category State
  const category = useSelector(state => state?.category);
  const { categoryList, loading, appError, serverError } = category;

  // Loop Through the Category List
  const allCategories = categoryList?.map(category => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  // passing the Category to the Form so as to get its value while creating a post
  const handleChange = value => {
    props.onChange('category', value);
  };

  const handleBlur = () => {
    props.onBlur('category', true);
  };

  return (
    <React.Fragment>
      {/* Displaying Error Message */}
      <div className='display-error'>
        {serverError || appError ? (
          <h2>
            {serverError}! {appError}
          </h2>
        ) : null}
      </div>

      {/* Rendering the Select or Dropdown Conditional base on loading */}
      {loading ? (
        <h3>Categories are Loading, Please Wait</h3>
      ) : (
        <Select
          id='category'
          onChange={handleChange}
          onBlur={handleBlur}
          options={allCategories}
          value={props?.value?.label}
        />
      )}

      {/* Displaying Error From the Formik Library */}
      {props?.error && <div>{props?.error}</div>}
    </React.Fragment>
  );
};
