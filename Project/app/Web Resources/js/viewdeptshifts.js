"use strict";

class User {
    
    constructor(idNumber, firstName, lastName) {
        if(idNumber){
            this.idNumber = idNumber;
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
}

class UserList {
    
    constructor() {
        this.userList = new Array();
    }
    
    addUser(user) {
        this.userList.push(user);
    }
}

class ShiftList {
    
    constructor() {
        this.shiftList = new Array();
    }
    
    getShifts() {
        return this.shiftList;
    }
    
    addShift(shift) {
        this.shiftList.push(shift);
    }
}

var departments = ["All Departments", "StudentIT", "AskIT", "GeneralEnquiries"];
var shftList = new Array();
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

//All Departments Requests
var allDeptInitRequest = new XMLHttpRequest();
var allDeptRequest = new XMLHttpRequest();
allDeptInitRequest.open('GET', 'http://localhost:8080/api/staff', false);
allDeptInitRequest.onload = function () {
    var data = JSON.parse(allDeptInitRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        allDeptRequest.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        allDeptRequest.onload = function () {
            var shifts = JSON.parse(allDeptRequest.response);
            for(let j=0; j<shifts.length; j++) {
                shftList.push(shifts[j]);
            }
        };
        allDeptRequest.send();
    }
};

//StudentIT Requests
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
};

//GeneralEnquiries
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
        GenEnqRequest.send();
    }
};

//initial setup
initRequest.send();
fillTable();

//fills table with shifts in the shftList array
function fillTable(){
    const table = document.getElementById("tbody");
    console.log("Shift List length: " + shftList.length);
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
    allDeptInitRequest.send();
    fillTable();
});

//when StudentIT Clicked
$("#studItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    studItInitRequest.send();
    fillTable();
});

//when AskIT Clicked
$("#askItBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    askItInitRequest.send();
    fillTable();
});

//when GeneralEnquiries Clicked
$("#genEnqBtn").on("click", function(){
    $("#tbody").empty();
    shftList = [];
    genEnqInitRequest.send();
    fillTable();
});