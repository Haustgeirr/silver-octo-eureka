import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getPostsFailure,
  getPostsSuccess,
  getPostFailure,
  getPostSuccess,
} from './postActions';
const { GET_POSTS_REQUEST, GET_POST_REQUEST } =
  require('./postActions').constants;

function* getPosts() {
  try {
    const response = yield call(async () => {
      return await axios.get('https://jsonplaceholder.typicode.com/posts');
    });

    yield put(getPostsSuccess(response.data));
  } catch (e) {
    yield put(getPostsFailure('Posts could not be fetched'));
  }
}

function* getPost({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(async () => {
      return await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
    });

    yield put(getPostSuccess(response.data));
  } catch (e) {
    yield put(getPostFailure('Posts could not be fetched'));
  }
}

export default function* postSagas() {
  yield* [
    takeEvery(GET_POSTS_REQUEST, getPosts),
    takeEvery(GET_POST_REQUEST, getPost),
  ];
}
