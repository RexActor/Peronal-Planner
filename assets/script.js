//getting main container and span for time/date display on main page
var currentDay = $("#currentDay");
var mainBlock = $(".container");

//variables to have dynamically generated hours and able to easy change values

var startingHour = 9;
var finishHour = 17;

var localStoredItems = [];

//get today's date and display on page in specific format
function getTodaysDate() {
  currentDay.text(dayjs().format("dddd D [of] MMMM YYYY"));
}
getTodaysDate();

function generateDailyHours() {
  //checks if user used wrong values in starting hour and finish hour
  //if so, then starting and finish hour is being set to max available value
  if (startingHour < 0) {
    startingHour = 0;
  }
  if (finishHour > 23) {
    finishHour = 23;
  }

  var currentTime = dayjs().format("HH");
  console.log(currentTime);
  for (var i = startingHour; i <= finishHour; i++) {
    //creating main TimeBlock element
    var timeBlock = $("<div>");
    //creating save button element
    var saveButton = $("<button>");
    //creating <i> element where save icon will be displayed
    var saveBtnIcon = $("<i>");
    //creating element where time will be displayed
    var timeDiv = $("<div>");
    //creating time display element
    var timeSpan = $("<span>");
    //creating textarea element
    var textArea = $("<textarea>");

    //adding classes to timeDiv
    timeDiv.addClass("col-md-1 hour");

    //adding text to timeSpan to display time
    timeSpan.text(`${i}:00`);
    //adding timeSpan element to timeDiv element as it's child
    timeDiv.append(timeSpan);

    //adding class to <i> to display save icon

    saveBtnIcon.addClass("fa fa-save");
    //adding saveIcon element to button element as it's child
    saveButton.append(saveBtnIcon);

    //adding classes to save button
    saveButton.addClass("col-md-1 saveBtn");
    saveButton.attr("data-time", i);
    saveBtnIcon.attr("data-time", i);
    saveButton.click(saveEntry);

    //adding classes to textarea
    textArea.addClass("col-md-10 description");

    //based on current local time adding additional class to textarea to show
    //if current time is in past, future or is present
    if (currentTime == i) {
      textArea.addClass("present");
    }
    if (currentTime > i) {
      textArea.addClass("past");
    }
    if (currentTime < i) {
      textArea.addClass("future");
    }

    //adding generated elements to timeBlock Div

    timeBlock.append(timeDiv);
    timeBlock.append(textArea);
    timeBlock.append(saveButton);
    timeBlock.addClass("row time-block");

    //adding timeBlock Element to main block as child
    mainBlock.append(timeBlock);
  }
}

generateDailyHours();

function saveEntry(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  var target = e.target;
  var timeSave = $(target).attr("data-time");
  //traversing tree to get parent element from clicked button and accessing textarea element to get it's value
  var entryDesc = $(target.parentElement.children[1]).val();

  var dailyActivity = {
    time: timeSave,
    description: entryDesc,
  };
  localStoredItems.push(dailyActivity);
  localStorage.setItem("dailyActivity", JSON.stringify(localStoredItems));
}

function getSavedEntries() {}
