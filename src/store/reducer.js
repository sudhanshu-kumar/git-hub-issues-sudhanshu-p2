// import * as actionTypes from "./actions";
import * as actionTypes from "./actionTypes";
import Fuse from "fuse.js";

const intitialState = {
  issues: [],
  issuesCopy: [],
  pageNumber: 0,
  error: undefined
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISSUES_SUCCESS: {
      return {
        ...state,
        issues: action.payload.data,
        issuesCopy: action.payload.data,
        pageNumber: action.payload.page
      };
    }
    case actionTypes.FETCH_REJECTED: {
      return {
        ...state,
        error: action.payload.err
      };
    }
    case actionTypes.SORT_ISSUES:
      {
        console.log(action.payload.event.target.value);
        const { event } = action.payload;
        if (event.target.value === "newest") {
          const newIssues = [...state.issues].sort((issue1, issue2) => {
            return (
              new Date(issue2.created_at).getTime() -
              new Date(issue1.created_at).getTime()
            );
          });
          return {
            ...state,
            issues: newIssues
          };
        }
        if (event.target.value === "oldest") {
          const oldIssues = [...state.issues].sort((issue1, issue2) => {
            return (
              new Date(issue1.created_at).getTime() -
              new Date(issue2.created_at).getTime()
            );
          });
          return {
            ...state,
            issues: oldIssues
          };
        }
        if (event.target.value === "recently updated") {
          const recentIssues = [...state.issues].sort((issue1, issue2) => {
            return (
              new Date(issue2.updated_at).getTime() -
              new Date(issue1.updated_at).getTime()
            );
          });
          return {
            ...state,
            issues: recentIssues
          };
        }
        if (event.target.value === "least recently updated") {
          const leastRecentIssues = [...state.issues].sort((issue1, issue2) => {
            return (
              new Date(issue1.updated_at).getTime() -
              new Date(issue2.updated_at).getTime()
            );
          });
          return {
            ...state,
            issues: leastRecentIssues
          };
        }
        if (event.target.value === "") {
          return { ...state, issues: state.issuesCopy };
        }
      }
      break;
    case actionTypes.ISSUES_STATE:
      {
        console.log(action.payload.event.target.value);
        const { event } = action.payload;
        if (event.target.value === "open") {
          const openIssues = state.issuesCopy.filter(issue => {
            return issue.state === event.target.value;
          });
          return { ...state, issues: openIssues };
        }
        if (event.target.value === "close") {
          const closeIssues = state.issuesCopy.filter(issue => {
            return issue.state === event.target.value;
          });
          return { ...state, issues: closeIssues };
        }
        if (event.target.value === "") {
          return { ...state, issues: state.issuesCopy };
        }
      }
      break;
    case actionTypes.AUTHOR_ISSUES: {
      const { event } = action.payload;
      if (event.target.value === "") {
        return { ...state, issues: state.issuesCopy };
      }
      const filteredByAuthor = state.issuesCopy.filter(issue => {
        return issue.user.login === event.target.value;
      });
      return { ...state, issues: filteredByAuthor };
    }

    case actionTypes.LABEL_ISSUES: {
      const { event } = action.payload;
      console.log(event.target.value);
      if (event.target.value === "") {
        return { ...state, issues: state.issuesCopy };
      } else {
        const filteredByLabel = state.issuesCopy.filter(issue => {
          let available = false;
          issue.labels.forEach(label => {
            if (label.name === event.target.value) {
              available = true;
            }
          });
          return available;
        });
        return { ...state, issues: filteredByLabel };
      }
    }

    case actionTypes.SEARCH_ISSUES: {
      const { event } = action.payload;
      if (event.key === "Enter") {
        if (event.target.value === "") {
          return { ...state, issues: state.issuesCopy };
        } else {
          const options = {
            keys: ["title"]
          };
          const fuse = new Fuse(state.issues, options);
          const result = fuse.search(event.target.value);
          return { ...state, issues: result };
        }
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
//21118895
