import React from 'react';
import { Link } from 'react-router-dom';

import { posts } from '../../data';

export const PostsPage = () => {
  return (
    <section>
      <div className='container grid'>
        <h1>Posts</h1>
        <div className='grid--3--cols'>
          {/* Loop Over the Post Array */}
          {posts.map(post => {
            return (
              <article key={post.id}>
                <h3>{post.title}</h3>

                <Link to={`/posts/${post.id}`}>More Info</Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
