"use strict";

//Variable declarations: Lists for storing queries, call booleans and calendar
var shftList = new Array();
var users = new Array();
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
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        if (!users.includes(userId)){
            users.push(userId);
        }
        request.open('GET', 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
        request.onload = function () {
            var shifts = JSON.parse(request.response);
            for(let j=0; j<shifts.length; j++) {
                allList.push(shifts[j]);
            }
        };
        request.send();
    }
};

//StudentIT Request
var studItInitRequest = new XMLHttpRequest();
var studItRequest = new XMLHttpRequest();
studItInitRequest.open('GET', 'http://localhost:8080/api/staff/events/department/StudentIT', false);
studItInitRequest.onload = function () {
    var data = JSON.parse(studItInitRequest.response);
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
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        if (!users.includes(userId)){
            users.push(userId);
        }
        studItRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        studItRequest.onload = function () {
            var shifts = JSON.parse(studItRequest.response);
            for(let j=0; j<shifts.length; j++) {
                studItList.push(shifts[j]);
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
                askItList.push(shifts[j]);
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
                genEnqList.push(shifts[j]);
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
                managerList.push(shifts[j]);
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
                seniorList.push(shifts[j]);
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
                casualList.push(shifts[j]);
            }
        };
        casualRequest.send();
    }
    casualCalled = true;
};

//initial setup
setDates();
initRequest.send();
shftList = allList.slice();
//fillTable();
fillCalendar();

//fills table with shifts in the shftList array
//function fillTable(){
//    const tabl = document.getElementById("tbody");
//    for(let y=0; y<shftList.length; y++){
//        let row = tabl.insertRow();
//        let name = row.insertCell(0);
//        let id = row.insertCell(1);
//        let type = row.insertCell(2);
//        let user = row.insertCell(3);
//        let start = row.insertCell(4);
//        let end = row.insertCell(5);
//        let shift = shftList[y];
//        name.innerHTML = shift.name;
//        id.innerHTML = shift.eventID;
//        type.innerHTML = shift.type;
//        user.innerHTML = shift.user.firstName + " " + shift.user.lastName;
//        start.innerHTML = shift.start.dateTime.date.day + "/" + shift.start.dateTime.date.month + "/" + shift.start.dateTime.date.year + " " + shift.start.dateTime.time.hour + ":" + shift.start.dateTime.time.minute;
//        end.innerHTML = shift.end.dateTime.date.day + "/" + shift.end.dateTime.date.month + "/" + shift.end.dateTime.date.year + " " + shift.end.dateTime.time.hour + ":" + shift.end.dateTime.time.minute;
//    }
//}

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

//fills calendar with the users/shifts in shift list
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
    
    const table = document.getElementById("tbody");
    
    for(let i=0; i<users.length; i++) {
        let user = users[i];
        for(let j=0; j<shftList.length; j++) {
            let shift = shftList[j];
            if (user == shift.user.idNumber){
                let s = shftList[j].start.dateTime;
                let e = shftList[j].end.dateTime;
                let start = new Date(s.date.year, s.date.month - 1, s.date.day, s.time.hour, s.time.minute, s.time.second);
                let end = new Date(e.date.year, e.date.month - 1, e.date.day, e.time.hour, e.time.minute, e.time.second);
                
                let row = table.insertRow();
                let userCell = row.insertCell(0);
                let mondayCell = row.insertCell(1);
                let tuesdayCell = row.insertCell(2);
                let wednesdayCell = row.insertCell(3);
                let thursdayCell = row.insertCell(4);
                let fridayCell = row.insertCell(5);
                let saturdayCell = row.insertCell(6);
                let sundayCell = row.insertCell(7);
                
                userCell.innerHTML = shift.user.firstName + " " + shift.user.lastName;
                userCell.classList.add("table-dark");
                
                let dayOfWeek = start.getDay().toString();
                switch(dayOfWeek) {
                    case "0":
                        sundayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "1":
                        mondayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "2":
                        tuesdayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "3":
                        wednesdayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "4":
                        thursdayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "5":
                        fridayCell.innerHTML = start.time.hour + ":" + start.time.minute + " to " + end.time.hour + ":" + end.time.minute;
                        break;
                    case "6":
                        saturdayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        saturdayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                }
                //let shiftDay = 
            } else {
                break;
            }
        }
    }
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
    fillCalendar();
    document.getElementById("selectedOption").innerHTML = "All Departments";
});

//when StudentIT Clicked
$("#studItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (studItCalled == false) {
        studItInitRequest.send();
        shftList = studItList.slice();
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
    fillCalendar();
    document.getElementById("selectedOption").innerHTML = "Student IT";
});

//when AskIT Clicked
$("#askItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (askItCalled == false) {
        askItInitRequest.send();
        shftList = askItList.slice();
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
    fillCalendar();
    document.getElementById("selectedOption").innerHTML = "Ask IT";
});

