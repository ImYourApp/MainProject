import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker(props) {
  // const [value, setValue] = (React.useState < Dayjs) | (null > null);
  const getTimer = props.getTimer;
  const [value, setValue] = React.useState();

  function onFormSubmit(e) {
    e.preventDefault();
    getTimer(value);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        getTimer={onFormSubmit}
        value={value}
        onChange={(e) => {
          onFormSubmit(e.target.value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
