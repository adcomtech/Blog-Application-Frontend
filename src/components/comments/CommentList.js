import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentAction } from '../../redux/slices/commentSlices';

export const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  const comment = useSelector(state => state?.comment);

  const { loading } = comment;

  const user = useSelector(state => state?.users);
  const { loggedInUser } = user;
  const isCurrentLoggedInUser = loggedInUser?.user?._id;

  return (
    <ul>
      <h1> {comments?.length} Total Post Comment</h1>
      {comments?.length <= 0 ? (
        <h3>No Comments Yet</h3>
      ) : (
        comments?.map(comment => (
          <div key={comment?._id}>
            <li>
              <img src={comment?.user?.photo} alt='user' />

              <h1 className='user-name'>
                {comment?.user?.firstName} {comment?.user?.lastName}
              </h1>

              <Moment fromNow ago>
                {comment?.createdAt}
              </Moment>

              <p className=''>{comment?.description}</p>
            </li>

            {isCurrentLoggedInUser === comment?.user?._id ? (
              <div className='update-box'>
                <Link to={`/update-comment/${comment?._id}`}>Edit</Link>
                {loading ? (
                  <h1>Loadig</h1>
                ) : (
                  <button
                    onClick={() => dispatch(deleteCommentAction(comment?._id))}
                  >
                    Delete
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))
      )}
    </ul>
  );
};