//when GeneralEnquiries Clicked
$("#genEnqBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (genEnqCalled == false) {
        genEnqInitRequest.send();
        shftList = genEnqList.slice();
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
    fillCalendar();
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
    fillCalendar();
    document.getElementById("selectedRole").innerHTML = "All Roles";
});

//when Manager Clicked
$("#managerBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (managerCalled == false) {
        managerInitRequest.send();
        shftList = managerList.slice();
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
    fillCalendar();
    document.getElementById("selectedRole").innerHTML = "Manager";
});

//when Senior Clicked
$("#seniorBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (seniorCalled == false) {
        seniorInitRequest.send();
        shftList = seniorList.slice();
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
    fillCalendar();
    document.getElementById("selectedRole").innerHTML = "Senior";
});

//when Casual Clicked
$("#casualBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (casualCalled == false) {
        casualInitRequest.send();
        shftList = casualList.slice();
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
    fillCalendar();
    document.getElementById("selectedRole").innerHTML = "Casual";
});

//When Next Button Clicked
$("#next-button").on("click", function(){
    //reset calendar and stored queries
    $("#tbody").empty();
    shftList = [];
    allList = [];
    studItList = [];
    studItCalled = false;
    askItList = [];
    askItCalled = false;
    genEnqList = [];
    genEnqCalled = false;
    managerList = [];
    managerCalled = false;
    seniorList = [];
    seniorCalled = false;
    casualList = [];
    casualCalled = false;
    
    //get selected filters
    let dept = document.getElementById('selectedOption').innerHTML;
    let role = document.getElementById('selectedRole').innerHTML;
    let deptShifts = [];
    let roleShifts = [];
    
    //set new date
    currentDate.setDate(currentDate.getDate() + 7);
    setDates();
    switch(dept) {
        case "All Departments":
            initRequest.open('GET', 'http://localhost:8080/api/staff', true);
            initRequest.send();
            deptShifts = allList;
            break;
        case "StudentIT":
            studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', true);
            studItInitRequest.send();
            deptShifts = studItList;
            break;
        case "AskIT":
            askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', true);
            askItInitRequest.send();
            deptShifts = askItList;
            break;
        case "GeneralEnquiries":
            genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', true);
            genEnqInitRequest.send();
            deptShifts = genEnqList;
            break;
    }
    switch(role) {
        case "All Roles":
            initRequest.open('GET', 'http://localhost:8080/api/staff', true);
            initRequest.send();
            roleShifts = allList;
            break;
        case "Manager":
            managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
            managerInitRequest.send();
            roleShifts = managerList;
            break;
        case "Senior":
            seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
            seniorInitRequest.send();
            roleShifts = seniorList;
            break;
        case "Casual":
            casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
            casualInitRequest.send();
            roleShifts = casualList;
            break;
    }
    //compare common values and assign shift list
    shftList = deptShifts.filter(a => roleShifts.some(b => a.eventID === b.eventID));
    fillCalendar();
    
});

//When Back Button Clicked
$("#back-button").on("click", function(){
    //reset calendar and stored queries
    $("#tbody").empty();
    shftList = [];
    allList = [];
    studItList = [];
    studItCalled = false;
    askItList = [];
    askItCalled = false;
    genEnqList = [];
    genEnqCalled = false;
    managerList = [];
    managerCalled = false;
    seniorList = [];
    seniorCalled = false;
    casualList = [];
    casualCalled = false;
    
    //get selected filters
    let dept = document.getElementById('selectedOption').innerHTML;
    let role = document.getElementById('selectedRole').innerHTML;
    let deptShifts = [];
    let roleShifts = [];
    
    //set new date
    currentDate.setDate(currentDate.getDate() - 7);
    setDates();
    switch(dept) {
        case "All Departments":
            initRequest.open('GET', 'http://localhost:8080/api/staff', true);
            initRequest.send();
            deptShifts = allList;
            break;
        case "StudentIT":
            studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', true);
            studItInitRequest.send();
            deptShifts = studItList;
            break;
        case "AskIT":
            askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', true);
            askItInitRequest.send();
            deptShifts = askItList;
            break;
        case "GeneralEnquiries":
            genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', true);
            genEnqInitRequest.send();
            deptShifts = genEnqList;
            break;
    }
    switch(role) {
        case "All Roles":
            initRequest.open('GET', 'http://localhost:8080/api/staff', true);
            initRequest.send();
            roleShifts = allList;
            break;
        case "Manager":
            managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
            managerInitRequest.send();
            roleShifts = managerList;
            break;
        case "Senior":
            seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
            seniorInitRequest.send();
            roleShifts = seniorList;
            break;
        case "Casual":
            casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
            casualInitRequest.send();
            roleShifts = casualList;
            break;
    }
    //compare common values and assign shift list
    shftList = deptShifts.filter(a => roleShifts.some(b => a.eventID === b.eventID));
    fillCalendar();
    
});