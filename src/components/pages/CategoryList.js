import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoryAction } from '../../redux/slices/categorySlices';
import { DateFormatter } from '../../utilities/DateFormatter';
import { LoadingSpinner } from '../../utilities/LoadingSpinner';

export const CategoryList = () => {
  const dispatch = useDispatch();

  // Get the Category Data
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const category = useSelector(state => state?.category);
  // Pull Category Data from the State
  const { categoryList, loading, appError, serverError } = category;

  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : appError || serverError ? (
        <h2>
          {appError}! {serverError}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2>No Category Found!</h2>
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
            {categoryList?.map(cat => {
              return (
                <div className='' key={cat._id}>
                  <div className='grid grid--4--cols'>
                    <div>{cat.user.firstName}</div>
                    <div>{cat.title}</div>
                    <div>{<DateFormatter date={cat.createdAt} />}</div>
                    <Link
                      to={`/admin/update-category/${cat._id}`}
                      className='edit'
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};
