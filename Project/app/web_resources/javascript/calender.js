/* hide initially unsued calender views. */

/* selects the cell that the mouse is in. */
$(".calender td").on("mouseover", function(){
  $(this).addClass("selected");
});

/* deselects the cell the mouse is in. */
$(".calender td").on("mouseout", function(){
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

/* Check which calender view is enabled. */
/* setup listenrs for buttons. */
$("#day").on("click", function(){
  /* hide all other tables besdies the selected one. */
  $("#calender-week").addClass("hidden-calender");
  $("#calender-month").addClass("hidden-calender");
  $("#calender-day").removeClass("hidden-calender");
});

$("#week").on("click", function(){
  $("#calender-week").removeClass("hidden-calender");
  $("#calender-month").addClass("hidden-calender");
  $("#calender-day").addClass("hidden-calender");
});

$("#month").on("click", function(){
  $("#calender-week").addClass("hidden-calender");
  $("#calender-month").removeClass("hidden-calender");
  $("#calender-day").addClass("hidden-calender");
  /* TODO */
  alert("Not yet implemented");
});
