/* hide initially unsued calendar views. */

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

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
  alert("Not supported yet!");
});

/* Check which calendar view is enabled. */
/* setup listenrs for buttons. */
$("#day").on("click", function(){
  /* hide all other tables besdies the selected one. */
  $("#calendar-week").addClass("hidden-calendar");
  $("#calendar-month").addClass("hidden-calendar");
  $("#calendar-day").removeClass("hidden-calendar");
});

$("#week").on("click", function(){
  $("#calendar-week").removeClass("hidden-calendar");
  $("#calendar-month").addClass("hidden-calendar");
  $("#calendar-day").addClass("hidden-calendar");
});

$("#month").on("click", function(){
  $("#calendar-week").addClass("hidden-calendar");
  $("#calendar-month").removeClass("hidden-calendar");
  $("#calendar-day").addClass("hidden-calendar");
});
