let userID = "1";
let currentDate = new Date();
let days = [];
let loadedCells = [];
let currentEvents = new Map();
let cellMappings = new Map();

class Event {
    constructor(start, end) {
        this.eventID = null;
        this.cellID = [];
        this.start = start;
        this.end = end;
        this.repeat = "No";                          // Not used at the moment.
        this.description = "An Unavailability";
    }

    incrementEnd() {
        let date = new Date(this.end);
        date.setHours(date.getHours() + 1);
        this.end = date;
    }

    delete() {
        loadedCells = loadedCells.filter(cell => !(this.cellID.includes(cell)));
        console.log("what Im looking at: " + loadedCells);
        this.cellID.forEach((cell) => {
            cellMappings.delete(cell);
        })
        currentEvents.delete(this.eventID);
        let request = new XMLHttpRequest();
        request.open('DELETE', 'http://localhost:8080/api/staff/unavailability/' + userID + '/' + this.eventID, true);
        request.send();
    }

    // getEventString() {
    //     return this.start.toString() + " until " + this.end.toString();
    // }
}

setDates();

populateTable();

function populateTable() {
    cellMappings.clear();
    currentEvents.clear();
    loadedCells = [];
    let tds = document.getElementsByClassName("calendar container-fluid")[0].getElementsByTagName("td");
    let cells = [...tds];
    cells.forEach((cell) => {
        $(cell).removeClass("selected");
    })

    let initialRequest = new XMLHttpRequest();
    let pMonth = days[0].getMonth() + 1;
    if (pMonth.toString().length < 2) {
        pMonth = "0" + pMonth
    }
    let pDate = days[0].getDate();
    if (pDate.toString().length < 2) {
        pDate = "0" + pDate
    }
    let pStart = pMonth + "-" + pDate + "-" + days[0].getFullYear()
    //console.log(pStart)
    initialRequest.open('GET', 'http://localhost:8080/api/staff/events/' + userID + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=2', true);

    initialRequest.onload = function () {

        let data = JSON.parse(this.response);

        if (initialRequest.status >= 200 && initialRequest.status < 400) {
            console.log(data)
            let cells = []
            data.forEach((unavail) => {
                let s = unavail.start.dateTime
                let e = unavail.end.dateTime
                let start = new Date(s.date.year, s.date.month - 1, s.date.day, s.time.hour, s.time.minute, s.time.second)
                let end = new Date(e.date.year, e.date.month - 1, e.date.day, e.time.hour, e.time.minute, e.time.second)

                let cellID = start.getDay().toString()
                if (cellID === "0") {
                    cellID = "6";
                } else {
                    cellID = cellID - 1;
                }
                let hours = start.getHours().toString()
                if (hours.length < 2) {
                    hours = "0" + hours;
                }
                cellID += hours

                let event = new Event(start,end);
                event.eventID = unavail.eventID;

                let span = end.getHours() - start.getHours()
                //console.log(span)
                for (let i = 1; i <= span; i++) {
                    let c = cellID++;

                    if ((""+c).length === 1) {
                        c = "00"+c;
                    } else if ((""+c).length === 2) {
                        c = "0"+c
                    }
                    c = c + "";

                    cellMappings.set(c, event.eventID);
                    cells.push(c)
                    event.cellID.push(c)
                }

                currentEvents.set(event.eventID, event);

            })

            console.log(currentEvents);
            console.log(cellMappings);
            cells.forEach((cell) => {
                //console.log(cell);
                $("#" + cell).addClass("selected");
                loadedCells.push(cell);
            })
        }

    }
    initialRequest.send()
}

function addUnavailability(event) {

    let body = JSON.stringify(event);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8080/api/staff/unavailability/' + userID, false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(body);

}

function setDates() {
    const offSet = currentDate.getDay() - 1;
    days = [];

    for (let i = 0; i < 7; i++) {
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
}).on("mouseout", function(){
    //$(this).removeClass("selected");
}).on("click", function(){
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        if (cellMappings.has($(this).attr("id"))) {
            let eventID = cellMappings.get($(this).attr("id"));
            let event = currentEvents.get(eventID);
            event.delete();
        }
    } else {
        $(this).addClass("selected");
        console.log("Highlighted: " + $(this).attr("id"))
    }
});

$("#set-button").on("click", function (){
    let highlightedCells = [];
    let tds = document.getElementsByClassName("calendar container-fluid")[0].getElementsByTagName("td");
    let cells = [...tds];
    console.log(loadedCells);
    cells.forEach(function (cell) {
       if ($(cell).hasClass("selected") && !(loadedCells.includes($(cell).attr("id")))) {
           highlightedCells.push($(cell).attr("id"));
       }
    });

    highlightedCells.sort();
    let ds = [];

    let prevCell;
    highlightedCells.forEach(function (id) {
        console.log("Looking at: " + id)
        if (++prevCell != id) {
            prevCell = id;
            let strID = id;
            let idDateTime = new Date(days[strID.charAt(0)])
            idDateTime.setHours(strID.substr(1, 2));
            idDateTime.setMinutes(0);
            idDateTime.setSeconds(0);

            let start = new Date(idDateTime);
            idDateTime.setHours(idDateTime.getHours() + 1);
            let end = new Date(idDateTime);

            ds.push(new Event(start,end));
        } else {
            let lastCell = ds.pop()
            lastCell.incrementEnd()
            ds.push(lastCell);
        }
    });

    ds.forEach((cell) => {
        addUnavailability(cell);
    });

    populateTable();

});

