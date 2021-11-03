import { Record } from 'immutable';

const {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,

  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} = require('./postActions').constants;

const InitialState = Record({
  posts: [],
  post: {},
  isFetching: false,
  error: null,
});

export const initialState = new InitialState();

export default function postReducer(state = initialState, action) {
  const { payload, type } = action;

  if (!(state instanceof InitialState)) {
    return initialState.merge(state);
  }

  switch (type) {
    case GET_POST_REQUEST:
    case GET_POSTS_REQUEST:
      return state.set('isFetching', true).set('error', null);

    case GET_POSTS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('posts', payload);

    case GET_POST_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('post', payload);

    case GET_POST_FAILURE:
    case GET_POSTS_FAILURE:
      return state.set('isFetching', false).set('error', payload);
    default:
      return state;
  }
}
