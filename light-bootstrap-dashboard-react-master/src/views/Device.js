import React from "react";
import DeviceList from "./DeviceList.js";
import DeviceInfo from "./DeviceInfo.js";


var showInfo;
var setShowInfo;

var deviceName;
var setDeviceName;

var deviceUid;
var setDeviceUid;

var deviceDate;
var setDeviceDate;

function Device() {
  [showInfo, setShowInfo] = React.useState({togle: false});
  [deviceName, setDeviceName] = React.useState();
  [deviceUid, setDeviceUid] = React.useState();
  [deviceDate, setDeviceDate] = React.useState();
  return (showInfo.togle === false ? <DeviceList /> : <DeviceInfo name={deviceName} uid={deviceUid} date={deviceDate} />
  
  )
}

export default Device;
export {showInfo, setShowInfo,deviceUid,setDeviceUid,deviceName,setDeviceName,deviceDate,setDeviceDate};