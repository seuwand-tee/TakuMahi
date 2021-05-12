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

//class Shift {
//    
//    constructor(name, shiftId, type, user, start, end) {
//        if(shiftId){
//            this.name = name;
//            this.shiftId = shiftId;
//            this.type = type;
//            this.user = user;
//            this.start = start;
//            this.end = end;
//        }
//    }
//}

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
initRequest.open('GET', 'http://localhost:8080/api/staff', true);
initRequest.onload = function () {
    var data = JSON.parse(initRequest.response);
    console.log(data.length);
    for(let i=0; i<data.length; i++){
        let userId = data[i].idNumber;
        console.log(userId);
        request.open("GET", "http://localhost:8080/api/staff/shifts/" + userId, true);
        request.onload = function () {
            var shifts = JSON.parse(request.response);
            shifts.forEach((shift)=> {
                console.log(shift);
                shftList.push(shift);
            });
        }
        request.send();
    }
}

document.getElementById("test").innerHTML = "<a href='*'>"+departments[0]+"</a><a href='*'>"+departments[1]+"</a><a href='*'>"+departments[2]+"</a><a href='*'>"+departments[3]+"</a>";
initRequest.send();
//fillTable();

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
