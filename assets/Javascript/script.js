// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// NOTE: This outside function stays. It readys your program when the document is fully loaded.
$(function () {

  // This is required for playing around with more clock features.
  dayjs.extend(window.dayjs_plugin_advancedFormat);
  dayjs.extend(window.dayjs_plugin_utc); // This plugin adds support for UTC mode
  dayjs.extend(window.dayjs_plugin_timezone); // This plugin adds support for time zones


  // Added a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in local storage. 
  $('.saveBtn').on('click', function(){

    // take user input and store it in variable by taking the text associated with the div.
    var task = $(this).siblings('textarea').val();

    // takes time slot using this keyword again references the parent id and attributes this ID for localstorage later. Works because parent div only has one id.
    var timeBlock = $(this).parent().attr('id');

    localStorage.setItem(timeBlock, task);
  })
  

  // Added code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
 

  // Originally did this as a for loop but then discovered each() method and wanted to give it a shot.
  $('.time-block').each(function (){


    // declared inside because time is live and constantly changing
    var hour = dayjs().tz('America/Los_Angeles').hour();
    
    // sets to variable that current indexed box, splits the text into smaller arrays, and then takes the number at the end of the id and then converts it to a value. 
    var blockHour = parseInt($(this).attr('id').split("-")[1]);

    // Lets make some comparisons to assert different classes!
    if ( blockHour < hour){
      // again this keyword refers to '.time-block' indexed element.
      $(this).removeClass("present future").addClass("past");
    }
    else if(blockHour === hour){
      $(this).removeClass("past future").addClass("present");
    }
    else {
      $(this).removeClass("past present").addClass("future");
    }



  });






  // Added code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  
  // Functions primary purpose is to keep the text when the user refreshes page.
  $('.time-block').each(function(){


    // selects each tag with time block id and associates it w a variable.
    var identifiedBlock = $(this).attr('id');

    // selects each entry saved 
    var localVal = localStorage.getItem(identifiedBlock);
    // populates text into textarea with local variable if they match
    // Otherwise if empty nothing happens
    if (localVal !== null){
      $(this).find('textarea').val(localVal);
    }

  })


  
  
  // Added code to display the current date in the header of the page.
  
  updateTime();
  setInterval(updateTime, 1000);

  function updateTime(){

    var today = dayjs().tz('America/Los_Angeles'); //added this feature for more tokens
    $('#currentDay').text(today.format('dddd, MMMM Do h:mm:ss A z')); 
  }

  
//REPLACE LINES 94 and 38 tz('') to test the following timezones:
// Pacific/Fiji
// Pacific/Guadalcanal
// Pacific/Pago_Pago
// America/Hawaii
// America/Los_Angeles

});
