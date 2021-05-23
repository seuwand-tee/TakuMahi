"use strict";

//Variable declarations: Lists for storing queries, call booleans and calendar
var shftList = new Array();
var users = new Array();
var allList = new Array();
var allListCalled = false;
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
users = [];
initRequest.open('GET', 'http://localhost:8080/api/staff', false);
initRequest.onload = function () {
    var data = JSON.parse(initRequest.response);
    //set dates for request
    let pMonth = days[0].getMonth() + 1;
    if (pMonth.toString().length < 2) {
        pMonth = "0" + pMonth;
    }
    let pDate = days[0].getDate();
    if (pDate.toString().length < 2) {
        pDate = "0" + pDate;
    }
    let pStart = pMonth + "-" + pDate + "-" + days[0].getFullYear();
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        users.push(userId);
        request.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
        request.onload = function () {
            var shifts = JSON.parse(request.response);
            for(let j=0; j<shifts.length; j++) {
                allList.push(shifts[j]);
            }
        };
        request.send();
    }
    allListCalled = true;
};

//StudentIT Request
var studItInitRequest = new XMLHttpRequest();
var studItRequest = new XMLHttpRequest();
studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', false);
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
        studItRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
        askItRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
        genEnqRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
        managerRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
        seniorRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
    console.log(data);
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
        casualRequest.open("GET", 'http://localhost:8080/api/staff/events/' + userId + '?startOfPeriod=' + pStart + '&daysInPeriod=7&filter=1', false);
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
fillCalendar();


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
    $("#tbody").empty();
    const table = document.getElementById("tbody");
    //set users to those in shift list
    users = [];
    shftList.forEach((shift) => {
       let shiftUser = shift.user.idNumber;
       if(!users.includes(shiftUser)) {
           users.push(shiftUser);
       }
    });
    
    //goes through each user and adds their shifts to calendar
    for(let i=0; i<users.length; i++) {
        let user = users[i];
        let row = table.insertRow();
        let userCell = row.insertCell(0);
        let mondayCell = row.insertCell(1);
        let tuesdayCell = row.insertCell(2);
        let wednesdayCell = row.insertCell(3);
        let thursdayCell = row.insertCell(4);
        let fridayCell = row.insertCell(5);
        let saturdayCell = row.insertCell(6);
        let sundayCell = row.insertCell(7); 
        console.log('User before loop:')
        console.log(user);
        console.log('Shift List before loop:');
        console.log(shftList.length);
        //go through all shifts
        shftList.forEach((shift) => {
            if (user == shift.user.idNumber){
                console.log(userCell);
                if(userCell.innerHTML == "") {
                    console.log("call add name")
                    userCell.innerHTML = shift.user.firstName + " " + shift.user.lastName;
                    userCell.classList.add("table-dark");
                }
                let s = shift.start.dateTime;
                let e = shift.end.dateTime;
                let start = new Date(s.date.year, s.date.month - 1, s.date.day, s.time.hour, s.time.minute, s.time.second);
                let end = new Date(e.date.year, e.date.month - 1, e.date.day, e.time.hour, e.time.minute, e.time.second);
                let dayOfWeek = start.getDay().toString();
                switch(dayOfWeek) {
                    case "0":
                        sundayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        sundayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "1":
                        mondayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        mondayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "2":
                        tuesdayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        tuesdayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "3":
                        wednesdayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        wednesdayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "4":
                        thursdayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        thursdayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "5":
                        fridayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        fridayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                    case "6":
                        saturdayCell.innerHTML = s.time.hour + ":" + s.time.minute + " to " + e.time.hour + ":" + e.time.minute;
                        saturdayCell.style.backgroundColor = "rgba(255,193,14,255)";
                        break;
                }
            }
        });
    }
}

