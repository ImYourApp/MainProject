import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({ sTime, setStime }) {
  const [strvalue, setStrValue] = React.useState();
  const [endvalue, setEndValue] = React.useState();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="루틴 시작시간"
        defaultValue={strvalue}
        onChange={(newValue) => {
          setStrValue(newValue);
          console.log(newValue);
        }}
        id="startTime"
        renderInput={(params) => <TextField {...params} />}
      />
      <TimePicker
        label="루틴 종료시간"
        defaultValue={endvalue}
        onChange={(newValue) => {
          setEndValue(newValue);
          console.log(newValue);
        }}
        id="endTime"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
