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
  
  // HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  
  
  
  // Added code to display the current date in the header of the page.
  
  updateTime();
  setInterval(updateTime, 1000);

  function updateTime(){

    var today = dayjs().tz('America/Los_Angeles'); //added this feature for more tokens
    $('#currentDay').text(today.format('dddd, MMMM Do h:mm:ss A z')); 
  }

  

});
