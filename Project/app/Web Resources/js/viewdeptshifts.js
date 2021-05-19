"use strict";

//Variable declarations: Lists for storing queries, call booleans and calendar
var shftList = new Array();
var allList = new Array();
var studItList = new Array();
var studItCalled = false;
var askItList = new Array();
var askItCalled = false;
var genEnqList = new Array();
var genEnqCalled = false;
var managerList = new Array();
var managerCalled = false;
var seniorList = new Array();
var seniorCalled = false;
var casualList = new Array();
var casualCalled = false;
var userId;
var currentDate = new Date();
var days = [];
var loadedCells = [];
var currentEvents = new Map();
var cellMappings = new Map();

//initial request - all staff
var initRequest = new XMLHttpRequest();
var request = new XMLHttpRequest();
initRequest.open('GET', 'http://localhost:8080/api/staff', false);
initRequest.onload = function () {
    var data = JSON.parse(initRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        request.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        request.onload = function () {
            var shifts = JSON.parse(request.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        request.send();
    }
};

//StudentIT Request
var studItInitRequest = new XMLHttpRequest();
var studItRequest = new XMLHttpRequest();
studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', false);
studItInitRequest.onload = function () {
    var data = JSON.parse(studItInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        studItRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        studItRequest.onload = function () {
            var shifts = JSON.parse(studItRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        studItRequest.send();
    }
    studItCalled = true;
};

//AskIT Request
var askItInitRequest = new XMLHttpRequest();
var askItRequest = new XMLHttpRequest();
askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', false);
askItInitRequest.onload = function () {
    var data = JSON.parse(askItInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        askItRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        askItRequest.onload = function () {
            var shifts = JSON.parse(askItRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        askItRequest.send();
    }
    askItCalled = true;
};

//GeneralEnquiries Request
var genEnqInitRequest = new XMLHttpRequest();
var genEnqRequest = new XMLHttpRequest();
genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', false);
genEnqInitRequest.onload = function () {
    var data = JSON.parse(genEnqInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        genEnqRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        genEnqRequest.onload = function () {
            var shifts = JSON.parse(genEnqRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        genEnqRequest.send();
    }
    genEnqCalled = true;
};

//Manager Request
var managerInitRequest = new XMLHttpRequest();
var managerRequest = new XMLHttpRequest();
managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
managerInitRequest.onload = function () {
    var data = JSON.parse(managerInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        managerRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        managerRequest.onload = function () {
            var shifts = JSON.parse(managerRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        managerRequest.send();
    }
    managerCalled = true;
};

//Senior Request
var seniorInitRequest = new XMLHttpRequest();
var seniorRequest = new XMLHttpRequest();
seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
seniorInitRequest.onload = function () {
    var data = JSON.parse(seniorInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        seniorRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        seniorRequest.onload = function () {
            var shifts = JSON.parse(seniorRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        seniorRequest.send();
    }
    seniorCalled = true;
};

//Casual Request
var casualInitRequest = new XMLHttpRequest();
var casualRequest = new XMLHttpRequest();
casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
casualInitRequest.onload = function () {
    var data = JSON.parse(casualInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        casualRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        casualRequest.onload = function () {
            var shifts = JSON.parse(casualRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        casualRequest.send();
    }
    casualCalled = true;
};

//initial setup
setDates();
initRequest.send();
allList = shftList.slice();
fillTable();
fillCalendar();

//fills table with shifts in the shftList array
function fillTable(){
    const table = document.getElementById("tbody");
    for(let y=0; y<shftList.length; y++){
        let row = table.insertRow();
        let name = row.insertCell(0);
        let id = row.insertCell(1);
        let type = row.insertCell(2);
        let user = row.insertCell(3);
        let start = row.insertCell(4);
        let end = row.insertCell(5);
        let shift = shftList[y];
        name.innerHTML = shift.name;
        id.innerHTML = shift.eventID;
        type.innerHTML = shift.type;
        user.innerHTML = shift.user.firstName + " " + shift.user.lastName;
        start.innerHTML = shift.start.dateTime.date.day + "/" + shift.start.dateTime.date.month + "/" + shift.start.dateTime.date.year + " " + shift.start.dateTime.time.hour + ":" + shift.start.dateTime.time.minute;
        end.innerHTML = shift.end.dateTime.date.day + "/" + shift.end.dateTime.date.month + "/" + shift.end.dateTime.date.year + " " + shift.end.dateTime.time.hour + ":" + shift.end.dateTime.time.minute;
    }
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

function fillCalendar() {
    //clear calendar
    cellMappings.clear();
    currentEvents.clear();
    loadedCells = [];
    let tds = document.getElementsByClassName("calendar container-fluid")[0].getElementsByTagName("td");
    let cells = [...tds];
    cells.forEach((cell) => {
        $(cell).removeClass("selected");
    })
    
    //set dates for request
    let pMonth = days[0].getMonth() + 1;
    if (pMonth.toString().length < 2) {
        pMonth = "0" + pMonth
    }
    let pDate = days[0].getDate();
    if (pDate.toString().length < 2) {
        pDate = "0" + pDate
    }
    let pStart = pMonth + "-" + pDate + "-" + days[0].getFullYear()
    
    let shiftRequest = new XMLHttpRequest();
    //TO DO: Fill with actual details
    shiftRequest.open('GET', 'http://localhost:8080/api/staff/events/0?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', true);
    shiftRequest.onload = function () {
        
        let data = JSON.parse(this.response);
        
        if (shiftRequest.status >= 200 && shiftRequest.status < 400) {
            let cells = []
            
            data.forEach((shift) => {
                let s = shift.start.dateTime;
                let e = shift.end.dateTime;
                let start = new Date(s.date.year, s.date.month - 1, s.date.day, s.time.hour, s.time.minute, s.time.second);
                let end = new Date(e.date.year, e.date.month - 1, e.date.day, e.time.hour, e.time.minute, e.time.second);
                
                let cellID = start.getDay().toString();
                if (cellID === "0") {
                    cellID = "6";
                } else {
                    cellID = cellID - 1;
                }
                let hours = start.getHours().toString();
                if (hours.length < 2) {
                    hours = "0" + hours;
                }
                cellID += hours;
                
                let event = new Event(start,end);
                event.eventID = shift.eventID;
                
                let span = end.getHours() - start.getHours();
                for (let j = 1; j <= span; j++) {
                    let c = cellID++
                    
                    if ((""+c).length == 1) {
                        c = "00"+c;
                    } else if ((""+c).length == 2) {
                        c = "0"+c;
                    }
                    c = c + "";
                    cellMappings.set(c, event.eventID);
                    cells.push(c);
                    console.log(event);
                    console.log(event.cellID);
                    event.cellID.push(c);
                }
                currentEvents.set(event.eventID, event);
            });
            
            cells.forEach((cell) => {
                $('#' + cell).addClass("selected");
                loadedCells.push(cell);
            })
        }
    }
    shiftRequest.send();
}

//when All Departments Clicked
$("#allDeptBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    let role = document.getElementById('selectedRole').innerHTML;
    switch(role) {
        case "All Roles":
            shftList = allList.slice();
            break;
        case "Manager":
            shftList = managerList.slice();
            break;
        case "Senior":
            shftList = seniorList.slice();
            break;
        case "Casual":
            shftList = casualList.slice();
            break;
    }
    fillTable();
    document.getElementById("selectedOption").innerHTML = "All Departments";
});

//when StudentIT Clicked
$("#studItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (studItCalled == false) {
        studItInitRequest.send();
        studItList = shftList.slice();
    } else if (studItCalled) {
        shftList = studItList.slice();
    }
    let role = document.getElementById('selectedRole').innerHTML;
    switch(role) {
        case "All Roles":
            break;
        case "Manager":
            shftList = shftList.filter(a => managerList.some(b => a.eventID === b.eventID));
            break;
        case "Senior":
            shftList = shftList.filter(a => seniorList.some(b => a.eventID === b.eventID));
            break;
        case "Casual":
            shftList = shftList.filter(a => casualList.some(b => a.eventID === b.eventID));
            break;
    }
    fillTable();
    document.getElementById("selectedOption").innerHTML = "Student IT";
});

//when AskIT Clicked
$("#askItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (askItCalled == false) {
        askItInitRequest.send();
        askItList = shftList.slice();
    } else if (askItCalled) {
        shftList = askItList.slice();
    }
    let role = document.getElementById('selectedRole').innerHTML;
    switch(role) {
        case "All Roles":
            break;
        case "Manager":
            shftList = shftList.filter(a => managerList.some(b => a.eventID === b.eventID));
            break;
        case "Senior":
            shftList = shftList.filter(a => seniorList.some(b => a.eventID === b.eventID));
            break;
        case "Casual":
            shftList = shftList.filter(a => casualList.some(b => a.eventID === b.eventID));
            break;
    }
    fillTable();
    document.getElementById("selectedOption").innerHTML = "Ask IT";
});

//when GeneralEnquiries Clicked
$("#genEnqBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (genEnqCalled == false) {
        genEnqInitRequest.send();
        genEnqList = shftList.slice();
    } else if (genEnqCalled) {
        shftList = genEnqList.slice();
    }
    let role = document.getElementById('selectedRole').innerHTML;
    switch(role) {
        case "All Roles":
            break;
        case "Manager":
            shftList = shftList.filter(a => managerList.some(b => a.eventID === b.eventID));
            break;
        case "Senior":
            shftList = shftList.filter(a => seniorList.some(b => a.eventID === b.eventID));
            break;
        case "Casual":
            shftList = shftList.filter(a => casualList.some(b => a.eventID === b.eventID));
            break;
    }
    fillTable();
    document.getElementById("selectedOption").innerHTML = "General Enquiries";
});

//when All Roles Clicked
$("#allRoleBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    let dept = document.getElementById('selectedOption').innerHTML;
    switch(dept) {
        case "All Departments":
            shftList = allList.slice();
            break;
        case "Student IT":
            shftList = studItList.slice();
            break;
        case "Ask IT":
            shftList = askItList.slice();
            break;
        case "General Enquiries":
            shftList = genEnqList.slice();
            break;
    }  
    fillTable();
    document.getElementById("selectedRole").innerHTML = "All Roles";
});

//when Manager Clicked
$("#managerBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (managerCalled == false) {
        managerInitRequest.send();
        managerList = shftList.slice();
    } else if (managerCalled) {
        shftList = managerList.slice();
    }
    let dept = document.getElementById('selectedOption').innerHTML;
    switch(dept) {
        case "All Departments":
            break;
        case "Student IT":
            shftList = shftList.filter(a => studItList.some(b => a.eventID === b.eventID));
            break;
        case "Ask IT":
            shftList = shftList.filter(a => askItList.some(b => a.eventID === b.eventID));
            break;
        case "General Enquiries":
            shftList = shftList.filter(a => genEnqList.some(b => a.eventID === b.eventID));
            break;
    }  
    fillTable();
    document.getElementById("selectedRole").innerHTML = "Manager";
});

//when Senior Clicked
$("#seniorBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (seniorCalled == false) {
        seniorInitRequest.send();
        seniorList = shftList.slice();
    } else if (genEnqCalled) {
        shftList = seniorList.slice();
    }
    let dept = document.getElementById('selectedOption').innerHTML;
    switch(dept) {
        case "All Departments":
            break;
        case "Student IT":
            shftList = shftList.filter(a => studItList.some(b => a.eventID === b.eventID));
            break;
        case "Ask IT":
            shftList = shftList.filter(a => askItList.some(b => a.eventID === b.eventID));
            break;
        case "General Enquiries":
            shftList = shftList.filter(a => genEnqList.some(b => a.eventID === b.eventID));
            break;
    }
    fillTable();
    document.getElementById("selectedRole").innerHTML = "Senior";
});

//when Casual Clicked
$("#casualBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (casualCalled == false) {
        casualInitRequest.send();
        casualList = shftList.slice();
    } else if (casualCalled) {
        shftList = casualList.slice();
    }
    let dept = document.getElementById('selectedOption').innerHTML;
    switch(dept) {
        case "All Departments":
            break;
        case "Student IT":
            shftList = shftList.filter(a => studItList.some(b => a.eventID === b.eventID));
            break;
        case "Ask IT":
            shftList = shftList.filter(a => askItList.some(b => a.eventID === b.eventID));
            break;
        case "General Enquiries":
            shftList = shftList.filter(a => genEnqList.some(b => a.eventID === b.eventID));
            break;
    }
    fillTable();
    document.getElementById("selectedRole").innerHTML = "Casual";
});