/* selects the cell that the mouse is in */
$("#calander td").on("mouseover", function(){
  $(this).addClass("selected");
  console.log("working")
});

/* deselects the cell the mouse is in */
$("#calander td").on("mouseout", function(){
  $(this).removeClass("selected");
  console.log("working")
});
