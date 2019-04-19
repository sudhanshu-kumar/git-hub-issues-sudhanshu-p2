import React from "react";
import "./FilterBox.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SortMenu = props => {
  return (
    <FormControl>
      <InputLabel>Sort</InputLabel>
      <Select className="select-option" onChange={props.onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="recently updated">Recently Updated</MenuItem>
        <MenuItem value="least recently updated">Least Recently Updated</MenuItem>
      </Select>
    </FormControl>
    // <select defaultValue="sortBy" onChange={props.onChange}>
    //   <option value="sortBy">Sort By</option>
    //   <option value="newest">Newest</option>
    //   <option value="oldest">Oldest</option>
    //   <option value="recently updated">Recently Updated</option>
    //   <option value="least recently updated">Least Recently Updated</option>
    // </select>
  );
};

export default SortMenu;
