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
        "title" : "Nano Project",
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

  $('#button-expand').click(function(event) { // toggle the expand menu
    $('.project-info-edit').slideToggle(200);
    refreshScreen();
    drawBoxes(dataObj);
    $('#word-tracker input').bind("change", refreshScreen);
  });
  $('input.word_count').change(function() { // when form is submitted, save the data
    refreshScreen();
  });

  $('#project-info button#save-info').click(function(event) { // when form is submitted, save the data
    closeExpand();
    refreshScreen();
    drawBoxes(dataObj);
    $('#word-tracker input').bind("change", refreshScreen);
    event.preventDefault();
    return false;
  });
  $('input.word_count').change(function() { // when form is submitted, save the data
    refreshScreen();
  });

  function refreshScreen() {
    updateDataObj();
    drawGraph(dataObj);
    saveData(dataObj);
  }

  function closeExpand() {
    console.log('closed');
    if ($(".project-info-edit").is( ":visible" )){
      $(".project-info-edit").toggle(200);
        console.log('toggled');
    }
  }

  // update the data object with current data
  function updateDataObj() {
    var ms_start_date = Date.parse($( "#start-date" ).val());
    var newObj = {
      "writing":{
        "title" : $( "#project-title" ).val(),
        "word_goal" : $( "#target-length" ).val(),
        "duration" : $( "#duration" ).val(),
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
    start_date = addDays(data.writing.start_date,0);

    var start_dateString = start_date.getFullYear() + '-' + leadingZero(start_date.getMonth()+1) + '-' + leadingZero(start_date.getDate() );

    $( "input#project-title" ).val(data.writing.title);
    $( ".bar-title" ).text(data.writing.title);
    $( "input#target-length" ).val(data.writing.word_goal);
    $( ".bar-words" ).text(num_spacify(data.writing.word_goal, " ") + " words");
    $( "input#duration" ).val(data.writing.duration);
    $( ".bar-days" ).text(num_spacify(data.writing.duration, " ") + " days");
    $( "input#start-date" ).val(start_dateString);
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
      newCount.append('<p><input type="number" class="word_count" id="count-day-' + i + '" name="count-day-' + i + '" value="' + word_counts[i] + '" /></p>');



      $("#word-tracker").append(newCount);
    }

  }

});
