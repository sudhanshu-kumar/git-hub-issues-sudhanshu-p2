import React, { Component } from "react";
import "./SingleIssue.css";
import moment from "moment";
// import { myToken } from "../../Auth";
// import ReactMarkDown from "react-markdown";
// const ReactMarkdown = require('react-markdown')

class SingleIssue extends Component {
  state = {
    issue: undefined,
    comments: undefined,
    commentText: ""
  };

  handleOnchange = event => {
    console.log(event.target.value);
    this.setState({ commentText: event.target.value });
  };

  handleButton = event => {
    console.log(event.target.value);
    const myToken = sessionStorage.getItem('myToken');
    console.log("singleissue", myToken);
    // if (!myToken) {
      if(!sessionStorage.getItem("myToken")) {
      window.alert("Login First");
      return;
    }
    // let comment = { user: {} };
    // comment.user.login = "Sudhanhu Kumar";
    // comment.user.id =
    //   this.state.comments[this.state.comments.length - 1].user.id + 1;
    // comment.user.avatar_url =
    //   "https://avatars2.githubusercontent.com/u/5313213?v=4";
    // comment.body = this.state.commentText;
    // comment.created_at = new Date();
    // let commentCopy = [...this.state.comments];
    // commentCopy.push(comment);
    // this.setState({ comments: commentCopy, commentText: null });
    const comment = this.state.commentText;
    let commentCopy = [...this.state.comments];
    fetch(
      `https://api.github.com/repos/jacky1205/testReact/issues/${
        this.props.match.params.number
      }/comments?access_token=${myToken}`,
      {
        method: "POST",
        body: JSON.stringify({ body: comment })
      }
    )
      .then(response => response.json())
      .then(data => {
        commentCopy.push(data);
        this.setState({ comments: commentCopy, commentText: null });
        document.getElementById("add-comment").value = "";
      })
      .catch(error => console.error(error));

    // document.getElementsByClassName("add-comment-field")[0].value("");
  };

  handleDelete = async event => {
    // const { number } = this.props.match.params;
    const commentId = event.target.id;
    const myToken = sessionStorage.getItem('myToken');
    console.log("singleissue", myToken);
    // if (!myToken) {
      if(!sessionStorage.getItem("myToken")) {
      window.alert("Login First");
      return;
    }
    const { status } = await fetch(
      `https://api.github.com/repos/jacky1205/testReact/issues/comments/${
        event.target.id
      }?access_token=${myToken}`,
      {
        method: "DELETE"
      }
    ).catch(error => {
      console.error(error);
      alert("something went wrong", error);
    });
    if (status === 204) {
      const comments = this.state.comments.filter(
        comment => comment.id !== parseInt(commentId)
      );
      this.setState({ comments });
    }
    // await fetch(
    //   `https://api.github.com/repos/jacky1205/testReact/issues/${number}/comments`
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ comments: data });
    //     console.log("comments", data);
    //   })
    //   .catch(err => console.log(err));
  };

  async componentDidMount() {
    console.log("comonent did mount");
    const { number } = this.props.match.params;
    console.log(number);
    console.log("singleissue", sessionStorage.getItem("myToken"));
    await fetch(
      `https://api.github.com/repos/jacky1205/testReact/issues/${number}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ issue: data });
        // console.log(data);
      })
      .catch(err => console.log(err));

    await fetch(
      `https://api.github.com/repos/jacky1205/testReact/issues/${number}/comments`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data });
        console.log("comments", data);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.issue && this.state.comments) {
      const { title, user, created_at, comments, body } = this.state.issue;
      //   const { login } = this.state.issue.user;
      return (
        <div className="single-issue-box">
          <div className="head-box">
            <h1>
              {title}
              <span>#{this.props.match.params.number}</span>
            </h1>
            <div className="head-content">
              <span className="state">{this.state.issue.state} </span>
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
            {this.state.comments.map(comment => {
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
                    {(comment.user.login === "sudhanshu-kumar" && sessionStorage.getItem("myToken")) ? (
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
              onChange={this.handleOnchange}
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
      return <h1>Loading...{this.props.token}</h1>;
    }
  }
}

export default SingleIssue;
