import { useEffect, useState } from "react";
//Import installed modules
import "jquery/dist/jquery.js";
import $ from "jquery";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import "ion-rangeslider/js/ion.rangeSlider.min.js";

function SliderRange(props) {
  const [value, setValue] = useState();

  useEffect(() => {
    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 0,
      grid: true,
      skin: "big",
    });
  });
  return (
    <div>
      <input
        class="js-range-slider"
        type="range"
        name="range-slider"
        min="0"
        max="100"
        value={value}
        onChange={(e) => {
          setValue(e);
          props.getSlider(e);
        }}
      />
    </div>
  );
}
export default SliderRange;
