import {useState} from "react";
// import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker(props) {
  const [value, setValue] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={(e) => {
          setValue(e);
          props.getTimer(e);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

// 기록용

// export default function BasicTimePicker(props) {
//   // const [value, setValue] = (React.useState < Dayjs) | (null > null);
//   const [value, setValue] = React.useState();

//   // function onFormSubmit(e) {
//   //   // e.preventDefault();
//   //   getTimer(e);
//   // }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <TimePicker
//         // getTimer={onFormSubmit}
//         value={value}
//         onChange={(e) => {
//           setValue(e);
//           props.getTimer(e);
//           // onFormSubmit(e);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//     </LocalizationProvider>
//   );
// }