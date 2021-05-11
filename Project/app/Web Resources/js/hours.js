"use strict";
var userId;
var startOfPeriod;
var daysInPeriod

function getHours() {
    var frm = document.getElementById("form");
    var text = "";
    var i;
    userId = frm.elements[0].value;
    startOfPeriod = frm.elements[1].value;
    document.getElementById("result").innerHTML = startOfPeriod;
}


