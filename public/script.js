// Create table node
var fourByFour = document.createElement("table");
fourByFour.style.borderStyle = "solid";
fourByFour.style.borderColor = "black";

// add table to body of html
document.body.appendChild(fourByFour);

// Create table head and add it to table
var tableHead = document.createElement("thead");
var rowOne = document.createElement("tr");

// add first row
fourByFour.appendChild(tableHead);
tableHead.appendChild(rowOne);

// add cells in first row (header cells)
for(var i = 1; i < 5; i++){
	var newHead = document.createElement("th");
  newHead.textContent = "Header "+ i;
  newHead.style.borderStyle = "solid";
  newHead.style.borderColor = "black";
  rowOne.appendChild(newHead);
}

// add table body
var tableBody = document.createElement("tbody");
fourByFour.appendChild(tableBody);

// add second row to table body
var rowTwo = document.createElement("tr");
tableBody.appendChild(rowTwo);

//add cells to second row
for(var j = 0; j < 4; j++){
	var newCell = document.createElement("td");
  newCell.textContent = 1 + "," + (j+1);
  newCell.style.borderStyle = "solid";
  newCell.style.borderColor = "black";
  rowTwo.appendChild(newCell);
}

// add third row to table body
var rowThree = document.createElement("tr");
tableBody.appendChild(rowThree);

// add cells to third row
for(var k = 0; k < 4; k++){
	var newCell = document.createElement("td");
  newCell.textContent = 2 + "," + (k+1);
  newCell.style.borderStyle = "solid";
  newCell.style.borderColor = "black";
  rowThree.appendChild(newCell);
}

// add fourth row to table body
var rowFour = document.createElement("tr");
tableBody.appendChild(rowFour);

// add cells to fourth row
for(var l = 0; l < 4; l++){
	var newCell = document.createElement("td");
  newCell.textContent = 3 + "," + (l+1);
  newCell.style.borderStyle = "solid";
  newCell.style.borderColor = "black";
  rowFour.appendChild(newCell);
}

// Button Creation

var upButton = document.createElement("button");
upButton.textContent = "up";
upButton.id = "up";
document.body.appendChild(upButton);

var downButton = document.createElement("button");
downButton.textContent = "down";
downButton.id = "down";
document.body.appendChild(downButton);

var leftButton = document.createElement("button");
leftButton.textContent = "left";
leftButton.id = "left";
document.body.appendChild(leftButton);

var rightButton = document.createElement("button");
rightButton.textContent = "right";
rightButton.id = "right";
document.body.appendChild(rightButton);

var markButton = document.createElement("button");
markButton.textContent = "Mark Cell";
markButton.id = "mark";
document.body.appendChild(markButton);

// Variable for selected cell

var selectedBody = fourByFour.firstElementChild.nextElementSibling;
var selectedRow = selectedBody.firstElementChild;
var selectedCell = selectedRow.children[0];
var childNum = 0
selectedCell.style.borderWidth = "5px";

// Moving Cells

function moveRight(){
	if (selectedRow.children[3] === selectedCell){
  	return
  } else {
  	selectedCell.style.borderWidth = "medium";
    selectedCell = selectedCell.nextElementSibling;
    childNum += 1;
    selectedCell.style.borderWidth = "5px";
  }
}

document.getElementById("right").addEventListener("click", moveRight);

function moveLeft(){
	if (selectedRow.children[0] === selectedCell){
  	return
  } else {
  	selectedCell.style.borderWidth = "medium";
    selectedCell = selectedCell.previousElementSibling;
    childNum -= 1;
    selectedCell.style.borderWidth = "5px";
  }
}

document.getElementById("left").addEventListener("click", moveLeft);

function moveDown(){
	if (selectedBody.children[2] === selectedRow){
  	return
  } else {
  	selectedCell.style.borderWidth = "medium";
    selectedRow = selectedRow.nextElementSibling;
    selectedCell = selectedRow.children[childNum];
    selectedCell.style.borderWidth = "5px";
  }
}

document.getElementById("down").addEventListener("click", moveDown);

function moveUp(){
	if (selectedBody.children[0] === selectedRow){
  	return
  } else {
  	selectedCell.style.borderWidth = "medium";
    selectedRow = selectedRow.previousElementSibling;
    selectedCell = selectedRow.children[childNum];
    selectedCell.style.borderWidth = "5px";
  }
}

document.getElementById("up").addEventListener("click", moveUp);

function markYellow() {
	selectedCell.style.backgroundColor = "yellow";
}

document.getElementById("mark").addEventListener("click", markYellow);