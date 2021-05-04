/* selects the cell that the mouse is in. */
$(".calendar td").on("mouseover", function(){
    //$(this).addClass("selected");
});

/* deselects the cell the mouse is in. */
$(".calendar td").on("mouseout", function(){
    //$(this).removeClass("selected");
});

$(".calendar td").on("click", function(){
    $(this).addClass("selected")
});