//when All Departments Clicked
$("#allDeptBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    if (allListCalled == false) {
        initRequest.open('GET', 'http://localhost:8080/api/staff', false);
        initRequest.send();
        shftList = allList.slice();
    } else if (allListCalled) {
        shftList = allList.slice();
    }
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
        studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', false);
        studItInitRequest.send();
        shftList = studItList.slice();
    } else if (askItCalled) {
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
        askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', false);
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
        genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', false);
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
    if (allListCalled == false) {
        initRequest.open('GET', 'http://localhost:8080/api/staff', false);
        initRequest.send();
        shftList = allList.slice();
    } else if (allListCalled) {
        shftList = allList.slice();
    }
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
    console.log(managerCalled);
    if (managerCalled == false) {
        managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
        managerInitRequest.send();
        console.log(managerList);
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
        seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
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
    console.log(casualCalled);
    if (casualCalled == false) {
        casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
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
    shftList.length = 0;
    allList.length = 0;
    allListCalled = false;
    studItList.length = 0;
    studItCalled = false;
    askItList.length = 0;
    askItCalled = false;
    genEnqList.length = 0;
    genEnqCalled = false;
    managerList.length = 0;
    managerCalled = false;
    seniorList.length = 0;
    seniorCalled = false;
    casualList.length = 0;
    casualCalled = false;
    
    //get selected filters
    var dept = document.getElementById('selectedOption').innerHTML;
    var role = document.getElementById('selectedRole').innerHTML;
    console.log(dept);
    console.log(role);
    var deptShifts = new Array;
    var roleShifts = new Array();
    
    //set new date
    currentDate.setDate(currentDate.getDate() + 7);
    setDates();
    switch(dept) {
        case "All Departments":
            allList = [];
            initRequest.open('GET', 'http://localhost:8080/api/staff', false);
            initRequest.send();
            deptShifts = allList.slice();
            break;
        case "Student IT":
            studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', false);
            studItInitRequest.send();
            deptShifts = studItList.slice();
            break;
        case "Ask IT":
            askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', false);
            askItInitRequest.send();
            deptShifts = askItList.slice();
            break;
        case "General Enquiries":
            genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', false);
            genEnqInitRequest.send();
            deptShifts = genEnqList.slice();
            break;
    }
    switch(role) {
        case "All Roles":
            allList.length = 0;
            initRequest.open('GET', 'http://localhost:8080/api/staff', false);
            initRequest.send();
            roleShifts = allList.slice();
            break;
        case "Manager":
            managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
            managerInitRequest.send();
            roleShifts = managerList.slice();
            break;
        case "Senior":
            seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
            seniorInitRequest.send();
            roleShifts = seniorList.slice();
            break;
        case "Casual":
            casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
            casualInitRequest.send();
            roleShifts = casualList.slice();
            break;
    }
    //compare common values and assign shift list
    console.log(allList);
    shftList = deptShifts.filter(a => roleShifts.some(b => a.eventID === b.eventID));
    console.log(shftList);
    fillCalendar();
    
});

//When Back Button Clicked
$("#back-button").on("click", function(){
    //reset calendar and stored queries
    $("#tbody").empty();
    shftList.length = 0;
    allList.length = 0;
    allListCalled = false;
    studItList.length = 0;
    studItCalled = false;
    askItList.length = 0;
    askItCalled = false;
    genEnqList.length = 0;
    genEnqCalled = false;
    managerList.length = 0;
    managerCalled = false;
    seniorList.length = 0;
    seniorCalled = false;
    casualList.length = 0;
    casualCalled = false;
    
    //get selected filters
    var dept = document.getElementById('selectedOption').innerHTML;
    var role = document.getElementById('selectedRole').innerHTML;
    console.log(dept);
    console.log(role);
    var deptShifts = new Array;
    var roleShifts = new Array();
    
    //set new date
    currentDate.setDate(currentDate.getDate() - 7);
    setDates();
    switch(dept) {
        case "All Departments":
            allList = [];
            initRequest.open('GET', 'http://localhost:8080/api/staff', false);
            initRequest.send();
            deptShifts = allList.slice();
            break;
        case "Student IT":
            studItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/StudentIT', false);
            studItInitRequest.send();
            deptShifts = studItList.slice();
            break;
        case "Ask IT":
            askItInitRequest.open('GET', 'http://localhost:8080/api/staff/department/AskIT', false);
            askItInitRequest.send();
            deptShifts = askItList.slice();
            console.log(deptShifts);
            break;
        case "General Enquiries":
            genEnqInitRequest.open('GET', 'http://localhost:8080/api/staff/department/GeneralEnquiries', false);
            genEnqInitRequest.send();
            deptShifts = genEnqList.slice();
            break;
    }
    switch(role) {
        case "All Roles":
            allList.length = 0;
            initRequest.open('GET', 'http://localhost:8080/api/staff', false);
            initRequest.send();
            roleShifts = allList.slice();
            break;
        case "Manager":
            managerInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Manager', false);
            managerInitRequest.send();
            roleShifts = managerList.slice();
            break;
        case "Senior":
            seniorInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Senior', false);
            seniorInitRequest.send();
            roleShifts = seniorList.slice();
            break;
        case "Casual":
            casualInitRequest.open('GET', 'http://localhost:8080/api/staff/role/Casual', false);
            casualInitRequest.send();
            roleShifts = casualList.slice();
            break;
    }
    //compare common values and assign shift list
    shftList = deptShifts.filter(a => roleShifts.some(b => a.eventID === b.eventID));
    fillCalendar();    
});