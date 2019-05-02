import * as actionTypes from "./actionTypes";

const initialState = {
  issue: undefined,
  comments: undefined,
  commentText: ""
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.FETCH_ISSUE_SUCCESS) {
    return {
      ...state,
      issue: action.payload.issueData,
      comments: action.payload.commentsData
    };
  }

  if (action.type === actionTypes.ON_CHANGE) {
    console.log(action.payload.event.target.value);
    return { ...state, commentText: action.payload.event.target.value };
  }

  if (
    action.type === actionTypes.ADD_COMMENT ||
    action.type === actionTypes.DELETE_COMMENT
  ) {
    return {
      ...state,
      comments: action.payload.updatedComments
    };
  }

  return state;
};

export default reducer;
