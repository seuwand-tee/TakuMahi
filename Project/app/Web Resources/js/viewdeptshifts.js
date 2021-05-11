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

class Shift {
    
    constructor(name, shiftId, type, user, start, end) {
        if(shiftId){
            this.name = name;
            this.shiftId = shiftId;
            this.type = type;
            this.user = user;
            this.start = start;
            this.end = end;
        }
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
var usrList = new UserList();
var shftList = new Array();
var userId;

//initial request - all staff
initRequest.open('GET', 'http://localhost:8080/api/staff', true);
initRequest.onload = function () {
    var users = JSON.parse(this.response);
    console.log(users);
    for(let i=0; i<users.length; i++){
        userId = users[i].idNumber;
        let firstName = users[i].firstName;
        let lastName = users[i].lastName;
        let usr = new User(userId, firstName, lastName);
        usrList.addUser(usr);
        console.log(usr);
    }
}

//request for shifts from staff member
request.open('GET', 'http://localhost:8080/api/staff/shifts/0', true);
request.onload = function () {
    var shifts = JSON.parse(this.response);
    console.log(shifts.length);
    for(let j = 0; j<shifts.length; j++){
        let name = shifts[j].name;
        let shiftId = shifts[j].eventId;
        let type = shifts[j].type;
        let staff = 0;
        let start = shifts[j].start;
        let end = shifts[j].end;
        let shift = new Shift(name, shiftId, type, staff, start, end);
        console.log(shift);
        shftList[j] = shift;
    }
};

document.getElementById("test").innerHTML = "<a href='*'>"+departments[0]+"</a><a href='*'>"+departments[1]+"</a><a href='*'>"+departments[2]+"</a><a href='*'>"+departments[3]+"</a>";
initRequest.send();
request.send();
fillTable();

//function setUp(){
    //initRequest.send();
    //request.send();
//}

function fillTable(){
    var myTableDiv = document.getElementById("with_results");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');

    table.border = '1';
    table.appendChild(tableBody);
    
    //headings
    var heading = new Array();
    heading[0] = "Name";
    heading[1] = "ShiftID";
    heading[2] = "Type";
    heading[3] = "User";
    heading[4] = "Start";
    heading[5] = "End";
    
    //fill table columns
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (var i = 0; i < heading.length; i++) {
        var th = document.createElement('TH');
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }
    console.log(shftList.length);
    
    //fill table rows
    for (var i = 0; i < 1; i++) {
        var tr = document.createElement('TR');
        for (var j = 0; j < 6; j++) {
            console.log(shftList);
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(shftList[i][j]));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }  
    myTableDiv.appendChild(table);
}

//for (let i=0; i<usrList.length; i++){
//        var userId = usrList[i].idNumber;
//        request.send(userId);
//    }


//
//    for(let i=0; i<usrList.length; i++){
//        var userId = usrList[i].idNumber;
//        request.open('GET', 'http://localhost:8080/api/staff/shifts/'+userId, true);
//        request.onload = function () {
//            var shifts = JSON.parse(this.response);
//            console.log(shifts);
//            for(let j = 0; j<shifts.length; j++){
//               let name = shifts[j].name;
//                let shiftId = shifts[j].eventId;
//                let type = shifts[j].type;
//                let staff = userId;
//                let start = shifts[j].start;
//                let end = shifts[j].end;
//                let shift = new Shift(name, shiftId, type, staff, start, end);
//                console.log(shift);
//                ShiftList.addShift(shift); 
//            }
//        }
//        request.send();
//    }
//}
//initRequest.send();
//
//setUp = function() {
//    console.log("test");
//    //document.getElementById("test").innerHTML = "<a href='*'>"+departments[0]+"</a><a href='*'>"+departments[1]+"</a><a href='*'>"+departments[2]+"</a><a href='*'>"+departments[3]+"</a>";
//    initRequest.send();
//    for (let i=0; i<usrList.length; i++){
//        var userId = usrList[i].idNumber;
//        request.send(userId);
//    }
//}
