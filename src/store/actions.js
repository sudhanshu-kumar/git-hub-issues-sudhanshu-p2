import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchIssues = page => {
  return dispatch => {
    axios
      .get(
        `https://api.github.com/repos/jacky1205/testReact/issues?page=${page}`
      )
      .then(response => {
        dispatch({
          type: actionTypes.FETCH_ISSUES_SUCCESS,
          payload: { data: response.data, page }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.FETCH_REJECTED, payload: { err } });
      });
  };
};

export const sortIssues = event => {
  return dispatch => {
    dispatch({ type: actionTypes.SORT_ISSUES, payload: { event } });
  };
};

export const issuesByState = event => {
  return dispatch => {
    dispatch({ type: actionTypes.ISSUES_STATE, payload: { event } });
  };
};

export const issuesByAuthor = event => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTHOR_ISSUES, payload: { event } });
  };
};

export const issuesByLabel = event => {
  return dispatch => {
    dispatch({ type: actionTypes.LABEL_ISSUES, payload: { event } });
  };
};

export const searchIssues = event => {
  return dispatch => {
    dispatch({ type: actionTypes.SEARCH_ISSUES, payload: { event } });
  };
};

export const pageChange = event => {
  return dispatch => {
    axios
      .get(
        `https://api.github.com/repos/jacky1205/testReact/issues?page=${event.selected +
          1}`
      )
      .then(response => {
        dispatch({
          type: actionTypes.FETCH_ISSUES_SUCCESS,
          payload: { data: response.data, page: event.selected + 1 }
        });
      })
      .catch(err =>
        dispatch({ type: actionTypes.FETCH_REJECTED, payload: err })
      );
  };
};

export const fetchIssue = number => {
  return dispatch => {
    axios
      .get(`https://api.github.com/repos/jacky1205/testReact/issues/${number}`)
      .then(issue => {
        console.log(issue.data);
        axios
          .get(
            `https://api.github.com/repos/jacky1205/testReact/issues/${number}/comments`
          )
          .then(comments => {
            console.log(comments.data);
            dispatch({
              type: actionTypes.FETCH_ISSUE_SUCCESS,
              payload: { issueData: issue.data, commentsData: comments.data }
            });
          })
          .catch(err => {
            dispatch({ type: actionTypes.FETCH_REJECTED, payload: err });
          });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_REJECTED, payload: err });
      });
  };
};

export const onChange = event => {
  return dispatch => {
    dispatch({ type: actionTypes.ON_CHANGE, payload: { event } });
  };
};

export const addComment = (number, myToken, comment, comments) => {
  return dispatch => {
    axios
      .post(
        `https://api.github.com/repos/jacky1205/testReact/issues/${number}/comments?access_token=${myToken}`,
        { body: comment }
      )
      .then(newComment => {
        const updatedComments = comments.concat(newComment.data);
        console.log(newComment.data);
        dispatch({
          type: actionTypes.ADD_COMMENT,
          payload: { updatedComments }
        });
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_REJECTED, payload: err });
      });
  };
};

export const deleteComment = (commentId, myToken, comments) => {
  return dispatch => {
    axios
      .delete(
        `https://api.github.com/repos/jacky1205/testReact/issues/comments/${commentId}?access_token=${myToken}`
      )
      .then(response => {
        if (response.status === 204) {
          const updatedComments = comments.filter(
            comment => comment.id !== parseInt(commentId)
          );
          dispatch({
            type: actionTypes.DELETE_COMMENT,
            payload: { updatedComments }
          });
        }
      });
  };
};
