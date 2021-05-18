/* Current date on page.Starts on the current date. */
var dateToday = new Date();

/* When work hours start for the day */
const start = 6

/* When work hours end for the day */
const end = 21

/* sets the date for today */
updateDate(dateToday);

/* render the fields */
show_users();

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
  //console.log(shiftdata[0]);
  let unavaliblitydata = await getunavaliblitydata(usrdata)

  // Duplicate the weekly view and create a new one for each element.
  usrdata.forEach((element, index) => {
    $("#calendar-day").clone().attr("id", "calendar-day" + usrdata[index].idNumber).removeClass("invisible").appendTo("#calander-storage");
    $('#calendar-day' + usrdata[index].idNumber + ' th:contains("User")').text(usrdata[index].firstName);
  });

  populateEvents(usrdata, shiftdata, unavaliblitydata);
}

function populateEvents(usrdata, shiftdata, unavailabilitydata) {

  unavailabilitydata.forEach((element, index) => {
    var usrnume;
    if (unavailabilitydata[index][0].start.dateTime.date.year == dateToday.getFullYear() &&
      unavailabilitydata[index][0].start.dateTime.date.month == dateToday.getMonth() + 1 &&
      unavailabilitydata[index][0].start.dateTime.date.day == dateToday.getDate()) {
      usrnum = unavailabilitydata[index][0].user.idNumber;
      console.log(unavailabilitydata[index][0])
      let start = unavailabilitydata[index][0].start.dateTime.time.hour;
      let end = unavailabilitydata[index][0].end.dateTime.time.hour;
      for (i = start; i <= end; i++) {
        $('#calendar-day' + usrnum).find('#' + i).text(unavailabilitydata[index][0].description)
          .addClass("unavailability");
      }
    }
  });

  //
  shiftdata.forEach((element, index) => {
    var usrnam;
    if (shiftdata[index][0].start.dateTime.date.year == dateToday.getFullYear() &&
      shiftdata[index][0].start.dateTime.date.month == (dateToday.getMonth() + 1) &&
      shiftdata[index][0].start.dateTime.date.day == dateToday.getDate()) {
      usrnum = shiftdata[index][0].user.idNumber;

      let start = shiftdata[index][0].start.dateTime.time.hour
      let end = shiftdata[index][0].end.dateTime.time.hour
      for (i = start; i <= end; i++) {
        $('#calendar-day' + usrnum).find('#' + i).text(unavailabilitydata[index][0].description).removeClass("unavailability")
          .addClass("shift");
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
        return data;
      })
    users.push(user);
  }
  return users;
}

function createShift(){

  //var start = 0;
  console.log(dateToday);
  var start = new Date(dateToday.toDateString() + " " + $("#inputStart").val());
  console.log(start);
  var end =  new Date(dateToday.toDateString() + " " + $("#inputEnd").val());
  var name = $("#inputName").val();
  var description = $("#inputDescription").val();
  var notes = $("#inputNotes").val();
  var type = $("#inputType").val();

  console.log(JSON.stringify({ "start": start.toString(), "end": end, "name": name, "description": description, "notes": notes, "type": type }));
  var shift = JSON.stringify({ "start": start, "end": end, "name": name, "description": description, "notes": notes, "type": type });
  let request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:8080/api/shifts/open', false);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(shift);
}

function showOpenShifts(){
  let openShifts = getOpenShifts();
}

async function getOpenShifts(){
  let url = 'http://localhost:8080/shifts/open';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log("Error: " + error);
  }
}

// Runes the create shift function when shift submit button is pressed
$("#shift-submit").on("click", function(){
  console.log("Test");
  createShift();
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

  /* Set the date of the page to be tomorrow */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateToday = tomorrow;
  updateDate(dateToday);
  show_users();
});

/* what happens when save button is clicked */
$("#save-button").on("click", function() {
  alert("Not supported yet!");
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function() {
  /* remove previous day's data. */
  $('#calander-storage').empty();
  /* set the date on the page to be yesterday */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() - 1);
  dateToday = tomorrow;
  updateDate(dateToday);
  show_users();
});
