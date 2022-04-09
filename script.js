var wds = [];
var startTime = 8
var dayStart = "am";
var dayLength = 12;
var timeSlot = document.getElementById('timeSlots');
var scheduleContent = document.querySelector(".schedule");

// displays the date on the top of the page
var displayDate = function() {
    var currentDate = moment().format('dddd[,] MMM Do YYYY');
    document.querySelector("#currentDay").innerHTML = currentDate;
    console.log(currentDate); 
    
};     

// saves hourly task
var saveWds =function() {
    localStorage.setItem("WDS", JSON.stringify(wds));
};



var loadTasks = function(){
    var savedTasks = localStorage.getItem("WDS");
    if (!savedTasks) {
        console.log("Saved Task NOT Found");
        return false;        
    }
    console.log("Saved Task Found");

    // parse into array of objects
  savedTasks = JSON.parse(savedTasks);
  console.log(savedTasks);
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    console.log(savedTasks[i]);
    
  }
};

// creates the hourly time slots for the work day schedule dynamicly
var createWD = function() {
    var workDay = startTime + dayLength;
    for (i = startTime; i < workDay; i++) {
        var dailyHours = document.createElement("div");
        hourlySlot = i;
        if (hourlySlot > 12) {
            hourlySlot = hourlySlot-12;
        };
        if (i < 12){
            dayStart="am";
        }    
        else {
            dayStart = "pm";
        };
        var currentTime = moment().format('LT');
        var currentHour = currentTime.split(':', 1);
        var currentHour = currentHour[0];
       
        var currentHour = parseInt(currentHour);
        var morningNight = currentTime.split(' ',2);
        var morningNight =morningNight[1];
       
        if (morningNight == 'PM') {
            currentHour = currentHour + 12;
            
        };
        console.log(currentHour , i);
        if (currentHour === i) {
            var timeBlock = "present";
        } else if (currentHour < i) {
            var timeBlock = "future";
        } else {
            var timeBlock = "past";
        };

        console.log(currentHour);
        
        $(scheduleContent).append (
        "<div class='row'> "+
            "<div class='hour input-group col-1'>"+
                "<p class='time-block'>"+ hourlySlot +" "+ dayStart+"</p>"+
            "</div>"+
            "<div class='input-group col-10 form-group'>"+
                "<textarea id=text"+ i +" class='form-control textborder "+ timeBlock +"' rows='2' style='resize:none' name="+i+"></textarea>"+
                "<button class='col-1 btn saveBtn' data-btn-id = 'btn"+i+"' value = 'text"+i+"'><span class='oi oi-lock-locked'></span></button>"+
            "</div>"+
        "</div> ");
    }  
    loadTasks();
}

// save button pressed
$(".saveBtn").click(function() {
    console.log("saveButton");
    var taskText = $("#text9").val();
    var taskTime = "9";
    var simpelDate = moment().format('l');
    // save in array
    wds.push ({
        date: simpelDate,
        time: taskTime,
        text: taskText
    });
    saveWds();
});

displayDate();
createWD();

// listens for the save button
// scheduleContent.addEventListener("click", taskSaveBtn);
