import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryAction } from '../../redux/slices/categorySlices';

export const CategoryList = () => {
  const dispatch = useDispatch();

  // Get the Category Data
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const category = useSelector(state => state?.category);
  // Pull Category Data from the State
  const { categoryList, loading, appError, serverError } = category;
  // const categoryData = categoryList.data.categories

  console.log(categoryList);
  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : appError || serverError ? (
        <h2>
          {appError}! {serverError}
        </h2>
      ) : (
        <section>
          <div className='container'>
            <h1 className='hero-text'>List of Adcomtech Blog Categories</h1>

            <div className='grid  grid grid--4--cols'>
              <div>Author</div>
              <div>Title</div>
              <div>Created At</div>
              <div>Edit</div>
            </div>
            {categoryList.map(cat => {
              return (
                <div className='grid grid grid--4--cols' key={cat._id}>
                  <p>{cat.user.firstName}</p>
                  <p>{cat.title}</p>
                  <p>{cat.createdAt}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};
