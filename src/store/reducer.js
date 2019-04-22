import * as actionTypes from "./actions";

const intitialState = {
  issues: undefined
};

const reducer = async (state = intitialState, action) => {
  if (action.type === actionTypes.GET_INITIAL_ISSUES) {
    const data = await fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=${
        action.payLoad.page
      }`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data, action.payLoad.page);
        return data;
      })
      .catch(err => console.log(err));
    return {
      ...state,
      issues: data
    };
  }
  return state;
};

export default reducer;
