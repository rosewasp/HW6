// most of the code from DOM and Events Assignment...
// and from XML request lecture and Activity.


// connect "Update Workout Log" button to...
// "/insert" to database
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("submit").addEventListener("click", function(event) {
  
    var req = new XMLHttpRequest(); // variable needed to make an Ajax request
  
    // get all the values from the workout log form
    var name = document.getElementById("name").value
    var reps = document.getElementById("reps").value
    var weight = document.getElementById("weight").value
    var date = document.getElementById("date").value
    
    // Boolean has to be processed differently
    // for it to take effect in database
    var trueFalse = document.getElementById("lbs").checked
    if (trueFalse){
      var lbs = 1
    } else {
      var lbs = 0
    }
    
    // workouts cannot be logged without a name
    if (name == "") {
      return;
    }
  
    // transform form elements into /insert url
    var route = "/insert?"
    var nameUrl = "name"+"="+name+"&"
    var repsUrl = "reps"+"="+reps+"&"
    var weightUrl = "weight"+"="+weight+"&"
    var dateUrl = "date"+"="+date+"&"
    var lbsUrl = "lbs"+"="+lbs
    var insertUrl = route + nameUrl + repsUrl + weightUrl + dateUrl + lbsUrl
  
    // add to database
    req.open("GET", insertUrl, true);
  
    req.addEventListener("load", function() {
      var response = JSON.parse(req.responseText); // displays the number of rows inserted, not the response from database
  
      // need response that is database as JSON
      var req = new XMLHttpRequest(); // make new AJAX request
      // get everything from database
      req.open("GET", '/database', true);
  
      // process '/database' response into a table
      req.addEventListener("load", function() {
        var response = JSON.parse(req.responseText);
        document.getElementById("results").textContent = response;
      });
      req.send(null);
  
      event.preventDefault();
    });
  
    req.send(null);
  
    event.preventDefault();
  });
};

// form a table from each row in database
// each table row will have edit and delete button