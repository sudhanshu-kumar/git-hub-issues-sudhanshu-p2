import React from "react";
import "./FilterBox.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const LabelMenu = props => {
  const labels = props.issues.reduce((acc, issue) => {
    issue.labels.forEach(label => acc.push(label.name));
    return acc;
  }, []);
  const uniquelabels = [...new Set(labels)];
  return (
    <FormControl>
      <InputLabel>Filter By Label</InputLabel>
      <Select className="select-option" onChange={props.onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {uniquelabels.map(label => {
          return <MenuItem value={label}>{label}</MenuItem>;
        })}
      </Select>
    </FormControl>
    // <select defaultValue="label" onChange={props.onChange}>
    //   <option value="label">Label</option>
    //   {uniquelabels.map(label => {
    //     return <option value={label}>{label}</option>;
    //   })}
    // </select>
  );
};

export default LabelMenu;
