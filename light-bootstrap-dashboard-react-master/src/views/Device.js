import React from "react";
import DeviceList from "./DeviceList.js";
// import OldIcons, {showInfo1 as oldIcons_showInfo} from "./oldIcons.js";
import DeviceInfo from "./DeviceInfo.js";


var showInfo;
var setShowInfo;


function Device() {
  [showInfo, setShowInfo] = React.useState({togle: false});

  // console.log(oldIcons_showInfo.togle);
  // console.log(showInfo.togle);
  return (showInfo.togle === false ? <DeviceList /> : <DeviceInfo />
  
  )
}

export default Device;
export {showInfo, setShowInfo};