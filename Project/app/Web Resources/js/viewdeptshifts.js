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

var initRequest = new XMLHttpRequest();
var request = new XMLHttpRequest();
var departments = ["All Departments", "StudentIT", "AskIT", "GeneralEnquiries"];
var shftList = new Array();
var userId;

//initial request - all staff
initRequest.open('GET', 'http://localhost:8080/api/staff', false);
initRequest.onload = function () {
    var data = JSON.parse(initRequest.response);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        console.log("ID:" + userId);
        request.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, false);
        request.onload = function () {
            var shifts = JSON.parse(request.response);
            console.log("Data Length:" + shifts.length);
            for(let j=0; j<shifts.length; j++) {
                console.log(shifts[j]);
                shftList.push(shifts[j]);
            }
        };
        request.send();
        console.log("Run " + i);
    }
};

//initial setup
document.getElementById("buttons").innerHTML = "<button id=\"allDeptBtn\" type=\"button\">"+departments[0]+"</button><button id=\"studItBtn\" type=\"button\">"+departments[1]+"</button><button id=\"askItBtn\" type=\"button\">"+departments[2]+"</button><button id=\"genEnqBtn\" type=\"button\">"+departments[3]+"</button>";
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
    console.log("worked");
});

//when StudentIT Clicked
$("#studItBtn").on("click", function(){
    console.log("worked");
});

//when AskIT Clicked
$("#askItBtn").on("click", function(){
    console.log("worked");
});

//when GeneralEnquiries Clicked
$("#genEnqBtn").on("click", function(){
    console.log("worked");
});