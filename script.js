

var displayDate = function() {
    var currentDate = moment().format('dddd[,] MMM Do YYYY');
    document.querySelector("#currentDay").innerHTML = currentDate;
    console.log(currentDate); 
}     


displayDate();
