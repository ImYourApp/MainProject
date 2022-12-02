import React from 'react';
//Import installed modules
import 'jquery/dist/jquery.js';
import $ from 'jquery';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';


class SliderRange extends React.Component
{
  
  componentDidMount(){
    $(".js-range-slider").ionRangeSlider({   
    type:"double",    
    grid: true,
    skin: "big"});
  }
  render()
  {
    return (
      <div>
        
        <input type="text" class="js-range-slider" name="my_range" value="" />
         
       
      </div>  
) } }
 export default SliderRange;