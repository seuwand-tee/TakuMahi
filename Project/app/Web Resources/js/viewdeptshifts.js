"use strict";

//Lists for storing queries
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

//GeneralEnquiries Reques
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
initRequest.send();
allList = shftList.slice();
fillTable();

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
            console.log(shftList);
            shftList = shftList.filter(a => studItList.some(b => a.eventID === b.eventID));
            console.log(shftList);
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