import React from "react";
import "./FilterBox.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const StateMenu = props => {
  return (
    <FormControl>
      <InputLabel>Filter By State</InputLabel>
      <Select className="select-option" onChange={props.onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="close">Close</MenuItem>
      </Select>
    </FormControl>

    // <select defaultValue="state" onChange={props.onChange}>
    //   <option value="state">State</option>
    //   <option value="open">Open</option>
    //   <option value="close">Close</option>
    // </select>
  );
};

export default StateMenu;
