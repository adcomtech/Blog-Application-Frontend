import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createPostLikesAction,
  createPostDisLikesAction,
  fetchPostsAction,
} from '../../redux/slices/postSlices';
// import { LoadingSpinner } from '../../utilities/LoadingSpinner';
import { DateFormatter } from '../../utilities/DateFormatter';
import { fetchCategoryAction } from '../../redux/slices/categorySlices';

const PostLists = () => {
  // Get Post from Store
  const postsData = useSelector(state => state?.post);

  const { postLists, appError, serverError, likes, dislikes } = postsData;

  const posts = postLists?.data?.posts;

  // Get Categoy from Store
  const category = useSelector(state => state?.category);
  // Pull Category Data from the State
  const {
    categoryList,
    // loading: catLoading,
    appError: catAppError,
    // serverError: catServerError,
  } = category;

  // Dispatch  Posst Action
  const dispatch = useDispatch();

  // Fetch the Posts Data
  useEffect(() => {
    dispatch(fetchPostsAction(''));
  }, [dispatch, likes, dislikes]);

  // Fetch the Category Data
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  return (
    <section>
      <div className='container '>
        <h1>Latest Posts from our awesome authors</h1>

        <h2>Latest Post</h2>
        <div className=''>
          <div className='category'>
            <p>Categories</p>
            {catAppError ? (
              <h2>{catAppError}</h2>
            ) : categoryList?.length <= 0 ? (
              <h2>No Category Found!</h2>
            ) : (
              <ul>
                {categoryList?.map(cat => (
                  <li key={cat._id}>
                    <p onClick={() => dispatch(fetchPostsAction(cat))}>
                      {cat?.title}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='viewallpost'>
            <p onClick={() => dispatch(fetchPostsAction())}>Veiew All Posts</p>
          </div>

          {appError || serverError ? (
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
                      <span
                        onClick={() =>
                          dispatch(createPostLikesAction(post?._id))
                        }
                      >
                        like ({post.likes.length})
                      </span>
                      <span
                        onClick={() =>
                          dispatch(createPostDisLikesAction(post?._id))
                        }
                      >
                        dislike ({post.disLikes.length}){' '}
                      </span>
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
