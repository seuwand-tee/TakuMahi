/* Current date on page.Starts on the current date. */
var dateToday = new Date();

/* When work hours start for the day */
const start = 6

/* When work hours end for the day */
const end = 21

/* sets the date for today */
updateDate(dateToday);

/* render the fields */

document.addEventListener("DOMContentLoaded", function() {
  $('#calander-storage').empty()
  show_users()
});

/* update Date. */
function updateDate(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  $("#date").text(dd + "/" + mm + "/" + yyyy);
}

/* Creates a schedule for each user pulled and fills in the data */
async function show_users() {

  let usrdata = await getusrdata();
  let shiftdata = await getshiftdata(usrdata)
  let unavaliblitydata = await getunavaliblitydata(usrdata)

  // Duplicate the weekly view and create a new one for each element.
  usrdata.forEach((element, index) => {
    $("#calendar-day").clone().attr("id", "calendar-day" + usrdata[index].idNumber).removeClass("invisible").appendTo("#calander-storage");
    $('#calendar-day' + usrdata[index].idNumber + ' th:contains("User")').text(usrdata[index].firstName);
  });

  populateEvents(usrdata, shiftdata, unavaliblitydata);
  showOpenShifts();
}

function populateEvents(usrdata, shiftdata, unavailabilitydata) {

  unavailabilitydata.forEach((element, index) => {
    for (let step = 0; step < element.length; step++) {
      var usrnume;
      if (unavailabilitydata[index][step].start.date.year == dateToday.getFullYear() &&
        unavailabilitydata[index][step].start.date.month == dateToday.getMonth() + 1 &&
        unavailabilitydata[index][step].start.date.day == dateToday.getDate()) {
        usrnum = element.usrID;
        let start = unavailabilitydata[index][step].start.time.hour;
        let end = unavailabilitydata[index][step].end.time.hour;
        for (i = start; i <= end; i++) {
          $('#calendar-day' + usrnum).find('#' + i).text(unavailabilitydata[index][step].description)
            .addClass("unavailability");
        }
      }
    }
  });

  //
  console.log(shiftdata)
  shiftdata.forEach((element, index) => {
    for (let step = 0; step < element.length ; step++) {
      console.log(element[step])
      var usrnam;
      console.log(shiftdata[index][step].start.date.year == dateToday.getFullYear())
      console.log(shiftdata[index][step].start.date.month == (dateToday.getMonth() + 1))
      console.log(shiftdata[index][step].start.date.day == dateToday.getDate())
      if (shiftdata[index][step].start.date.year == dateToday.getFullYear() &&
        shiftdata[index][step].start.date.month == (dateToday.getMonth() + 1) &&
        shiftdata[index][step].start.date.day == dateToday.getDate()) {
          console.log("I work")
        usrnum = element.usrID;

        let start = shiftdata[index][step].start.time.hour
        let end = shiftdata[index][step].end.time.hour
        for (i = start; i <= end; i++) {
          console.log(i)
          $('#calendar-day' + usrnum).find('#' + i).text(shiftdata[index][step].description).removeClass("unavailability")
            .addClass("shift");
          $('#calendar-day' + usrnum).find('#' + i).text(shiftdata[index][step].description).addClass("shift");
          addUnassignShift($('#calendar-day' + usrnum).find('#' + i), shiftdata[index][step].eventID, usrnum);
        }
      }
    }
  });
}

