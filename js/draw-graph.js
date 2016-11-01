

function drawGraph(data) {

  // delete all graph content
  $(".progress div").remove();
  $(".togo div").remove();

  var num_days = data.writing.daily_progress.length;
  num_days = getDaysFrom(data.writing.start_date);
  // calculate total words written
  var wordSum = 0;
  for (var i = 0; i < num_days; i++) {
    wordSum += data.writing.daily_progress[i];
  }

  var percent_progress = Math.floor(wordSum / data.writing["word_goal"] * 100);
  var days_remaining = data.writing["duration"] - num_days;
  if (num_days > data.writing["duration"]) {
    days_remaining = 0;
  }

  // set the width of the progress bar according to the percentage completed
  $(".nano-bar .progress").css("width", percent_progress + "%");
  $(".nano-bar .togo").css("width", (100 - percent_progress) + "%");
  // set the text for the progress overall
  $(".nano-bar .progress_status").text( num_spacify(wordSum, " ") + " words" );
  if (data.writing["word_goal"] - wordSum > 0){
    $(".nano-bar .remaining_status").text( num_spacify((data.writing["word_goal"] - wordSum)," ") + " words remaining" );
  } else {
    $(".nano-bar .remaining_status").text("");
  }
  var pace = Math.floor((data.writing["word_goal"] - wordSum) / days_remaining);
  $(".nano-bar .remaining_pace").text( pace + " words per day to meet goal" );

  // draw a div for each data point
  for (var i = 0; i < num_days; i++) {
    var newDiv = $("<div></div>");
    var newInner = $("<span></span>").text("day " + (i + 1) + ": " + data.writing.daily_progress[i] + " words");
    newDiv.append(newInner);
    // get width;
    var this_words = data.writing.daily_progress[i];
    var total_words = wordSum;
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
}
