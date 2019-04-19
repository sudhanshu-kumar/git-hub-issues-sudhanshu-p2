import React from "react";
import "./HeadContainer.css";
import repoIcon from "../../assests/repo1.png";
// import { myToken } from "../../Auth";

const HeadContainer = props => {
  return (
    <div className="head-bar">
      <div className="title-box">
        <span>
          <img src={repoIcon} alt="repo-icon" />
          <h2 className="head-1">freeCodeCamp </h2>
          <h2 className="head-slash"> / </h2>
          <h2> freeCodeCamp</h2>
        </span>
        <button value="SignIn" onClick={props.handleSignIn}>
          {sessionStorage.getItem('myToken') ? "SignOut" : "SignIn"}
        </button>
      </div>
      <h5>
        Issues <span className="head-state">{props.dataLength}</span>
      </h5>
    </div>
  );
};

export default HeadContainer;
