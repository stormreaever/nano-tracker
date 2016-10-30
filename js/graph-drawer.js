$(document).ready(function(){

  // define green colours for the bar
  var dark_green = {
    "h":160,
    "s":50,
    "b":30
  };
  var light_green = {
    "h":120,
    "s":40,
    "b":70
  };
  // define grey colours for the bar
  var dark_grey = {
    "h":120,
    "s":0,
    "b":80
  };
  var light_grey = {
    "h":120,
    "s":0,
    "b":95
  };

  console.log ('JQuery ready');
  // get JSON datd from the sample file
  var data = 'js/sample-data.json';

  drawGraph = function(path) {
    $.getJSON( path, function(data) {

      var text = data;

      console.log(text);


      var num_days = data.writing.daily_progress.length;
      // calculate total words written
      var sum = 0;
      for (var i = 0; i < num_days; i++) {
        sum += data.writing.daily_progress[i];
      }

      var percent_progress = Math.floor(sum / data.writing["word_goal"] * 100);

      console.log("word goal: " + data.writing["word_goal"]);
      console.log("total words: " + sum);
      console.log("percent progress: " + percent_progress);
      console.log("day " + num_days + " of " + data.writing["duration"]);
      var days_remaining = data.writing["duration"] - num_days;
      console.log(days_remaining);

      // set the width of the progress bar according to the percentage completed
      $(".nano-bar .progress").css("width", percent_progress + "%");
      $(".nano-bar .togo").css("width", (100 - percent_progress) + "%");
      // set the text for the progress overall
      $(".nano-bar .progress_status").text(sum + " words");
      $(".nano-bar .remaining_status").text( (data.writing["word_goal"] - sum) + " words remaining" );
      var pace = Math.floor((data.writing["word_goal"] - sum) / days_remaining);
      $(".nano-bar .remaining_pace").text( pace + " words for pace" );

      // draw a div for each data point
      for (var i = 0; i < num_days; i++) {
        var newDiv = $("<div></div>");
        var newInner = $("<span></span>").text("day " + (i + 1) + ": " + data.writing.daily_progress[i] + " words");
        newDiv.append(newInner);
        // get width;
        var this_words = data.writing.daily_progress[i];
        var total_words = sum;
        var div_width = this_words/total_words * 100;
        newDiv.css("width", div_width + "%"); // set width
        newDiv.css("background", colorMap(dark_green,light_green,i,num_days - 1)); // set bg colour
        $(".progress").append(newDiv);
      }
      // draw divs for the days remaining
      for (var i = 0; i < days_remaining; i++) {
        var newDiv = $("<div></div>");
        // get width;
        var div_width = 100/days_remaining;
        newDiv.css("width", div_width + "%"); // set width
        newDiv.css("background", colorMap(light_grey,dark_grey,i,days_remaining - 1)); // set bg colour
        $(".togo").append(newDiv);
      }
    });
  }

  // business loop

  drawGraph(data);



});
