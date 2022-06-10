import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  // deletePostAction,
  fetchPostDetailsAction,
} from '../../redux/slices/postSlices';
import { DateFormatter } from '../../utilities/DateFormatter';
import { AddComment } from '../comments/AddComment';
import { CommentList } from '../comments/CommentList';

// import { posts } from '../../data';

export const PostDetailPage = () => {
  // Get the Post Id
  // const params = useParams();
  // Find Individual Post and Display
  // const post = posts.find(post => {
  //   return post.id === params.postId;
  // });
  // Distructure post by pull it data
  // const [title, description, image] = post;

  const params = useParams();
  const postId = params.postId;

  // Dispatch
  const dispatch = useDispatch();

  const comment = useSelector(state => state?.comment);

  const { commentCreated, commentDeleted } = comment;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(postId));
  }, [dispatch, postId, commentCreated, commentDeleted]);

  // Select Post From Store
  const post = useSelector(state => state?.post);

  const { postDetails, appError, serverError } = post;

  const user = useSelector(state => state?.users);
  const { loggedInUser } = user;

  // Redirecting the User After Updating or Deleting Category
  // const navigate = useNavigate();
  // if (isPostDeleted) return navigate('/posts');

  return (
    <section>
      <div className='display-error'>
        {/* Displaying Error Message */}
        {serverError || appError ? (
          <h2>
            {serverError}! {appError}
          </h2>
        ) : null}
      </div>
      <article className='container'>
        <img src={postDetails?.image} alt='post details' />
        <h2>{postDetails?.title}</h2>
        <p>Created At {<DateFormatter date={postDetails?.createdAt} />}</p>
        <div className='post-creator'>
          <img src={postDetails?.user?.photo} alt='creator' />
          <p>
            {postDetails?.user?.firstName} {postDetails?.user?.lastName}
          </p>
        </div>
        <p>{postDetails?.description}</p>

        <div className='post-update'>
          <Link to={`/update-post/${postDetails?._id}`}>Edit</Link>
        </div>
      </article>

      {loggedInUser ? (
        <div className='comment-box'>
          <AddComment postId={postId} />
        </div>
      ) : null}

      <div className='comment-box'>
        <CommentList comments={postDetails?.comments} />
      </div>
    </section>
  );
};
