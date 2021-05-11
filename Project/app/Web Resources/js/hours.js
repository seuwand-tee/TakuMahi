"use strict";

function getHours() {
    var userId;
    var sop;
    var startOfPeriod;
    var daysInPeriod;
    var result = "";
    //extract values from form
    var frm = document.getElementById("form");
    userId = frm.elements[0].value;
    sop = frm.elements[1].value.toString();
    daysInPeriod = frm.elements[2].value;
    //define period variables
    let count = 1;
    let pyear = "";
    let pmonth = "";
    let pday = "";
    for(var i = 0; i < sop.length; i++) {
         if(sop.charAt(i) !== "-" && count == 1) {
             pyear += sop.charAt(i).toString();
         } else if(sop.charAt(i) !== "-" && count == 2){
             pmonth += sop.charAt(i).toString();
         } else if(sop.charAt(i) !== "-" && count == 3){
             pday += sop.charAt(i).toString();
         } else if(sop.charAt(i) == "-"){
             count++;
         } 
      }
    //set start of period for request
    startOfPeriod = pmonth + "-" + pday + "-" + pyear;
    //request
    let initRequest = new XMLHttpRequest();
    initRequest.open('GET', 'http://localhost:8080/api/staff/hours/' + userId + '?startOfPeriod=' + startOfPeriod + '&daysInPeriod=' + daysInPeriod, true);
    initRequest.onLoad = function () {
        //if (initRequest.status >= 200 && initRequest.status < 400) {
            result = this.response;   
        //}    
    }
    initRequest.send()
    console.log((initRequest.response).toString());
    
    document.getElementById("result").innerHTML = result;
}


