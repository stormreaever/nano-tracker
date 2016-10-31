$(document).ready(function(){

  // populate boxes

  // business loop


  if (localStorage.getItem("writing")) {
    // get the JSON data from the localStorage
    var dataObj = JSON.parse( localStorage.getItem("writing") );
  } else {
    // set a default data set
    var dataObj = {
      "writing":{
        "word_goal" : 50000,
        "duration" : 30,
        "start_date" : Date.parse('Nov 1, 2016'),
        "daily_progress" : [
          0
        ]
      }
    };
  }


  drawBoxes(dataObj);

  drawGraph(dataObj);


  $('#project-info').submit(function(event) { // when form is submitted, save the data
    updateDataObj()
    drawBoxes(dataObj);
    drawGraph(dataObj);
    saveData(dataObj);
    event.preventDefault();
  });

  // update the data object with current data
  function updateDataObj() {
    var ms_start_date = Date.parse($( "input:text[name=start-date]" ).val());

    var newObj = {
      "writing":{
        "word_goal" : $( "input:text[name=target-length]" ).val(),
        "duration" : $( "input:text[name=duration]" ).val(),
        "start_date" : ms_start_date,
        "daily_progress" : [
        ]
      }
    };

    for (var i = 0; i < getDaysFrom(ms_start_date) + 1; i++) { //number of days since start date
      word_count = $( "#count-day-" + i).val();
      if (isNaN(word_count)) {
        word_count = 0;
      }
      newObj.writing.daily_progress.push(parseInt(word_count));
    }

    dataObj = newObj;
  }


  function saveData(saveObj) {
    var saveObjString = JSON.stringify(saveObj);
    localStorage.setItem("writing", saveObjString);
  }



  function drawBoxes(data) {

    // populate boxes with JSON data
    var start_date = new Date(data.writing.start_date);

    var start_dateString = monthName(start_date.getMonth()) + " " + start_date.getDate() + ", " + start_date.getFullYear();

    $( "input:text[name=target-length]" ).val(data.writing.word_goal);
    $( "input:text[name=duration]" ).val(data.writing.duration);
    $( "input:text[name=start-date]" ).val(start_dateString);


    // remove word count boxes
    $("#word-tracker div").remove();

    // draw boxes in the in word tracker form with object data in it
    var word_counts = data.writing.daily_progress;

    for (var i = 0; i < getDaysFrom(data.writing.start_date) + 1; i++) {
      //create div
      var newCount = $("<div></div>");
      // add a title
      var objStartDate = new Date(data.writing.start_date);
      var thisDate = addDays(objStartDate,i);
      thisDateString = monthName(thisDate.getMonth()) + " " + thisDate.getDate() + ", " + thisDate.getFullYear();
      newCount.append("<h4>" + thisDateString + "</h4>");
      // add an input box
      newCount.append('<p><input type="text" id="count-day-' + i + '" name="count-day-' + i + '" value="' + word_counts[i] + '" /></p>');


      $("#word-tracker").append(newCount);
    }
  }

});
