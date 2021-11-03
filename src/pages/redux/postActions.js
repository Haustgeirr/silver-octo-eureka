import keyMirror from 'key-mirror';
import { createActions } from 'redux-actions';

export const constants = keyMirror({
  GET_POSTS_REQUEST: null,
  GET_POSTS_SUCCESS: null,
  GET_POSTS_FAILURE: null,

  GET_POST_REQUEST: null,
  GET_POST_SUCCESS: null,
  GET_POST_FAILURE: null,
});

export const { getPostsRequest, getPostsSuccess, getPostsFailure } =
  createActions(
    constants.GET_POSTS_REQUEST,
    constants.GET_POSTS_SUCCESS,
    constants.GET_POSTS_FAILURE
  );

export const { getPostRequest, getPostSuccess, getPostFailure } = createActions(
  constants.GET_POST_REQUEST,
  constants.GET_POST_SUCCESS,
  constants.GET_POST_FAILURE
);
