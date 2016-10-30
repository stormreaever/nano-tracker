function colorMap (color1, color2, this_step, total_steps) {
  // funtion that takes 2 HSL/HSB color arrays and returns a colour that is at a point in the middle as determined by this_step and total_steps
  // colorMap(black,white,1,3) returns black
  // colorMap(black,white,2,3) returns middle grey
  // colorMap(black,white,3,3) returns white

  var colorStep = {
    "h":0,
    "s":0,
    "b":0
  }

  function getStep(value1,value2) {
    var delta = value2 - value1;
    var stepPercent = this_step / total_steps * 1.000;
    return(value1 + delta*stepPercent);
  }
  colorStep["h"] = getStep(color1["h"],color2["h"]);
  colorStep["s"] = getStep(color1["s"],color2["s"]);
  colorStep["b"] = getStep(color1["b"],color2["b"]);

  return hsbToString(colorStep);
}

function hsbToString(hsbObject) {
  var newString = "hsl(" + hsbObject["h"] + "," + hsbObject["s"] + "%," + hsbObject["b"] + "%)";
  return newString;
}
