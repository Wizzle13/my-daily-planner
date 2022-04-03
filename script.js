var startTime = 9;
var workDay = 8;
var i = 0;

var displayDate = function() {
    var currentDate = moment().format('dddd[,] MMM Do YYYY');
    document.querySelector("#currentDay").innerHTML = currentDate;
    console.log(currentDate); 
}     

var dailyLayout = function() {
    for (var i = 0; i < workDay; i++) { 
        document.querySelector(".planner").innerHTML = "<h3>" + startTime + "</h3><br/>";
        console.log(startTime);
    }
}
displayDate();
dailyLayout();