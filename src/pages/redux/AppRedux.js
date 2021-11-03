import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { isEmpty } from 'underscore';

import postReducer, { initialState } from './postReducer';
import postSagas from './postSagas';
import { getPostsRequest, getPostRequest } from './postActions';

const rootReducer = combineReducers({ post: postReducer });

function usePosts() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  const handleGetPostsRequest = () => {
    dispatch(getPostsRequest());
  };

  const handleGetPostRequest = (payload) => {
    dispatch(getPostRequest(payload));
  };

  return {
    post,
    getPostsRequest: handleGetPostsRequest,
    getPostRequest: handleGetPostRequest,
  };
}

function AppRedux() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    { post: initialState },
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(postSagas);

  const [postId, setPostId] = useState(-1);

  return (
    <Provider store={store}>
      <div className='App'>
        <div>
          <h1>React Redux</h1>
          {postId > -1 ? (
            <Post postId={postId} setPostId={setPostId} />
          ) : (
            <Posts setPostId={setPostId} />
          )}
        </div>
      </div>
    </Provider>
  );
}

const Posts = ({ setPostId }) => {
  const {
    post: { isFetching, posts },
    getPostsRequest,
  } = usePosts();

  useEffect(() => {
    getPostsRequest();
  }, [getPostsRequest]);

  const renderPosts = (posts) => {
    return (
      <div>
        <p>{isFetching ? 'Fetching...' : ''}</p>
        {!isEmpty(posts)
          ? posts.map((post) => (
              <p key={post.id}>
                <a href='#' onClick={() => setPostId(post.id)}>
                  {post.title}
                </a>
              </p>
            ))
          : null}
      </div>
    );
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts && renderPosts(posts)}
    </div>
  );
};

const Post = ({ postId, setPostId }) => {
  const {
    post: { isFetching, post },
    getPostRequest,
  } = usePosts();

  useEffect(() => {
    getPostRequest({ id: postId });
  }, [getPostRequest]);

  return (
    <div>
      <div>
        <a href='#' onClick={() => setPostId(-1)}>
          Back
        </a>
      </div>
      <p>{isFetching ? 'Fetching...' : ''}</p>
      {!isEmpty(post) ? (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      ) : null}
    </div>
  );
};

export default AppRedux;
