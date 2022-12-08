import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 60,
    label: "60%",
  },
  {
    value: 80,
    label: "80%",
  },
  {
    value: 100,
    label: "100%",
  },
];

// function valueLabelFormat(value) {
//   return marks.findIndex((mark) => mark.value === value) + 1;
// }

// function valuetext(value) {
//   return `${value}°C`;
// }

export default function RangeSlider(props) {
  const [value, setValue] = useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getSlider(newValue);
  };

  return (
    // 왜 사이즈가 안 바뀌냐
    <Box sx={{ width: 300 }}>
      <Slider
        size="lg"
        aria-label="lg"
        value={value}
        onChange={handleChange}
        // valueLabelFormat={valueLabelFormat}
        // getAriaValueText={valuetext}
        marks={marks}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
