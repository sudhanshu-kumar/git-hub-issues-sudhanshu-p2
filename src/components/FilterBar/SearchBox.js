import React from "react";
import "./FilterBox.css";
import TextField from "@material-ui/core/TextField";

const SearchBox = props => {
  return (
    <TextField
      label="Search..."
      onKeyDown={props.onKeyPress}
      margin="normal"
      variant="outlined"
    />
  );
  // return <input type="text" placeholder="search..." onKeyPress={props.onKeyPress} />;
};

export default SearchBox;
