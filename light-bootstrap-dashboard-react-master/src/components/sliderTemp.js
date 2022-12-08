import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: -10,
    label: "-10°C",
  },
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 10,
    label: "10°C",
  },
  {
    value: 20,
    label: "20°C%",
  },
  {
    value: 30,
    label: "30°C",
  },
  {
    value: 40,
    label: "40°C",
  },
];

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function RangeSlider() {
  function valuetext(value) {
    return `${value}°C`;
  }
  const [value, setValue] = useState([-10, -10]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // 왜 사이즈가 안 바뀌냐
    <Box sx={{ width: 300 }}>
      <Slider
        min={-10}
        max={40}
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
