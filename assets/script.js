var currentDay = $("#currentDay");
var mainBlock = $(".container");

var startingHour = 9;
var finishHour = 20;

function getTodaysDate() {
  currentDay.text(dayjs().format("dddd D [of] MMMM YYYY"));
}
getTodaysDate();

function generateDailyHours() {
  var currentTime = dayjs().format("HH");
  console.log(currentTime);
  for (var i = startingHour; i <= finishHour; i++) {
    var timeBlock = $("<div>");
    var saveButton = $("<button>");
    var timeDiv = $("<div>");
    var textArea = $("<textarea>");
    var timeSpan = $("<span>");
    var saveBtnIcon = $("<i>");

    timeDiv.addClass("col-md-1 hour");

    timeSpan.text(`${i}:00`);
    timeDiv.append(timeSpan);
    saveBtnIcon.addClass("fa fa-save");
    saveButton.append(saveBtnIcon);
    saveButton.addClass("col-md-1 saveBtn");

    textArea.addClass("col-md-10 description past");
    if (currentTime == i) {
      textArea.addClass("present");
    }
    if (currentTime > i) {
      textArea.addClass("past");
    }
    if (currentTime < i) {
      textArea.addClass("future");
    }

    timeBlock.append(timeDiv);
    timeBlock.append(textArea);
    timeBlock.append(saveButton);
    timeBlock.addClass("row time-block");

    //adding timeBlock Element to main block as child
    mainBlock.append(timeBlock);
  }
}

generateDailyHours();
