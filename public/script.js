// most of the code from DOM and Events Assignment...
// and from XML request lecture and Activity.

// Create table node
var workoutLog = document.createElement("table");
workoutLog.id = "workoutLog";
document.body.appendChild(workoutLog);
// Create table head and add it to table
var tableHead = document.createElement("thead");
var rowOne = document.createElement("tr");

// add first row with appropriate headings
workoutLog.appendChild(tableHead);
tableHead.appendChild(rowOne);
var headers = ["Exercise", "Repitions", "Weight", "Unit", "Date"]
headers.forEach(function(i){
	var newHead = document.createElement("th");
  newHead.textContent = i;
  newHead.id = "id" + i;
  rowOne.appendChild(newHead);
  });

document.addEventListener("DOMContentLoaded", function(){
  var req = new XMLHttpRequest();
  req.open("GET", "/database", true);
  req.addEventListener("load", function(){
    var response = JSON.parse(req.responseText);
    var usableData = JSON.parse(response.results);
    var newBody = htmlTable(usableData);
    var oldBody = document.getElementById("tableBody");
    workoutLog.removeChild(oldBody);
    newBody.id = "tableBody";
    workoutLog.appendChild(newBody);
  });
  req.send(null);
  event.preventDefault();

  document.getElementById("submit").addEventListener("click", function(event){

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

    req.addEventListener("load", function(){
      var req = new XMLHttpRequest();
      req.open("GET", "/database", true);
      req.addEventListener("load", function(){
        var response = JSON.parse(req.responseText);
        var usableData = JSON.parse(response.results);
        var newBody = htmlTable(usableData);
        var oldBody = document.getElementById("tableBody");
        workoutLog.removeChild(oldBody);
        newBody.id = "tableBody";
        workoutLog.appendChild(newBody);
      });
      req.send(null);
      event.preventDefault();
    });
    req.send(null);
    event.preventDefault();
  });
});


// a function to turn database data into HTML table
function htmlTable(data){

  // when JSON data is passed
  if (data != null){
    // add body to table
    var tableBody = document.createElement("tbody");
    tableBody.id = "tableBody"
    workoutLog.appendChild(tableBody);
    
    var databaseColumns = ["name", "reps", "weight","lbs", "date"]
    //iterate through each element in JSON data
    data.forEach(function(j){
      var newRow = document.createElement("tr");
      databaseColumns.forEach(function(k){
        var newCell = document.createElement("td");
        newCell.textContent = j[k];
        newRow.appendChild(newCell);
      });
      // add a delete button to each newRow
      newDiv = document.createElement("div");
      newRow.appendChild(newDiv);
      deleteInput = document.createElement("input");
      newDiv.appendChild(deleteInput);
      deleteInput.id = j.id;
      deleteInput.type = "button";
      deleteInput.value = "Delete Entry";

      // add functionality to delete button
      deleteInput.addEventListener("click", function(){
        var deleteId = this.id;
        var req = new XMLHttpRequest();
        var deleteUrl = "/delete?id=" + deleteId;
        req.open("GET", deleteUrl, true);

        deleteRow = this.parentElement.parentElement;
        rowParent = deleteRow.parentElement;
        req.addEventListener("load", function(){
          rowParent.removeChild(deleteRow);
          var req = new XMLHttpRequest();
          req.open("GET", "/database", true);
          req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var usableData = JSON.parse(response.results);
            var newBody = htmlTable(usableData);
            var oldBody = document.getElementById("tableBody");
            workoutLog.removeChild(oldBody);
            newBody.id = "tableBody";
            workoutLog.appendChild(newBody);
          });
          req.send(null);
          event.preventDefault();
        });
        req.send(null);
        event.preventDefault();
      });

      // add an edit button to each newRow
      editInput = document.createElement("input");
      newDiv.appendChild(editInput);
      editInput.id = j.id;
      editInput.type = "button";
      editInput.value = "Edit Entry";

      // add functionality to edit button
      editInput.addEventListener("click", function(){
        var editId = this.id;
        var req = new XMLHttpRequest();
        var editUrl = "/edit?id=" + editId;

        req.addEventListener("load", function(){
          var req = new XMLHttpRequest();
          req.open("GET", editUrl, true);
          req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var usableData = JSON.parse(response.results);

            // instead of making table load data to form
            console.log(usableData);
          });
          req.send(null);
          event.preventDefault();
        });
        req.send(null);
        event.preventDefault();
      });

      // add new row to table's body
      tableBody.appendChild(newRow);
    });
  };
  return tableBody;
};


/*
// add functionality to edit button
      editInput.addEventListener("click", function(){
        var editId = this.id;
        var req = new XMLHttpRequest();

        // get all the values from the workout log form
        var name = document.getElementById("name").value;
        var reps = document.getElementById("reps").value;
        var weight = document.getElementById("weight").value;
        var date = document.getElementById("date").value;
        
        // Boolean has to be processed differently
        // for it to take effect in database
        var trueFalse = document.getElementById("lbs").checked;
        if (trueFalse){
          var lbs = 1;
        } else {
          var lbs = 0;
        };
        // workouts cannot be logged without a name
        if (name == "") {
          return;
        };
        
        // transform form elements into /edit url
        var route = "/edit?";
        var nameUrl = "name"+"="+name+"&";
        var repsUrl = "reps"+"="+reps+"&";
        var weightUrl = "weight"+"="+weight+"&";
        var dateUrl = "date"+"="+date+"&";
        var lbsUrl = "lbs"+"="+lbs+"&";
        var editUrl = route + nameUrl + repsUrl + weightUrl + dateUrl + lbsUrl + "id=" + editId;
        
        // edit database
        req.open("GET", editUrl, true);

        req.addEventListener("load", function(){
          var req = new XMLHttpRequest();
          req.open("GET", "/database", true);
          req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var usableData = JSON.parse(response.results);
            var newBody = htmlTable(usableData);
            var oldBody = document.getElementById("tableBody");
            workoutLog.removeChild(oldBody);
            newBody.id = "tableBody";
            workoutLog.appendChild(newBody);
          });
          req.send(null);
          event.preventDefault();
        });
        req.send(null);
        event.preventDefault();
      });

*/