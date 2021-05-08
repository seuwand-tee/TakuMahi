/* store querris from http://localhost:8080/api/staff. */
var usrdata;

/* Current date on page.Starts on the current date. */
var dateToday = new Date();

/* sets the date for today */
updateDate(dateToday);

/* update Date. */
function updateDate(date){
  console.log(date);
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  $("#date").text(dd + "/" + mm + "/" + yyyy);
}

/* Creates a schedule for each user pulled and fills in the data */
function populate(){
  console.log(usrdata[0]);

  // Duplicate the weekly view and create a new one for each element.
  usrdata.forEach((element, index) => {
    $("#calendar-day").clone().attr("id", "calendar-day" + index).removeClass("invisible").appendTo("body");
  });

  // Set the name of each new day view
  usrdata.forEach((element, index) => {
    $('#calendar-day' + index  + ' th:contains("User")').text(usrdata[index].firstName);
  });

  //TODO: Update unavaliblities and shifts.
  usrdata.forEach((element, index) => {
    fetch('http://localhost:8080/api/staff/shifts/' + usrdata[index].idNumber);
    fetch('http://localhost:8080/api/staff/unavaliblity/' + usrdata[index].idNumber);
  });
};

/* pull in the data.*/
fetch('http://localhost:8080/api/staff')
  .then(response => response.json())
  .then(data => {
    usrdata = data;
    populate();
    /* Activate listeners */
    /* selects the cell that the mouse is in. */
    $(".calendar td").on("mouseover", function(){
      $(this).addClass("selected");
    });
    /* deselects the cell the mouse is in. */
    $(".calendar td").on("mouseout", function(){
      $(this).removeClass("selected");
    });

  });

/* what happens when next button is clicked */
$("#next-button").on("click", function(){
  /* Set the date of the page to be tomorrow */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateToday = tomorrow;
  updateDate(dateToday);
});

/* what happens when save button is clicked */
$("#save-button").on("click", function(){
  alert("Not supported yet!");
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
  /* set the date on the page to be yesterday */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() -1 );
  dateToday = tomorrow;
  updateDate(dateToday);
  updateDate(dateToday);
});