async function getusrdata() {
  let url = 'http://localhost:8080/api/staff';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function getshiftdata(usrdata) {
  const users = [];
  for (const usr of usrdata) {
    let user = await fetch('http://localhost:8080/api/staff/shifts/' + usr.idNumber)
      .then(response => response.json())
      .then(data => {
        data["usrID"] = usr.idNumber;
        return data;
      })
    users.push(user);
  }
  return users;
}

async function getunavaliblitydata(usrdata) {
  const users = [];
  for (const usr of usrdata) {
    let user = await fetch('http://localhost:8080/api/staff/unavailability/' + usr.idNumber)
      .then(response => response.json())
      .then(data => {
        data["usrID"] = usr.idNumber;
        return data;
      })
    users.push(user);
  }
  return users;
}

function createShift() {

  //var start = 0;
  var start = new Date(dateToday.toDateString() + " " + $("#inputStart").val());
  var end = new Date(dateToday.toDateString() + " " + $("#inputEnd").val());
  var name = $("#inputName").val();
  var description = $("#inputDescription").val();
  var notes = $("#inputNotes").val();
  var type = $("#inputType").val();

  var shift = JSON.stringify({
    "start": start,
    "end": end,
    "name": name,
    "description": description,
    "notes": notes,
    "type": type
  });
  let request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:8080/api/shifts/open', false);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(shift);
  location.reload();
}

async function showOpenShifts() {
  let openShifts = await getOpenShifts();

  openShifts.forEach((element, index) => {
    if (element.start.date.year == dateToday.getFullYear() &&
      element.start.date.month == dateToday.getMonth() + 1 &&
      element.start.date.day == dateToday.getDate()) {
      $('#open-shifts').append("<li id='shift-list" + element.eventID + "' class='list-group-item'>" + "Starts: " + element.start.time.hour + ":00  " + "Ends: " + element.end.time.hour + ":00 " + "Description: " + element.description + "</li>")
      addInput($('#shift-list' + element.eventID), element.eventID);
    }
  });

}

async function getOpenShifts() {
  let url = 'http://localhost:8080/api/shifts/open';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function assignShift(usrID, eventID) {
  let url = "http://localhost:8080/api/shifts/open/" + eventID + "/" + usrID;
  fetch(url, {
    method: 'POST'
  });
}

// Runes the create shift function when shift submit button is pressed
$("#shift-submit").on("click", function() {
  createShift();
  showOpenShifts();
});

$(".calendar td").on("mouseover", function() {
  $(this).addClass("selected");
});

/* deselects the cell the mouse is in. */
$(".calendar td").on("mouseout", function() {
  $(this).removeClass("selected");
});

/* what happens when next button is clicked */
$("#next-button").on("click", function() {
  /* remove previous day's data. */
  $('#calander-storage').empty();
  $('#open-shifts').empty();

  /* Set the date of the page to be tomorrow */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateToday = tomorrow;
  updateDate(dateToday);
  show_users();
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function() {
  /* remove previous day's data. */
  $('#calander-storage').empty();
  $('#open-shifts').empty();
  /* set the date on the page to be yesterday */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() - 1);
  dateToday = tomorrow;
  updateDate(dateToday);
  show_users();
});

function addInput(listElement, eventid) {
  listElement.on("click", function() {
    var usr = prompt("Please enter the user id for this shift");
    assignShift(Number(usr), eventid);
    location.reload();
  });
}

function addUnassignShift(listElement, shiftID, usrID) {
  listElement.on("click", function() {
    confirm = prompt("Are you sure you want to ussasign this shift?");
    if (confirm == "y") {
      unassignShift(shiftID, usrID);
      $('#calander-storage').empty();
      location.reload();
    } else{
      alert("value isn't valid")
    }
  });
}

// TODO: Figure out how I want to delete shifts.
function inputShift(timeElement, usrID) {
  time.on("click", function() {
    unassignShift(shiftID, usrID);
    timeElement.removeClass("shift");
  })
}


async function unassignShift(shiftID, usrID) {
  /* First unassign */
  let url = "http://localhost:8080/api/shifts/open/" + shiftID + "/" + usrID;
  fetch(url, {
    method: 'PUT'
  });
}

async function deleteShift(shiftID) {
  /* First unassign */
  let url = "http://localhost:8080/api/shifts/open/" + shiftID;
  fetch(url, {
    method: 'delete'
  });
}
