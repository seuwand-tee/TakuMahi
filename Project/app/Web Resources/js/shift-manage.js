/* Current date on page.Starts on the current date. */
var dateToday = new Date();

/* sets the date for today */
updateDate(dateToday);

/* render the fields */
show_users();

/* update Date. */
function updateDate(date){
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  $("#date").text(dd + "/" + mm + "/" + yyyy);
}

/* Creates a schedule for each user pulled and fills in the data */
async function show_users(){

  let usrdata = await getusrdata();
  let shiftdata = getshiftdata(usrdata, 0);
  console.log(shiftdata);
  let unavaliblitydata = getunavaliblitydata(usrdata, 0);
  console.log(unavaliblitydata);

  // Duplicate the weekly view and create a new one for each element.
  usrdata.forEach((element, index) => {
    $("#calendar-day").clone().attr("id", "calendar-day" + index).removeClass("invisible").appendTo("body");
    $('#calendar-day' + index  + ' th:contains("User")').text(usrdata[index].firstName);
  });
}

async function getusrdata(){
  let url = 'http://localhost:8080/api/staff';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch(error){
    console.log("Error: " + error);
  }
}

function getshiftdata(usrdata){
  let result = []
  usrdata.forEach((element, index) => {
    fetch('http://localhost:8080/api/staff/shifts/' + usrdata[index].idNumber)
    .then(response => response.json())
    .then(data => result.push(data));
  console.log(result);
})
}


function getunavaliblitydata(usrdata) {
  let url = 'http://localhost:8080/api/staff/unavailability/' + usrdata[index].idNumber;
  .then(response => response.json())
  .then(data => result.push(data));
  console.log(result);
  })
}

$(".calendar td").on("mouseover", function(){
  $(this).addClass("selected");
});
  /* deselects the cell the mouse is in. */
$(".calendar td").on("mouseout", function(){
  $(this).removeClass("selected");
});

/* what happens when next button is clicked */
$("#next-button").on("click", function(){
  /* Set the date of the page to be tomorrow */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateToday = tomorrow;
  updateDate(dateToday);
});

/* what happens when save button is clicked */
$("#save-button").on("click", function(){
  alert("Not supported yet!");
});

/* what happens when previous button is clicked */
$("#previous-button").on("click", function(){
  /* set the date on the page to be yesterday */
  const tomorrow = new Date(dateToday);
  tomorrow.setDate(tomorrow.getDate() -1 );
  dateToday = tomorrow;
  updateDate(dateToday);
});
