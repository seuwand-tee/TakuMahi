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
