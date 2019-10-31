var form = document.getElementById('addForm');

var totalStaymSec;
var totalStayNight;

form.addEventListener('submit', addItem);

// Add item
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
      
      //console.log(totalStayNight);
      //console.log(totalNights);

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
    else {
      confirm ("Please enter the checkout date after checkin date.");
    }
  }
  else confirm ("Total guests can not exceed 18.");
} // addItem()

////////////////////////////////////////////////////////////////////////////
// Calendar
var Cal_array = 
[
"11-04-2019","11-05-2019","11-06-2019", "11-07-2019",
"11-09-2019","11-10-2019","11-11-2019", "11-12-2019", "11-13-2019", "11-14-2019", "11-15-2019",
"11-18-2019","11-19-2019","11-20-2019",
"11-22-2019","11-23-2019","11-24-2019", "11-25-2019", "11-26-2019", "11-27-2019", "11-28-2019",
"12-04-2019","12-05-2019","12-06-2019", "12-07-2019",
"12-09-2019","12-10-2019","12-12-2019", "12-12-2019", "12-13-2019", "12-14-2019",
"12-18-2019","12-19-2019","12-20-2019",
"12-22-2019","12-23-2019","12-24-2019", "12-25-2019", "12-26-2019", "12-27-2019", "12-28-2019",
"12-29-2019","12-30-2019","12-31-2019", "01-01-2020", "01-02-2020", "01-03-2020",
"01-05-2020","01-06-2020", "01-07-2020",
"01-09-2020","01-10-2020","01-11-2020", "01-12-2020", "01-13-2020", "01-14-2020", "01-15-2020",
"01-18-2020","01-19-2020","01-20-2020", "01-21-2020",
"01-22-2020","01-23-2020","01-24-2020", "01-25-2020", "01-26-2020", "01-27-2020", "01-28-2020",
"02-01-2020","02-02-2020","02-03-2020", "02-04-2020", 
"02-05-2020","02-06-2020", "02-07-2020",
"02-09-2020","02-10-2020","02-11-2020", "02-12-2020", "02-13-2020", "02-14-2020", "02-15-2020",
"02-18-2020","02-19-2020","02-20-2020", "02-21-2020", "02-22-2020",
"02-24-2020","02-25-2020","02-26-2020", "02-27-2020", "02-28-2020", "02-29-2020"
];

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
      var string = jq.datepicker.formatDate('mm-dd-yy', date);
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
    var string = jq.datepicker.formatDate('mm-dd-yy', date);
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
    var string = jq.datepicker.formatDate('mm-dd-yy', date);
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