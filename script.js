var displayDate =function() {
    var currentDate=moment().format('dddd[,] MMM Do YYYY');
   // formEl.querySelector("#currentDay").appendChild = currentDate;
    console.log(currentDate); 
}        

var formEl = document.querySelector("#currentDay");

displayDate();