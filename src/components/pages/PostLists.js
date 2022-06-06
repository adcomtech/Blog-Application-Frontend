import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostsAction } from '../../redux/slices/postSlices';
import { LoadingSpinner } from '../../utilities/LoadingSpinner';
import { DateFormatter } from '../../utilities/DateFormatter';
import { fetchCategoryAction } from '../../redux/slices/categorySlices';

const PostLists = () => {
  // Dispatch  Posst Action
  const dispatch = useDispatch();

  // Fetch the Posts Data
  useEffect(() => {
    dispatch(fetchPostsAction(''));
  }, [dispatch]);

  // Fetch the Category Data
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  // Get Post from Store
  const postsData = useSelector(state => state?.post);

  const { postLists, loading, appError, serverError } = postsData;

  const posts = postLists?.data?.posts;

  // Get Categoy from Store
  const category = useSelector(state => state?.category);
  // Pull Category Data from the State
  const {
    categoryList,
    loading: catLoading,
    appError: catAppError,
    // serverError: catServerError,
  } = category;

  return (
    <section>
      <div className='container '>
        <h1>Latest Posts from our awesome authors</h1>

        <h2>Latest Post</h2>
        <div className=''>
          <div className='category'>
            <p>Categories</p>
            {catLoading ? (
              <>
                <LoadingSpinner />
              </>
            ) : catAppError ? (
              <h2>{catAppError}</h2>
            ) : categoryList?.length <= 0 ? (
              <h2>No Category Found!</h2>
            ) : (
              <ul>
                {categoryList?.map(cat => (
                  <li key={cat._id}>
                    <p onClick={() => dispatch(fetchCategoryAction(cat.title))}>
                      {cat.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {loading ? (
            <>
              <LoadingSpinner />
            </>
          ) : appError || serverError ? (
            <h2>
              {appError}! {serverError}
            </h2>
          ) : posts?.length <= 0 ? (
            <h2>No Post Found!</h2>
          ) : (
            <div className=''>
              {posts?.map(post => {
                return (
                  <article className='post-body' key={post._id}>
                    <img src={post.image} alt='post ' />

                    <div className='post-head'>
                      <span>like ({post.likes.length})</span>
                      <span>dislike ({post.disLikes.length}) </span>
                      <span>numViews ({post.numViews}) </span>
                      <span>toggle</span>
                    </div>
                    <h3 className='post-title'> {post.title}</h3>
                    <p>{post.description}</p>
                    <Link to={post._id}>Read More</Link>

                    <div className='user-info'>
                      <img src={post?.user?.photo} alt='user profile' />

                      <p>
                        {post.user?.firstName} {post?.user?.lastName}
                      </p>

                      <p>{<DateFormatter date={post.createdAt} />} </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostLists;
