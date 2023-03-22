
import { FETCH_ALL, FETCH_BY_SEARCH, START_lOADING, END_lOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default(state = { isLoading: true , posts : [] }, action) => {

  console.log(state);
  switch (action.type) {
    case START_lOADING:
      return{
        ...state, isLoading : true
      };
    case END_lOADING:
      return{
        ...state, isLoading : true
      };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {...state,posts: action.payload};
    case LIKE:
      return {...state,posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case CREATE:
      return {...state, posts: [...state.posts, action.payload]};
    case UPDATE:
      return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    default:
      return state;
  }
};