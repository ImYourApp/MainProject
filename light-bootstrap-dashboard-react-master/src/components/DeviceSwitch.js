import * as React from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
function ControlledSwitches(props) {
  let state = props.state == 'ON' ? true : false
  const [checked, setChecked] = React.useState(state);
  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
    setState(event.target.checked);
  };

  function setState(cstate){
    let s = cstate == true ? 'ON' : 'OFF';
    let deviceData = {
      no: props.uid,
      name: s,
      type: 'edit',
      select:'DEVICE_STATUS'
    }

    axios.post('http://127.0.0.1:3001/device', {
      data: deviceData
    })
      .then((res) => {
        // if (res.data.result == 'success') {
        //   alert('변경성공');
        // } else {
        //   alert('변경실패');
        // }

      }).catch(() => { console.log('살패') })
  }

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
export default ControlledSwitches;
