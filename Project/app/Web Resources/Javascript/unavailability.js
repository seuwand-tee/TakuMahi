var userID = "1";
var currentDate = new Date();
var days = [];
var loadedCells = [];

class Event {
    constructor(start, end) {
        this.eventID = null;
        this.start = start;
        this.end = end;
        this.repeat = "No";
        this.description = "An Unavailability";
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

populateTable();

function populateTable() {

    var tds = document.getElementsByClassName("calendar container-fluid")[0].getElementsByTagName("td");
    var cells = [...tds];
    cells.forEach((cell) => {
        $(cell).removeClass("selected");
    })

    var initialRequest = new XMLHttpRequest();
    var pMonth = days[0].getMonth() + 1;
    if (pMonth.toString().length < 2) {
        pMonth = "0" + pMonth
    }
    var pDate = days[0].getDate();
    if (pDate.toString().length < 2) {
        pDate = "0" + pDate
    }
    var pStart = pMonth + "-" + pDate + "-" + days[0].getFullYear()
    //console.log(pStart)
    initialRequest.open('GET', 'http://localhost:8080/api/staff/events/' + userID + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=2', true);

    initialRequest.onload = function () {

        var data = JSON.parse(this.response);

        if (initialRequest.status >= 200 && initialRequest.status < 400) {
            console.log(data)
            var cells = []
            data.forEach((unavail) => {
                var s = unavail.start.dateTime
                var e = unavail.end.dateTime
                var start = new Date(s.date.year, s.date.month - 1, s.date.day, s.time.hour, s.time.minute, s.time.second)
                var end = new Date(e.date.year, e.date.month - 1, e.date.day, e.time.hour, e.time.minute, e.time.second)

                var cellID = start.getDay().toString()
                if (cellID == 0) {
                    cellID = "6";
                } else {
                    cellID = cellID - 1;
                }
                var hours = start.getHours().toString()
                if (hours.length < 2) {
                    hours = "0" + hours;
                }
                cellID += hours

                var span = end.getHours() - start.getHours()
                //console.log(span)
                for (var i = 1; i <= span; i++) {
                    var c = cellID++;

                    if ((""+c).length === 1) {
                        c = "00"+c;
                    } else if ((""+c).length === 2) {
                        c = "0"+c
                    }

                    cells.push(c+"")
                }

            })

            cells.forEach((cell) => {
                console.log(cell);
                $("#" + cell).addClass("selected");
                loadedCells.push(cell);
            })
        }

    }
    initialRequest.send()
}

function addUnavailability(event) {

    var body = JSON.stringify(event);
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/api/staff/unavailability/' + userID, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(body);

}

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
    populateTable()
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
    currentDate.setDate(currentDate.getDate() - 7);
    setDates();
    populateTable()
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
       if ($(cell).hasClass("selected") && !(loadedCells.includes($(cell).attr("id")))) {
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
    ds.forEach((cell) => {
        strings.push(cell.getEventString())
        addUnavailability(cell);
        console.log(cell);
    });

    alert(strings);
});

