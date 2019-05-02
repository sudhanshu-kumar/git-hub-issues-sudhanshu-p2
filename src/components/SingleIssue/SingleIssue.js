import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchIssue,
  onChange,
  addComment,
  deleteComment
} from "../../store/actions";
import "./SingleIssue.css";
import moment from "moment";

class SingleIssue extends Component {
  handleButton = event => {
    console.log(event.target.value);
    const myToken = sessionStorage.getItem("myToken");
    console.log("singleissue", myToken);
    if (!sessionStorage.getItem("myToken")) {
      window.alert("Login First");
      return;
    }
    const comment = this.props.commentText;
    const number = this.props.match.params.number;
    this.props.addComment(number, myToken, comment, this.props.comments);
    document.getElementById("add-comment").value = "";
  };

  handleDelete = event => {
    const commentId = event.target.id;
    const myToken = sessionStorage.getItem("myToken");
    console.log("singleissue", myToken);
    if (!sessionStorage.getItem("myToken")) {
      window.alert("Login First");
      return;
    }
    this.props.deleteComment(commentId, myToken, this.props.comments);
  };

  componentDidMount() {
    console.log("comonent did mount");
    console.log(this.props);
    const { number } = this.props.match.params;
    console.log(number);
    console.log("singleissue", sessionStorage.getItem("myToken"));
    this.props.fetchIssue(number);
  }
  
  render() {
    console.log(this.props.issues, this.props.comments);
    if (this.props.issue && this.props.comments) {
      const { title, user, created_at, comments, body } = this.props.issue;
      return (
        <div className="single-issue-box">
          <div className="head-box">
            <h1>
              {title}
              <span>#{this.props.match.params.number}</span>
            </h1>
            <div className="head-content">
              <span className="state">{this.props.issue.state} </span>
              <span className="user-name">{user.login} </span>
              <span>opened this issue {moment(created_at).fromNow()} </span>
              <span>{comments} comments</span>
            </div>
          </div>
          <div className="body-box">
            <img src={user.avatar_url} alt="profile-img" />
            <span>
              <div className="body-head">
                <span className="user-name">{user.login} </span>
                <span>commented {moment(created_at).fromNow()} </span>
              </div>
            </span>
            <div className="body">{body}</div>
            {this.props.comments.map(comment => {
              return (
                <div>
                  <img src={comment.user.avatar_url} alt="profile-img" />
                  <span>
                    <div className="comment-head">
                      <span className="user-name">{comment.user.login} </span>
                      <span>
                        commented {moment(comment.created_at).fromNow()}{" "}
                      </span>
                    </div>
                  </span>
                  <div className="body">
                    {comment.body}
                    {comment.user.login === "sudhanshu-kumar" &&
                    sessionStorage.getItem("myToken") ? (
                      <button id={comment.id} onClick={this.handleDelete}>
                        Delete
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add-comment-box">
            <textarea
              id="add-comment"
              onChange={event => this.props.onChange(event)}
              className="add-comment-field"
              placeholder="Add comment"
            />
            <span>
              <button onClick={this.handleButton}>Add Comment</button>
            </span>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    issue: state.singleIssueReducer.issue,
    comments: state.singleIssueReducer.comments,
    commentText: state.singleIssueReducer.commentText
  };
};

export default connect(
  mapStateToProps,
  { fetchIssue, onChange, addComment, deleteComment }
)(SingleIssue);
