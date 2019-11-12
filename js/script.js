//  Name: Tommy Cao
//  Date: 6/10/13
//  Company: GEVH
//  Description: Great Entertainment Vacation Rental Website 
 
var form = document.getElementById('addForm');
var totalStaymSec;
var totalStayNight;

var Cal_array = 
[
"11-4-2019","11-5-2019","11-6-2019", "11-7-2019",
"11-9-2019","11-10-2019","11-11-2019", "11-12-2019", "11-13-2019", "11-14-2019", "11-15-2019",
"11-18-2019","11-19-2019","11-20-2019",
"11-22-2019","11-23-2019","11-24-2019", "11-25-2019", "11-26-2019", "11-27-2019", "11-28-2019",
"12-4-2019","12-5-2019","12-6-2019", "12-7-2019",
"12-9-2019","12-10-2019","12-12-2019", "12-12-2019", "12-13-2019", "12-14-2019",
"12-18-2019","12-19-2019","12-20-2019",
"12-22-2019","12-23-2019","12-24-2019", "12-25-2019", "12-26-2019", "12-27-2019", "12-28-2019",
"12-29-2019","12-30-2019","12-31-2019", "1-1-2020", "1-2-2020", "1-3-2020",
"1-5-2020","1-6-2020", "1-7-2020",
"1-9-2020","1-10-2020","1-11-2020", "1-12-2020", "1-13-2020", "1-14-2020", "1-15-2020",
"1-18-2020","1-19-2020","1-20-2020", "1-21-2020",
"1-22-2020","1-23-2020","1-24-2020", "1-25-2020", "1-26-2020", "1-27-2020", "1-28-2020",
"2-1-2020","2-2-2020","2-3-2020", "2-4-2020", 
"2-05-2020","2-6-2020", "2-7-2020",
"2-09-2020","2-10-2020","2-11-2020", "2-12-2020", "2-13-2020", "2-14-2020", "2-15-2020",
"2-18-2020","2-19-2020","2-20-2020", "2-21-2020", "2-22-2020",
"2-24-2020","2-25-2020","2-26-2020", "2-27-2020", "2-28-2020", "2-29-2020"
];

form.addEventListener('submit', addItem);

// Check availability
function addItem(e){
  e.preventDefault();

  // Get input value
  var checkInDate1 = document.getElementById('checkInDate').value;
  var checkOutDate1 = document.getElementById('checkOutDate').value;
  var adultsInput = document.getElementById('adultsNum').value;
  var childrenInput = document.getElementById('childrenNum').value;
  var totalGuests = Number(adultsInput) + Number(childrenInput);

  totalStaymSec = Date.parse(checkOutDate1) - Date.parse(checkInDate1);
  totalStayNight = totalStaymSec / (1000 * 60 * 60 * 24);
  //console.log(totalGuests);

  if (totalGuests < 19) { // error handling
    if (totalStaymSec > 0) { // error handling
      // console.log(checkInDate1);
      // console.log(checkOutDate1);
      
      var rentDates = dateRange(checkInDate1, checkOutDate1);

      let sameDate = [];

      // Look for date conflicts
      for (let i=0; i < Cal_array.length; i++) { 
        for (let j=0; j < rentDates.length; j++) {
          if (!Cal_array[i].localeCompare(rentDates[j])) {
            sameDate.push(Cal_array[i]);
          }
        }
      }

      if (sameDate == 0) { // Dates are available
        // Get input value
        var totalNights = 259 * totalStayNight;
        var totalTax = 0.08 * (totalNights + 200);
        var rentTotal = totalNights + 200 + totalTax;
        var grandTotal = rentTotal + 350;
        
        document.getElementById("totalGuests").innerHTML = "Guests: " + totalGuests;
        document.getElementById("totalNights").innerHTML = "Nights: " + totalStayNight;
        document.getElementById("totalCost").innerHTML = "Total: " + "$" + rentTotal.toFixed(2); // .toLocaleString(undefined, {maximumFractionDigits:2}) // insert comma but lost the .00.
        document.getElementById("taxesFees").innerHTML = "Includes taxes and fees";
        document.getElementById("viewDetails").innerHTML = "<a data-toggle='modal' href='#modalViewDetails'>View Details</a>";
        document.getElementById("bookNow").innerHTML = "<a href='input-form.html' class='btn btn-outline-secondary' role='button'>Book Now</a>";

        document.getElementById("modalViewDetailsNights1").innerHTML = totalStayNight + " nights:";
        document.getElementById("modalViewDetailsNights2").innerHTML = "$" + totalNights.toFixed(2);
        document.getElementById("modalViewDetailsCleaning").innerHTML = "$200.00";
        document.getElementById("modalViewDetailsTax").innerHTML = "$" + totalTax.toFixed(2);

        document.getElementById("modalViewDetailsTotal").innerHTML = "$" + rentTotal.toFixed(2);
        document.getElementById("modalViewDetailsDeposit").innerHTML = "$350.00";
        document.getElementById("modalViewDetailsTotal+Deposit").innerHTML = "$" + grandTotal.toFixed(2);

        document.getElementById("modalViewDetailsYourPayment").innerHTML = "$" + grandTotal.toFixed(2);
      }
      else { // Dates not available
        document.getElementById("totalGuests").innerHTML = "Dates not available. Please select different dates.";
        document.getElementById("totalNights").innerHTML = ""; // Clear the rest of screen
        document.getElementById("totalCost").innerHTML = "";
        document.getElementById("taxesFees").innerHTML = "";
        document.getElementById("viewDetails").innerHTML = "";
        document.getElementById("bookNow").innerHTML = "";
      }      
    } // checkin and checkout dates are good.
    else {
      confirm ("Please enter the checkout date after checkin date.");
    }
  } // total guests is good.
  else confirm ("Total guests can not exceed 18.");
} // addItem()

