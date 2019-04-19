import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Fuse from "fuse.js";
import "./App.css";
import HeadContainer from "./components/HeadBar/HeadContainer";
import IssueList from "./components/IssueList/IssueList";
import SearchBox from "./components/FilterBar/SearchBox";
import OpenClose from "./components/FilterBar/OpenClose";
import SortMenu from "./components/FilterBar/SortMenu";
import StateMenu from "./components/FilterBar/StateMenu";
import AuthorMenu from "./components/FilterBar/AuthorMenu";
import LabelMenu from "./components/FilterBar/LabelMenu";
import Pagination from "./components/Pagination/Pagination";
import SingleIssue from "./components/SingleIssue/SingleIssue";
import { Authentication } from "./Auth";
// import firebase from "firebase";
// import provider from "./config/Fire";

class App extends Component {
  state = {
    issues: [],
    // myToken: undefined
    pageNumber: 0
  };
  issuesCopy = [];

  handleSignIn = event => {
    console.log(event.target.innerHTML);
    Authentication(event.target);
    // if (event.target.value === "SignIn") {
    //   Authentication().then(token => {
    //     console.log(token);
    //     this.setState({ myToken: token });
    //   });
    // }
    // if (event.target.value === "SignOut") {
    //   event.target.innerHTML = "SignIn";
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(function() {
    //       console.log("Sign-out successful.");
    //       this.setState({ myToken: undefined });
    //     })
    //     .catch(function(error) {
    //       // An error happened.
    //       console.log(error);
    //     });
    // }

    // const config = {
    //   apiKey: "AIzaSyA34lpwvWO93qhWdOY8ZNdUNsZCIslVxHA",
    //   authDomain: "git-hub-issues-sudhanshu-p2.firebaseapp.com",
    //   databaseURL: "https://git-hub-issues-sudhanshu-p2.firebaseio.com",
    //   projectId: "git-hub-issues-sudhanshu-p2",
    //   storageBucket: "git-hub-issues-sudhanshu-p2.appspot.com",
    //   messagingSenderId: "28678436101"
    // };
    // firebase.initializeApp(config);
    // var provider = new firebase.auth.GithubAuthProvider();
    // provider.addScope('repo');
    // provider.setCustomParameters({
    //   'allow_signup': 'false'
    // });
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(token, user);
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   // var errorCode = error.code;
    //   // var errorMessage = error.message;
    //   // // The email of the user's account used.
    //   // var email = error.email;
    //   // // The firebase.auth.AuthCredential type that was used.
    //   // var credential = error.credential;
    //   // ...
    // });
  };

  handleSort = event => {
    if (event.target.value === "") {
      this.setState({ issues: this.issuesCopy });
    }
    if (event.target.value === "newest") {
      const newIssues = [...this.issuesCopy].sort((issue1, issue2) => {
        return (
          new Date(issue2.created_at).getTime() -
          new Date(issue1.created_at).getTime()
        );
      });

      this.setState({ issues: newIssues });
    }
    if (event.target.value === "oldest") {
      const oldIssues = [...this.issuesCopy].sort((issue1, issue2) => {
        return (
          new Date(issue1.created_at).getTime() -
          new Date(issue2.created_at).getTime()
        );
      });
      console.log(oldIssues);
      this.setState({ issues: oldIssues });
    }
    if (event.target.value === "recently updated") {
      const recentIssues = [...this.issuesCopy].sort((issue1, issue2) => {
        return (
          new Date(issue2.updated_at).getTime() -
          new Date(issue1.updated_at).getTime()
        );
      });
      this.setState({ issues: recentIssues });
    }
    if (event.target.value === "least recently updated") {
      const leastRecentIssues = [...this.issuesCopy].sort((issue1, issue2) => {
        return (
          new Date(issue1.updated_at).getTime() -
          new Date(issue2.updated_at).getTime()
        );
      });
      this.setState({ issues: leastRecentIssues });
    }
  };

  handleState = event => {
    if (event.target.value === "") {
      this.setState({ issues: this.issuesCopy });
    } else {
      const openIssues = [...this.issuesCopy].filter(issue => {
        return issue.state === event.target.value;
      });
      this.setState({ issues: openIssues });
    }
    // if (event.target.value === "open") {
    //   const openIssues = issuesData.filter(issue => {
    //     return issue.state === "open";
    //   });
    //   this.setState({ issues: openIssues });
    // }
    // if (event.target.value === "close") {
    //   const closeIssues = issuesData.filter(issue => {
    //     return issue.state === "close";
    //   });
    //   this.setState({ issues: closeIssues });
    // }
  };

  handleAuthor = event => {
    const filteredByAuthor = this.issuesCopy.filter(issue => {
      return issue.user.login === event.target.value;
    });
    this.setState({ issues: filteredByAuthor });
    if (event.target.value === "") {
      this.setState({ issues: this.issuesCopy });
    }
  };

  handleLabel = event => {
    const filteredByLabel = this.issuesCopy.filter(issue => {
      let available = false;
      issue.labels.forEach(label => {
        if (label.name === event.target.value) {
          available = true;
        }
      });
      return available;
    });
    this.setState({ issues: filteredByLabel });
    if (event.target.value === "") {
      this.setState({ issues: this.issuesCopy });
    }
  };

  handleSearch = event => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        this.setState({ issues: this.issuesCopy });
      } else {
        const options = {
          keys: ["title"]
        };
        const fuse = new Fuse(this.issuesCopy, options);
        const result = fuse.search(event.target.value);
        this.setState({ issues: result });
      }
    }
  };

  handlePageChange = event => {
    this.props.history.push(`/${event.selected + 1}`);
    console.log(event);
    fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=${event.selected +
        1}`
    )
      .then(res => res.json())
      .then(data => {
        this.issuesCopy = data;
        this.setState({ issues: data, pageNumber: event.selected });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    console.log("comonent did mount");
    const page = this.props.match.params.pageNumber;
    console.log(page);
    fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.issuesCopy = data;
        this.setState({ issues: data, pageNumber: page });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log("render", this.props);
    return (
      <div className="App">
        <HeadContainer
          dataLength={this.state.issues.length}
          handleSignIn={this.handleSignIn}
        />
        <BrowserRouter>
          <Route
            path="/:pageNumber"
            component={() => {
              return (
                <div>
                  <div className="search-filter-box">
                    <SearchBox onKeyPress={this.handleSearch} />
                    <div className="filter-box">
                      <OpenClose issues={this.state.issues} />
                      <SortMenu onChange={this.handleSort} />
                      <StateMenu onChange={this.handleState} />
                      <AuthorMenu
                        issues={this.state.issues}
                        onChange={this.handleAuthor}
                      />
                      <LabelMenu
                        issues={this.state.issues}
                        onChange={this.handleLabel}
                      />
                    </div>
                  </div>
                  {this.state.issues.map(issue => {
                    return <IssueList issue={issue} />;
                  })}
                  <div>
                    <Pagination
                      handlePageChange={this.handlePageChange}
                      forcePage={this.state.pageNumber}
                    />
                  </div>
                </div>
              );
            }}
            exact
          />
          <Route path="/issues/:number" component={SingleIssue} exact />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
