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

initRequest.open('GET', 'http://localhost:8080/api/staff', true);
initRequest.onload = function () {
    var users = JSON.parse(this.response);
    console.log(users);
    for(let i=0; i<users.length; i++){
        let idNumber = users[i].idNumber;
        let firstName = users[i].firstName;
        let lastName = users[i].lastName;
        let usr = new User(idNumber, firstName, lastName);
        UserList.addUser(usr);
    }
    for(let i=0; i<UserList.length; i++){
        var userId = UserList[i].idNumber;
        request.open('GET', 'http://localhost:8080/api/staff/shifts/'+userId, true);
        request.onload = function () {
            var shifts = JSON.parse(this.response);
            for(let j = 0; j<shifts.length; j++){
               let name = shifts[j].name;
                let shiftId = shifts[j].eventId;
                let type = shifts[j].type;
                let staff = userId;
                let start = shifts[j].start;
                let end = shifts[j].end;
                let shift = new Shift(name, shiftId, type, staff, start, end);
                ShiftList.addShift(shift); 
            }
        }
    }
}
initRequest.send();
setUp();

function setUp() {
    document.getElementById("test").innerHTML = "<a href='*'>"+departments[0]+"</a><a href='*'>"+departments[1]+"</a><a href='*'>"+departments[2]+"</a><a href='*'>"+departments[3]+"</a>";
}

//var module = angular.module('TakuMahiApp', ['ngResource', 'ngStorage']);
//
//module.config(function ($sessionStorageProvider, $httpProvider) {
//    // get the auth token from the session storage
//    let authToken = $sessionStorageProvider.get('authToken');
//    $httpProvider.defaults.headers.common.Authorization = 'Basic ' + authToken;
//});
//
//module.factory('deptDAO', function ($resource) {
//return $resource('/api/staff/department/:department');
//});
//
//module.factory('userDAO', function ($resource) {
//return $resource('/api/staff');
//});
//
//module.factory('shiftDAO', function ($resource) {
//return $resource('/api/staff/shifts');
//});
//
//module.factory('shiftList', function () {
//    let shiftList = new ShiftList();
//    return shiftList;
//});
//
//module.factory('userList', function () {
//    let shiftList = new ShiftList();
//    return shiftList;
//});
//
//module.controller('ShiftController', function (shiftList, userList, deptDAO, userDAO, shiftDAO) {
//    
//    // click handler for the department filter buttons
//    this.selectDepartment = function (selectedDept) {
//        //original setup
//        console.log("test23");
//        this.users = userDAO.query();
//        this.departments = ["All Departments", "StudentIT", "AskIT", "GeneralEnquiries"];
//        for(let i=0; i<users.length; i++){
//            let idNumber = users[i].idNumber;
//            let firstName = users[i].firstName;
//            let lastName = users[i].lastName;
//            let usr = new User(idNumber, firstName, lastName);
//            userList.addUser(usr);
//        }
//        for(let i=0; i<userList.length; i++){
//            this.shifts = shiftDAO.query({"userId": userList[i].idNumber});
//            for(let j = 0; j<shifts.length; j++){
//                let name = shifts[j].name;
//                let shiftId = shifts[j].eventId;
//                let type = shifts[j].type;
//                let staff = userList[i].idNumber;
//                let start = shifts[j].start;
//                let end = shifts[j].end;
//                let shift = new Shift(name, shiftId, type, staff, start, end);
//                shiftList.addShift(shift);
//            }
//        }
//        this.shifts = shiftList.getShifts();
//        
//        if (selectedDept === "All Departments") {
//            this.users = userDAO.query();
//            for(let i=0; i<users.length; i++){
//                let idNumber = users[i].idNumber;
//                let firstName = users[i].firstName;
//                let lastName = users[i].lastName;
//                let usr = new User(idNumber, firstName, lastName);
//                userList.addUser(usr);
//            }
//            for(let i=0; i<userList.length; i++){
//                this.shifts = shiftDAO.query({"userId": userList[i].idNumber});
//                for(let j = 0; j<shifts.length; j++){
//                    let name = shifts[j].name;
//                    let shiftId = shifts[j].eventId;
//                    let type = shifts[j].type;
//                    let staff = userList[i].idNumber;
//                    let start = shifts[j].start;
//                    let end = shifts[j].end;
//                    let shift = new Shift(name, shiftId, type, staff, start, end);
//                    shiftList.addShift(shift);
//                }
//            }
//            this.shifts = shiftList.getShifts();
//        } else {
//            this.users = deptDAO.query({"department": selectedDept});
//            for(let i=0; i<users.length; i++){
//                let idNumber = users[i].idNumber;
//                let firstName = users[i].firstName;
//                let lastName = users[i].lastName;
//                let usr = new User(idNumber, firstName, lastName);
//                userList.addUser(usr);
//            }
//            for(let i=0; i<userList.length; i++){
//                this.shifts = shiftDAO.query({"userId": userList[i].idNumber});
//                for(let j = 0; j<shifts.length; j++){
//                    let name = shifts[j].name;
//                    let shiftId = shifts[j].eventId;
//                    let type = shifts[j].type;
//                    let staff = userList[i].idNumber;
//                    let start = shifts[j].start;
//                    let end = shifts[j].end;
//                    let shift = new Shift(name, shiftId, type, staff, start, end);
//                    shiftList.addShift(shift);
//                }
//            }
//            this.shifts = shiftList.getShifts();
//        }
//    };
    
//    this.fillTable = function (users) {
//        for(let i=0; i<users.length; i++){
//            let idNumber = users[i].idNumber;
//            let firstName = users[i].firstName;
//            let lastName = users[i].lastName;
//            let usr = new User(idNumber, firstName, lastName);
//            userList.addUser(usr);
//        }
//        for(let i=0; i<userList.length; i++){
//            this.shifts = shiftDAO.query({"userId": userList[i].idNumber});
//            for(let j = 0; j<shifts.length; j++){
//                let name = shifts[j].name;
//                let shiftId = shifts[j].eventId;
//                let type = shifts[j].type;
//                let staff = userList[i].idNumber;
//                let start = shifts[j].start;
//                let end = shifts[j].end;
//                let shift = new Shift(name, shiftId, type, staff, start, end);
//                shiftList.addShift(shift);
//            }
//        }
//    };
    
//});