////////////////////////////////////////////////////////////////////////////
// Calendar
var jq = $.noConflict();
jq(document).ready( function() {
  jq("#availableDiv").datepicker({

  // jQuery( function() {
  // 	jQuery( "#mydiv" ).datepicker({

// jQuery.noConflict();
// (function($) {
// 		$( function() {
// 			$( "#mydiv" ).datepicker({					
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 2,
    minDate: 0, maxDate: "+2Y",
    beforeShowDay: function(date){
      var string = jq.datepicker.formatDate('m-d-yyyy', date);
      return [ Cal_array.indexOf(string) == -1 ]
    }
  });
});
//  }) (jQuery);
jq(function() {
  jq("#checkInDate").datepicker({
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 2,
    minDate: 0, maxDate: "+2Y",
    showButtonPanel: true,    
    beforeShowDay: function(date){
    var string = jq.datepicker.formatDate('m-d-yy', date);
    return [ Cal_array.indexOf(string) == -1 ]
    }
  });				
});

jq(function() {
  jq( "#checkOutDate" ).datepicker({
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 2,
    minDate: 0, maxDate: "+2Y",
    showButtonPanel: true,
    beforeShowDay: function(date){
    var string = jq.datepicker.formatDate('m-d-yy', date);
    return [ Cal_array.indexOf(string) == -1 ]
    }
  });				
});
// /////////////////////////////////////////////////////////////////////////////
// //    Map
// function initMap(){
// // Map options
// var options = {
// zoom:13,
// center:{lat:33.8366,lng:-117.9143}
// }

// // New map
// var map = new google.maps.Map(document.getElementById('Mymap'), options);

// var marker = new google.maps.Marker({
// position:{lat:33.8366,lng:-117.9143},
// map:map
// //icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
// });
// } 

var items = $(".list-wrapper .list-item");
var numItems = items.length;
var perPage = 3;

items.slice(perPage).hide();

$('#pagination-container').pagination({
  items: numItems,
  itemsOnPage: perPage,
  prevText: "&laquo;",
  nextText: "&raquo;",
  onPageClick: function (pageNumber) {
    var showFrom = perPage * (pageNumber - 1);
    var showTo = showFrom + perPage;
    items.hide().slice(showFrom, showTo).show();
  }
});

function dateRange(startDate, endDate) {
  var maxDayMonth, i;
  var start = startDate.split('/');
  var end   = endDate.split('/');
  var startDay  = parseInt(start[1]);
  var endDay    = parseInt(end[1]);
  var startMonth  = parseInt(start[0]);
  var endMonth    = parseInt(end[0]);
  var startYear  = parseInt(start[2]);
  var endYear    = parseInt(end[2]);
  var dates      = [];

  for (var k = startYear; k <= endYear; k++) {
    if (endYear > k) {
      var endMonthYear = 12; // go to the end of the year
      for( i = startMonth; i <= endMonthYear; i++) {
        findMaxDayMonth(i, k);            
        processDays(endMonthYear+1, i, k);            
      }
      startMonth = 1; // start January
    }
    else { // not full year
      for( i = startMonth; i <= endMonth; i++) {
        findMaxDayMonth(i, k);
        processDays(endMonth, i, k);
      } // for
    } // else
  } // for

  function findMaxDayMonth(monthX, yearX){
    switch (monthX) {
      case 2: // Feb
        if ((yearX % 4) == 0) {
          maxDayMonth = 29 // leap year
        }
        else {
          maxDayMonth = 28; // non leap year
        }
          break;
      case 4: case 6: case 9: case 11: // Apr, Jun, Sep, Nov
        maxDayMonth = 30;
        break;
      case 1: case 3:  case 5:  case 7: case 8: case 10: case 12: // Jan, Mar, May, Jul, Aug, Oct, Dec
        maxDayMonth = 31;
        break;
    }
  }

  function processDays(currentEndMonth, currentMonth, currentYear){
    var jDay;
    if ( currentMonth < currentEndMonth ) {
      for( jDay = startDay; jDay <= maxDayMonth; jDay++) {
        dates.push([currentMonth, jDay, currentYear].join('-')); // m-d-yyyy
      }
      startDay = 1; // reset to first of the month
    }
    else {
      for( jDay = startDay; jDay <= endDay-1; jDay++) {
        dates.push([currentMonth, jDay, currentYear].join('-')); // m-d-yyyy
      }
  }
  }

  return dates;
}    