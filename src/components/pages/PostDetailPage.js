import React from 'react';
import { useParams } from 'react-router-dom';

import { posts } from '../../data';

export const PostDetailPage = () => {
  // Get the Post Id
  const params = useParams();
  // Find Individual Post and Display
  const post = posts.find(post => {
    return post.id === params.postId;
  });
  // Distructure post by pull it data
  // const [title, description, image] = post;
  console.log(post);

  return (
    <section>
      <div className='container'>
        {/* <img src="" alt="" /> */}
        <h4>{post.image}</h4>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    </section>
  );
};
