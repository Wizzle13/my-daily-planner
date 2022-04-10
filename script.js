var wds = [];
var startTime = 8
var dayStart = "am";
var dayLength = 12;
var timeSlot = document.getElementById('timeSlots');
var scheduleContent = document.querySelector(".schedule");
var houlyText = "";
var i = 0;
var saveTasks = "";


// displays the date on the top of the page
var displayDate = function() {
    var currentDate = moment().format('dddd[,] MMM Do YYYY');
    document.querySelector("#currentDay").innerHTML = currentDate;
};     

// saves hourly task
var saveWds =function() {
    
    localStorage.setItem("WDS", JSON.stringify(wds));
    
};

var loadTasks = function(){
    var savedTasks = localStorage.getItem("WDS");
    if (!savedTasks) {
        // console.log("Saved Task NOT Found");
        return false;        
    }
    // console.log("Saved Task Found");

    // parse into array of objects
  savedTasks = JSON.parse(savedTasks);
  
  for (var e = 0; e < savedTasks.length; e++) {
    // pass each task object into the `createTaskEl()` function
    

    if (parseInt(savedTasks[e].time) === i) {
        houlyText = savedTasks[e].text;
        wds.push ({
            
            time: savedTasks[e].time,
            text: savedTasks[e].text
        });
        break;
    }
    else {
        houlyText="";
    }     
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
            if (currentHour !== 12) {
                currentHour = currentHour + 12;
            };    
        };
        
        // sets the hourly Colors
        if (currentHour === i) {
            var timeBlock = "present";
        } else if (currentHour < i) {
            var timeBlock = "future";
        } else {
            var timeBlock = "past";
        };

        loadTasks();
       
        // creats the html content for the schedule
        $(scheduleContent).append (
        "<div class='row'> "+
            "<div class='hour input-group col-1'>"+
                "<p class='time-block'>"+ hourlySlot +" "+ dayStart+"</p>"+
            "</div>"+
            "<div class='input-group col-10 form-group'>"+
                "<textarea id=text"+ i +" class='form-control textborder "+ timeBlock +"' rows='2' style='resize:none' name="+i+">"+ houlyText +"</textarea>"+
                "<button class='col-1 btn saveBtn' data-btn-id = "+i+" value = 'text"+i+"'><span class='oi oi-lock-locked'></span></button>"+
            "</div>"+
        "</div> ");
        
    }  
    // saves when button is clicked
    $(".saveBtn").click(function(event) {
        var  textValue= event.target.value;
        var taskText = $("#"+ textValue).val();
        var taskTime = event.target.getAttribute("data-btn-id");
        var simpelDate = moment().format('l');
        
        // var existingWds = JSON.parse(localStorage.getItem("WDS"));
        // if(existingWds == null) existingWds = [];

        // save in array
        wds.push ({
            // date: simpelDate,
            time: taskTime,
            text: taskText
        });
        // wds.push(existingWds);
        saveWds(saveTasks);
        
    });
   
    
    
}


displayDate();

createWD();

