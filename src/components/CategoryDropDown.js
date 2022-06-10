import React, { useEffect } from 'react';
import Select from 'react-select'; // use to create  Drop Down List
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategoryAction } from '../redux/slices/categorySlices';

export const CategoryDropDown = props => {
  //   console.log(props);
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  // Select Category State
  const category = useSelector(state => state?.category);
  const { categoryList, loading } = category;

  // Loop Through the Category List
  const allCategories = categoryList?.map(category => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  // passing the Category to the Form so as to get its value while creating a post
  //handleChange
  const handleChange = value => {
    props.onChange('category', value);
  };
  //handleBlur
  const handleBlur = () => {
    props.onBlur('category', true);
  };

  return (
    <React.Fragment>
      {/* Rendering the Select or Dropdown Conditional base on loading */}
      {loading ? (
        <h3>Categories are Loading, Please Wait</h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id='category'
          options={allCategories}
          value={props?.value?.label}
        />
      )}

      {/* Displaying Error From the Formik Library */}
      {props?.error && <div>{props?.error}</div>}
    </React.Fragment>
  );
};
