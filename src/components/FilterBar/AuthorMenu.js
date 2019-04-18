import React from "react";
import "./FilterBox.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const AuthorMenu = props => {
  const authors = props.issues.map(issue => {
    return issue.user.login;
  });
  const uniqueAuthors = [...new Set(authors)];
  return (

    <FormControl>
      <InputLabel>Filter By Author</InputLabel>
      <Select className="select-option" onChange={props.onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {uniqueAuthors.map(author => {
          return <MenuItem value={author}>{author}</MenuItem>;
        })}
      </Select>
    </FormControl>
    // <select defaultValue="author" onChange={props.onChange}>
    //   <option value="author">Author</option>
    //   {uniqueAuthors.map(author => {
    //     return <option value={author}>{author}</option>;
    //   })}
    // </select>
  );
};

export default AuthorMenu;
