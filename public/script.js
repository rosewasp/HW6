// most of the code from DOM and Events Assignment...
// and from XML request lecture and Activity.

// will be used to load and update entry
var form = document.getElementById("secret");

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
var headers = ["Exercise", "Repetitions", "Weight", "Unit", "Date"]
headers.forEach(function(i){
	var newHead = document.createElement("th");
  newHead.textContent = i;
  newHead.id = "id" + i;
  rowOne.appendChild(newHead);
  });

document.addEventListener("DOMContentLoaded", function(){
  // database is parsed and table body is updated
  var req = new XMLHttpRequest();
  req.open("GET", "/database", true);
  req.addEventListener("load", function(){
    var response = JSON.parse(req.responseText);
    var usableData = JSON.parse(response.results);
    var newBody = htmlTable(usableData); // new table body is formed
    var oldBody = document.getElementById("tableBody");
    workoutLog.removeChild(oldBody); // old table body is removed
    newBody.id = "tableBody";
    workoutLog.appendChild(newBody); // new body is added to workout log
  });
  req.send(null);
  event.preventDefault();

  // add insert functionality
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

    // update page to reflect addition to database
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

  // add update functionality to "Update Existing Log Entry" button
  document.getElementById("submit2").addEventListener("click", function(event){
    var editId = form.id; // the exact database row to be updated
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
    
    // workouts cannot be updated without a name
    if (name == "") {
      return;
    }
  
    // transform form elements into /update url
    var route = "/update?";
    var nameUrl = "name"+"="+name+"&";
    var repsUrl = "reps"+"="+reps+"&";
    var weightUrl = "weight"+"="+weight+"&";
    var dateUrl = "date"+"="+date+"&";
    var lbsUrl = "lbs"+"="+lbs+"&";
    var updateUrl = route + nameUrl + repsUrl + weightUrl + dateUrl + lbsUrl + "id=" + editId;
  
    // add to database
    req.open("GET", updateUrl, true);

    // reform the table body to reflect the most recent update
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
        // again lbs data is processed differently (check = true = 1 = lb)
        if (k == "lbs"){
          if (j[k] == 1){
            newCell.textContent = "lb";
          } else{
            newCell.textContent = "kg";
          }
        } else if (k == "date") {
          //date = new Date(j[k]);
          newCell.textContent = j[k];
        } else {
          newCell.textContent = j[k];
        }
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
        // row to be deleted
        var deleteId = this.id;
        var req = new XMLHttpRequest();
        var deleteUrl = "/delete?id=" + deleteId;

        // deleted row from database
        req.open("GET", deleteUrl, true);

        // refresh table to reflect most recent ommision from database
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
        // database row that is to be edited
        var editId = this.id;
        var req = new XMLHttpRequest();
        var editUrl = "/edit?id=" + editId;
        form.id = editId; // updating secret id to facilitate in updating a specific row

        req.open("GET", editUrl, true);
        

        req.addEventListener("load", function(){
          var req = new XMLHttpRequest();
          req.open("GET", editUrl, true);
          req.addEventListener("load", function(){
            var response = JSON.parse(req.responseText);
            var usableData = JSON.parse(response.results);

            // instead of making table load data to form
            // notice there is no need to reform table body in edit
            // it simply loads data to form
            var formIds = ["name", "reps", "weight", "lbs", "date"];
            usableData.forEach(function(element){
              formIds.forEach(function(key){
                if (key == "lbs"){
                  if (element[key] == 1){
                    document.getElementById(key).checked = true;
                  } else {
                    document.getElementById(key).checked = false;
                  }
                } else {
                  document.getElementById(key).value = element[key];
                };
              });
            });
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