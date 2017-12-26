

//make a 9x9 grid. 
// make an array of 81 numbers. but they cannot be random.
// start by rows. that is, randomly assign 9


// first lets try a 4x4 sudoku.

//make an array of 16 numbers (4 per row)
//randomly assign the first number in the first row (out of 1-4), then randomly assign out of the remaining numbers and 
// so on until you fill the entire row. Now the fun starts...

//squareLength = 2

//start with a solver than is just brute force. when error detected, you start again with random numbers. eventually you'll get there...

var squareLength = 3;
var length = 9;

var numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let originalValues = [];
let myValues = [];

let valuesTaken, availableValues;
let myTable = document.getElementsByTagName("tbody");
let inputs = document.getElementsByTagName("input");

//go through each entry. if that entry is already filled, do nothing. if  that entry is 'x' then
// apply the for loops above (but need to imporve them), then
//get the available numbers and choose a random one of them.
//when you get to a point where no available numbers, and you haven't finished yet,
//then bring back the original values and start all over.
function initiate() {
    gatherData();
    start();
}

function start() {
    // gatherData();
    myValues = originalValues.slice(); 
    for (let entry = 0; entry < length * length; entry++) {
        console.log("entered the loop, with entry value of " + entry);
        if (myValues[entry] === "") {
            //apply checks
            //choose a random number from available
            //input that number into the array of myValues, in the place of the ""
            checkPossible(entry);
            //so now we have added the numbers that are already taken into the valuesTaken array
            //so what we need to do is compare valuesTaken with numberList, get a list of the available ones and choose
            // a random one from them and input it in the place of the "" in myValues array.

            //if after the entire checkPossible of that element, there are no values available, then var myValues = originalValues.slice(); and 
            // start() again.
            updateAvailable();

            if (availableValues.length === 0) {
                // alert("didn't find a solution, starting again");
                console.log("didn't find a solution, starting again");
                restoreGrid();
                return start();
            }
            
            else {
                //now I should have the avalableValues array with only those that can be put in place of x
                //put a random one in place of x in the myValues array.
                // console.log("current entry is: ");
                // console.log(entry);
                console.log("available values are: ");
                console.log(availableValues);
                // console.log("current state is: ");
                // console.log(myValues);
                let newVal = availableValues[getRandomIndex()];
                console.log("newVal chosen: ");
                console.log(newVal);
                myValues.splice(entry, 1, newVal);
                // console.log("current myValues: ");
                // console.log(myValues);
                updateGrid(entry);
                // console.log("and after changing, state is: ");
                // console.log(myValues);
            }

        }
    }

}

//okay, those are the values. now.
function checkPossible(element) {
    console.log("in checkPossible");
    let curRow = Math.floor(element/length);
    let curCol = element % length;
    //get the inputted values in the row, column and square:
    valuesTaken = [];
    //check columns in the current row
    console.log("current row and column are: ");
    console.log(curRow, curCol);
    for (let position = curRow * length; position < (curRow+1) * length; position ++) {
        // console.log("position: " + position);
        if (myValues[position] !== "") {
            // console.log("adding to valuesTaken: " + myValues[position]);
            addToTaken(myValues[position]);
        }
    }
    // console.log("after row check, valuesTaken are: ");
    // console.log(valuesTaken);
    for (let position = curCol; position < length*length; position += length) {
        if (myValues[position] !== "") {
            addToTaken(myValues[position]);
        }
    }
    // console.log("after column check, valuesTaken are: ");
    // console.log(valuesTaken);
    for (let row = curRow - (curRow % squareLength); row < curRow - (curRow % squareLength) + squareLength; row ++) {
        for (let col = curCol - (curCol % squareLength); col < curCol - (curCol % squareLength) + squareLength; col ++) {
            let position = row * length + col;
            if (myValues[position] !== "") {
                addToTaken(myValues[position]);
            }
        }
    }
    console.log("after all checks, valuesTaken are: ");
    console.log(valuesTaken);
}


//helper for adding a value to the array if it's not already in the array

function addToTaken(value) {
    if (valuesTaken.indexOf(Number(value)) == -1) {
        valuesTaken.push(Number(value));
    }
}

function getRandomIndex() {
    return Math.floor(Math.random() * (availableValues.length));
}

function updateGrid(index) {
    let myRow = Math.floor(index/length);
    let myCol = index % length;

    //get the right td element and change its inner text to myValues.index
    let myCell = myTable[0].children[myRow].children[myCol];
    myCell.children[0].classList.add("solution");
    myCell.children[0].value = myValues[index];

}

function gatherData() {
    originalValues = [];
    for (let index = 0; index < length * length; index++) {
        if (inputs[index].value !== "") {
            originalValues.push(Number(inputs[index].value));
        }
        else {
            originalValues.push(inputs[index].value);   
        }
    }
}

function updateAvailable() {
    // console.log("in updateAvailable function");
    availableValues = numberList.slice();
    valuesTaken.forEach(function(element) {
        // console.log("element: " + element);
        //remove the element from availableValues
        availableValues.splice(availableValues.indexOf(Number(element)), 1);
    })
}

//put the correct values on the grid. data is in originalValues array.
function restoreGrid() {
    for (let index = 0; index < length * length; index++) {
        inputs[index].value = originalValues[index];
    }   
}