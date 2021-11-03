import axios from 'axios';
import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function usePosts() {
  return useQuery('posts', async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  });
}

const getPostById = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId), {
    enabled: !!postId,
  });
}

function AppQuery() {
  const [postId, setPostId] = useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <div>
          <h1>React Query</h1>
          {postId > -1 ? (
            <Post postId={postId} setPostId={setPostId} />
          ) : (
            <Posts setPostId={setPostId} />
          )}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const Posts = ({ setPostId }) => {
  const { data, status, isFetching, error } = usePosts();

  const queryClient = useQueryClient();

  const renderPosts = (posts) => {
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'error' && error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <p>{isFetching ? 'Fetching...' : ''}</p>
        {posts.map((post) => (
          <p key={post.id}>
            <a
              href='#'
              onClick={() => setPostId(post.id)}
              style={
                queryClient.getQueryData(['post', post.id])
                  ? { fontWeight: 'bold' }
                  : {}
              }
            >
              {post.title}
            </a>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Posts</h2>
      {data && renderPosts(data)}
    </div>
  );
};

const Post = ({ postId, setPostId }) => {
  const { data, status, error } = usePost(postId);

  const renderPost = (post) => {
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'error' && error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <a href='#' onClick={() => setPostId(-1)}>
          Back
        </a>
      </div>
      {data && renderPost(data)}
    </div>
  );
};

export default AppQuery;
