var usrdata;

/* Creates a schedule for each user pulled and fills in the data */
function populate(){
  console.log(usrdata[0]);
  // Duplicate the weekly view and create a new one for each element.
  usrdata.forEach((element, index) => {
    $("#calendar-day").clone().attr("id", "calendar-day" + index).appendTo("body");
    console.log("123");
  });
  $('th:contains("User")').text(usrdata[0].firstName);
}

/* pull in the data */
fetch('http://localhost:8080/api/staff')
  .then(response => response.json())
  .then(data => {
    usrdata = data;
    populate();

  });

/* update the first entry */
// $('th:contains("user")').text(usrdata[0].idNumber);

/* selects the cell that the mouse is in. */
$(".calendar td").on("mouseover", function(){
  $(this).addClass("selected");
});

/* deselects the cell the mouse is in. */
$(".calendar td").on("mouseout", function(){
  $(this).removeClass("selected");
});

/* what happens when next button is clicked */
$("#next-button").on("click", function(){
  alert("Not supported yet!");
});

/* what happens when save button is clicked */
$("#save-button").on("click", function(){
  alert("Not supported yet!");
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
  alert("Not supported yet!");
});
