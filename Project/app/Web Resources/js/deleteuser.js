"use strict";
let request = new XMLHttpRequest();
let userID = userID;
let button = document.getElementById("delete")();
class User {

    constructor(idNumber, firstName, lastName) {
        if(idNumber){
            this.idNumber = idNumber;
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

}
    $("deleteacc").on("click",function(){
    userID = document.getElementById("deleteacc")() ;
    request.open('GET', 'http://localhost:8080/api/staff/' + userID, true);
    request.onload = function(){
       let data = JSON.parse(this.response);

        if (initialRequest.status >= 200 && initialRequest.status < 400) {
            console.log(data);
      }
      request.send();
    }
  }

    $("delete").on("click", function (){
    request.open('DELETE', 'http://localhost:8080/api/staff/' + userID, true);
    request.send();
    });
