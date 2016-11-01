$(document).ready(function(){

  // populate boxes

  // business loop

var dataObj;

  if (localStorage.getItem("writing")) {
    // get the JSON data from the localStorage
    dataObj = JSON.parse( localStorage.getItem("writing") );
    if (isNaN(dataObj.writing.start_date)) {
      setDefaultData();
    }
  } else {
    // set a default data set
    setDefaultData();
  }

  function setDefaultData() {
    dataObj = {
      "writing":{
        "word_goal" : 50000,
        "duration" : 30,
        "start_date" : Date.parse('2016-11-01'),
        "daily_progress" : [
          0
        ]
      }
    };
  }


  drawBoxes(dataObj);

  drawGraph(dataObj);


  $('#project-info').submit(function(event) { // when form is submitted, save the data
    var newDate = $( "#start-date" ).val();
    updateDataObj();
    drawBoxes(dataObj);
    drawGraph(dataObj);
    saveData(dataObj);
    event.preventDefault();
  });
  $('input.word_count').change(function() { // when form is submitted, save the data
    updateDataObj()
    drawGraph(dataObj);
    saveData(dataObj);
  });

  // update the data object with current data
  function updateDataObj() {
    var ms_start_date = Date.parse($( "#start-date" ).val());
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

    var start_dateString = start_date.getFullYear() + '-' + leadingZero(start_date.getMonth() + 1) + '-' + leadingZero(start_date.getDate() + 1);

    $( "input:text[name=target-length]" ).val(data.writing.word_goal);
    $( "input:text[name=duration]" ).val(data.writing.duration);
    $( "#start-date" ).val(start_dateString);
    document.getElementById("start-date").value = start_dateString;

    // remove word count boxes
    $("#word-tracker div").remove();

    // draw boxes in the in word tracker form with object data in it
    var word_counts = data.writing.daily_progress;

    for (var i = getDaysFrom(data.writing.start_date) - 1; i >= 0; i--) {
      //create div
      var newCount = $("<div></div>");
      // add a title
      var objStartDate = new Date(data.writing.start_date);
      var thisDate = addDays(objStartDate,i);
      thisDateString = monthName(thisDate.getMonth()) + " " + thisDate.getDate();
      newCount.append("<h4>" + thisDateString + "</h4>");
      // add an input box
      newCount.append('<p><input type="text" class="word_count" id="count-day-' + i + '" name="count-day-' + i + '" value="' + word_counts[i] + '" /></p>');


      $("#word-tracker").append(newCount);
    }
  }

});
