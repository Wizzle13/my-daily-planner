var wds = [];
var startTime = 11;
var dayStart = "am";
var dayLength = 12;
var timeSlot = document.getElementById('timeSlots');

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




// creates the hourly time slots for the work day schedule dynamicly
var createWD = function() {
    var workDay = startTime + dayLength;
    for (i=startTime; i < workDay; i++) {
        var dailyHours = document.createElement("div");
        hourlySlot = i;
        if (hourlySlot>12) {
            hourlySlot = hourlySlot-12;
            dayStart="pm";
        }
        var currentTime = moment().format('LT');
        var currentHour = currentTime.split(':', 1);
        var currentHour = parseInt(currentHour);
        if (dayStart = "pm") {
            currentHour = currentHour + 12;
            console.log(currentHour , i);
        }

        if (currentHour === i) {
            var timeBlock = "present";
        }
        if (currentHour < i) {
            var timeBlock = "future";
        }
        if (currentHour > i) {
            var timeBlock = "past";
        }

        console.log(currentHour);
        dailyHours.innerHTML =
        "<div class='row'> "+
            "<div class='hour input-group col-1'>"+
                "<p class='time-block'>"+ hourlySlot +" "+ dayStart+"</p>"+
            "</div>"+
            "<div class='input-group col-10 form-group'>"+
                "<textarea id=text"+ i +" class='form-control textborder "+ timeBlock +"' rows='2' style='resize:none' name="+i+"></textarea>"+
                "<button class='col-1 btn saveBtn' value = 'text"+i+"'><span class='oi oi-lock-locked'></span></button>"+
            "</div>"+
        "</div> ";
        timeSlot.appendChild(dailyHours);
    }    
}

// save button pressed
$(".saveBtn").click(function() {
  
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
