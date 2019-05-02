import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchIssues,
  sortIssues,
  issuesByState,
  issuesByAuthor,
  issuesByLabel,
  searchIssues,
  pageChange
} from "./store/actions";
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

class App extends Component {
  handleSignIn = event => {
    console.log(event.target.innerHTML);
    Authentication(event.target);
  };

  handlePageChange = event => {
    this.props.history.push(`/${event.selected + 1}`);
    this.props.pageChange(event);
  };

  componentDidMount() {
    const page = this.props.match.params.pageNumber;
    if (page === undefined) this.props.history.push(`/1`);
    else this.props.fetchIssues(page);
  }

  render() {
    console.log("render", this.props.issues, "page", this.props.pageNumber, "error", this.props.error);
    if (!this.props.error) {
      return (
        <div className="App">
          <HeadContainer
            dataLength={this.props.issues.length}
            handleSignIn={this.handleSignIn}
          />
          <BrowserRouter>
            <Route
              path="/:pageNumber"
              component={() => {
                return (
                  <div>
                    <div className="search-filter-box">
                      <SearchBox
                        onKeyPress={event => this.props.searchIssues(event)}
                      />
                      <div className="filter-box">
                        <OpenClose issues={this.props.issues} />
                        <SortMenu
                          onChange={event => this.props.sortIssues(event)}
                        />
                        <StateMenu
                          onChange={event => this.props.issuesByState(event)}
                        />
                        <AuthorMenu
                          issues={this.props.issuesCopy}
                          onChange={event => this.props.issuesByAuthor(event)}
                        />
                        <LabelMenu
                          issues={this.props.issuesCopy}
                          onChange={event => this.props.issuesByLabel(event)}
                        />
                      </div>
                    </div>
                    {this.props.issues.map(issue => {
                      return <IssueList issue={issue} />;
                    })}
                    <div>
                      <Pagination
                        handlePageChange={this.handlePageChange}
                        forcePage={parseInt(this.props.pageNumber) - 1}
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
    } else {
      return (<h1>Data Fetch Error{this.props.error}</h1>);
    }
  }
}

const mapStateToProps = state => {
  return {
    issues: state.reducer.issues,
    issuesCopy: state.reducer.issuesCopy,
    pageNumber: state.reducer.pageNumber,
    error: state.reducer.error
  };
};

export default connect(
  mapStateToProps,
  {
    fetchIssues,
    sortIssues,
    issuesByState,
    issuesByAuthor,
    issuesByLabel,
    searchIssues,
    pageChange
  }
)(App);
