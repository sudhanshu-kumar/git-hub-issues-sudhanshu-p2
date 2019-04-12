import React from "react";
import "./IssueList.css";
import moment from "moment";

const IssueList = props => {
  // console.log(props.issue);
  return (
    <div className="issue-box">
      <h4>
        <i class="material-icons">error_outline</i>
        {props.issue.title}{" "}
        {props.issue.labels.map(label => {
          return (
            <span style={{ background: "#" + label.color, padding: "2px" }}>
              {"  "} {label.name} {"  "}
            </span>
          );
        })}
      </h4>
      <p>
        <i class="material-icons">chat_bubble_outline</i> {props.issue.comments}
      </p>
      <h5>
        #{props.issue.number} Created {moment(props.issue.created_at).fromNow()}{" "}
        by {props.issue.user.login} last updated{" "}
        {moment(props.issue.updated_at).fromNow()}
      </h5>
    </div>
  );
};

export default IssueList;
