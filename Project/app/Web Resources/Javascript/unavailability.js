var currentDate = new Date();
var days = [];

class Event {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    incrementEnd() {
        var date = new Date(this.end);
        date.setHours(date.getHours() + 1);
        this.end = date;
    }

    getEventString() {
        return this.start.toString() + " until " + this.end.toString();
    }
};

setDates();

function setDates() {
    var offSet = currentDate.getDay() - 1;
    days = [];

    for (var i = 0; i < 7; i++) {
        days[i] = new Date(currentDate);
        days[i].setDate((currentDate.getDate() - offSet + i));
    }
    document.getElementById("monday").innerText = days[0].toDateString();
    document.getElementById("tuesday").innerText = days[1].toDateString();
    document.getElementById("wednesday").innerText = days[2].toDateString();
    document.getElementById("thursday").innerText = days[3].toDateString();
    document.getElementById("friday").innerText = days[4].toDateString();
    document.getElementById("saturday").innerText = days[5].toDateString();
    document.getElementById("sunday").innerText = days[6].toDateString();
}

/* what happens when next button is clicked */
$("#next-button").on("click", function(){
    currentDate.setDate(currentDate.getDate() + 7);
    setDates();
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
    currentDate.setDate(currentDate.getDate() - 7);
    setDates();
});

/* selects the cell that the mouse is in. */
$(".calendar td").on("mouseover", function(){
    //$(this).addClass("selected");
});

/* deselects the cell the mouse is in. */
$(".calendar td").on("mouseout", function(){
    //$(this).removeClass("selected");
});

$(".calendar td").on("click", function(){
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
    } else {
        $(this).addClass("selected");
    }
});

$("#set-button").on("click", function (){
    var highlightedCells = [];
    var tds = document.getElementsByClassName("calendar container-fluid")[0].getElementsByTagName("td");
    var cells = [...tds];
    cells.forEach(function (cell) {
       if ($(cell).hasClass("selected")) {
           highlightedCells.push($(cell).attr("id"));
       }
    });

    highlightedCells.sort();
    var ds = [];

    var prevCell;
    highlightedCells.forEach(function (id) {
        if (++prevCell != id) {
            prevCell = id;
            var strID = id;
            var idDateTime = new Date(days[strID.charAt(0)])
            idDateTime.setHours(strID.substr(1, 2));
            idDateTime.setMinutes(0);
            idDateTime.setSeconds(0);

            var start = new Date(idDateTime);
            idDateTime.setHours(idDateTime.getHours() + 1);
            var end = new Date(idDateTime);

            ds.push(new Event(start,end));
        } else {
            var lastCell = ds.pop()
            lastCell.incrementEnd()
            ds.push(lastCell);
        }
    });

    var strings = []
    ds.forEach(cell => strings.push(cell.getEventString()));

    alert(strings);
});