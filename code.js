var squareLength = 3;
var length = 9;

var numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let originalValues = [];
let myValues = [];
let backup = [];
let exampleValues = [
    ["", 4, 7, "", "", 6, "", 8, "", "", "", "", "", 4, "", "", 9, 7, "", 9, "", 2, 7, "", "", "", 1, "", 1, "", "", 8, "", 2, 7, 4, "", "", 3, "", "", "", "", 6, "", "", "", "", 7, "", 4, "", "", "", "", "", "", 1, "", "", "", 2, "", "", "", "", "", "", 7, "", "", 5, 7, "", 1, "", 2, "", 9, "", ""], 
    ["", 3, "", 1, "", "", "", 7, 9, "", 5, "", 7, "", "", 3, 6, "", "", "", 6, "", "", "", "", 1, "", "", 1, "", "", "", "", "", "", 6, 7, 6, "", "", 3, "", 2, 8, "", 4, "", 8, 9, "", "", "", "", 3, 3, "", "", 2, "", "", 6, 4, "", "", 9, "", "", "", "", 8, 3, "", "", "", 5, "", "", 3, "", "", 7], 
    [9, "", "", "", "", "", 5, "", 2, 3, "", 6, 2, 9, 5, "", "", "", "", "", 8, 1, "", "", "", "", 9, 6, "", "", "", "", "", "", "", "", 5, "", "", "", "", 1, "", "", 3, "", 1, 2, 9, 5, "", "", "", 8, 7, "", "", "", "", "", "", 2, 1, "", "", "", 4, "", "", "", 7, 6, "", 2, "", 3, 7, "", 9, "", ""], 
    ["", "", "", "", 1, "", 9, 2, 3, "", 9, 1, "", 2, "", "", "", 4, "", "", "", 9, 8, "", "", 6, "", "", 1, "", "", "", 5, "", 9, "", "", "", "", 3, 4, "", "", 8, "", 5, 8, 3, "", "", "", "", "", "", 1, "", "", 7, "", "", 2, "", "", "", 3, 9, "", 5, "", 7, "", "", "", "", "", "", "", 8, 1, "", 9], 
    [6, 9, "", "", "", 8, "", "", 2, "", "", "", 9, 3, "", "", 7, "", 3, "", "", "", "", "", 8, 9, 5, "", "", 9, 5, "", "", 2, 1, "", 1, 8, "", 4, "", "", "", "", 3, "", "", 6, "", "", "", "", "", "", 9, "", "", 3, "", 5, 6, "", "", "", 1, "", "", 4, 9, 3, 5, "", "", 6, 3, "", 2, "", 9, "", ""], 
    ["", "", 2, "", "", 6, "", "", "", 4, "", "", 1, "", 2, 6, "", 8, "", "", "", 4, 3, "", "", "", 7, "", "", "", 2, 4, 1, 7, "", "", "", 1, 7, "", "", 8, "", 3, "", "", "", 5, "", 6, "", 8, 1, "", "", 2, 4, "", "", "", "", "", 1, "", "", "", "", 2, "", 5, 8, "", 8, "", "", "", 1, "", 2, "", 4], 
    [1, "", 2, "", 7, "", "", 4, "", "", 7, "", "", 5, "", "", "", 9, "", "", "", 9, 1, 4, "", "", "", 3, "", 7, 4, "", 9, "", "", 1, "", "", "", "", "", 7, "", "", "", 4, "", "", 1, 8, "", 6, "", 7, 2, "", "", "", 9, 1, "", "", "", "", "", 6, "", "", "", "", "", 8, "", "", "", "", 3, 8, "", 2, 4], 
    [3, "", "", "", 8, 2, "", "", "", 4, "", "", 9, "", "", 2, "", "", 8, "", 2, 5, "", "", "", "", 6, "", "", "", "", "", "", "", 6, "", "", "", 6, "", 4, "", 8, 9, 7, "", 8, "", "", "", "", "", "", 3, "", 7, "", "", "", "", 6, "", 1, "", "", 8, 3, "", "", "", "", "", "", "", 1, 7, 6, "", "", "", ""], 
    [5, "", 9, 4, 2, "", "", 6, "", "", "", 7, "", "", "", 8, "", "", "", "", "", "", 8, "", 5, 9, "", "", "", "", 9, 7, "", "", 5, 8, "", 9, "", "", "", "", 3, "", "", "", 5, 8, "", "", "", 9, 2, 1, 1, "", 4, "", 9, 8, 6, "", "", 9, 6, "", 2, "", 4, "", "", "", "", "", "", "", "", "", 2, "", ""], 
    [3, "", 8, 1, 2, "", "", "", 9, 1, "", "", "", "", "", "", 2, 7, "", 4, "", "", "", "", "", "", "", 5, "", "", "", 7, 8, "", 4, 3, "", 3, "", 6, 5, "", 8, "", "", "", 8, "", 3, "", "", 5, 9, "", "", "", 7, "", "", "", 2, 1, "", 2, "", "", "", "", "", 9, "", "", "", "", "", 2, 6, "", "", "", ""]
]

let solved;
let myTable = document.getElementsByTagName("tbody");
let inputs = document.getElementsByTagName("input");

function initiate() {
    solved = false;
    backup = [];
    gatherData();
    myValues = originalValues.slice();
    solve(0, false);
}

//main solve function. It will be called many many times recursively.
//the last parameter is only used for logging and popping from the array of logs
function solve(index, last) {
    //finished
    if (index === 81) {
        solved = true;
        
        fillGrid(myValues);
        return;
    }

    if (myValues[index] !== "") {
        return solve(index+1, last);
    }
    
    //get all legal values that can be inputted
    let available = getAvailable(checkPossible(index));
    if (available.length === 0) {
        if (last) {

            let isLast = backup[backup.length-1]["last"];
            backup.pop();

            while (isLast) {
                isLast = backup[backup.length-1]["last"];
                backup.pop();
            }
        }
        return;
    }

    else {
        let sifted;
        if (available.length !== 1) {
            sifted = siftAvailable(available, index);
        }
        else {
            sifted = available.slice()
        }
        //log the current state into the backup array
        backup.push(new log(myValues.slice(), last));

        //go through each available values and try solving the sudoku with it.
        //if you fail, go back and try the next value in the array, and so on...
        for (let value = 0; value < sifted.length; value++) {
            myValues = backup[backup.length -1]["values"].slice();
            let newVal = sifted[value];
            myValues.splice(index, 1, newVal);
            solve(index+1, value === sifted.length-1);
            if (solved) {return;}

        }
    }
}

//return an array of all the values that cannot be inputted at the current position
function checkPossible(element) {
    let curRow = Math.floor(element/length);
    let curCol = element % length;
    let valuesTaken = [];
    for (let position = curRow * length; position < (curRow+1) * length; position ++) {
        if (myValues[position] !== "") {
            addToTaken(myValues[position]);
        }
    }
    for (let position = curCol; position < length*length; position += length) {
        if (myValues[position] !== "") {
            addToTaken(myValues[position]);
        }
    }
    for (let row = curRow - (curRow % squareLength); row < curRow - (curRow % squareLength) + squareLength; row ++) {
        for (let col = curCol - (curCol % squareLength); col < curCol - (curCol % squareLength) + squareLength; col ++) {
            let position = row * length + col;
            if (myValues[position] !== "") {
                addToTaken(myValues[position]);
            }
        }
    }
    return valuesTaken;

    //adds a value to the array of values taken if it's not already in that array
    function addToTaken(value) {
        if (valuesTaken.indexOf(Number(value)) == -1) {
            valuesTaken.push(Number(value));
        }
    }
}

//collects all the data inputted by the user, before starting the solving process
function gatherData() {
    originalValues = [];
    for (let index = 0; index < length * length; index++) {
        if (inputs[index].value !== "") {
            originalValues.push(Number(inputs[index].value));
        }
        else {
            inputs[index].classList.add("solution");
            originalValues.push(inputs[index].value);   
        }
    }
}

//takes in as a parameter the array of all values already taken, and returns the remaining legal ones.
function getAvailable(taken) {
    let availableValues = numberList.slice();
    taken.forEach(function(element) {
        availableValues.splice(availableValues.indexOf(Number(element)), 1);
    })
    return availableValues;
}

//takes in an array of legal values, and the index of the current square
//runs some tests to reduce the number of items in available values array
//so that we don't go through all legal ones.
//checks if some value in the legal ones can only be inputted in the current square 
//and nowhere else in the row, column and section. if there is one such, it gets returned
//as the sifted value.
function siftAvailable(available, index) {
    let curRow = Math.floor(index/length);
    let curCol = index % length;

    let sifted = siftRow(available.slice());
    if (sifted.length === 1) {return sifted;}

    sifted = siftCol(available.slice());
    if (sifted.length === 1) {return sifted;}

    sifted = siftSection(available.slice());
    return sifted;

    function siftRow(arr) {
        let vals = arr.slice();
        for (let position = curRow * length; position < (curRow+1) * length; position ++) {
            if (myValues[position] === "" && position !== index && vals.length !== 0) {
                vals = vals.diff(getAvailable(checkPossible(position)))
            }
        }
        if (vals.length === 1) {
            return vals;
        }
        else {
            return arr;
        }
    }

    function siftCol(arr) {
        let vals = arr.slice();
        for (let position = curCol; position < length*length; position += length) {
            if (myValues[position] === "" && position !== index && vals.length !== 0) {
                vals = vals.diff(getAvailable(checkPossible(position)))
            }
        }
        if (vals.length === 1) {
            return vals;
        }
        else {
            return arr;
        }
    }

    function siftSection(arr) {
        let vals = arr.slice();
        for (let row = curRow - (curRow % squareLength); row < curRow - (curRow % squareLength) + squareLength; row ++) {
            for (let col = curCol - (curCol % squareLength); col < curCol - (curCol % squareLength) + squareLength; col ++) {
                let position = row * length + col;
                if (myValues[position] === "" && position !== index && vals.length !== 0) {
                    vals = vals.diff(getAvailable(checkPossible(position)))
                }
            }
        }
        if (vals.length === 1) {
            return vals;
        }
        else {
            return arr;
        }
        
    }
}

//get random array from examples array and fill the grid with it, at the same time,
function fillExample() {
    let vals = exampleValues[getRandomIndex(exampleValues)];
    for (let index = 0; index < length * length; index++) {
        inputs[index].value = vals[index];
        inputs[index].className = "";
    }   
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * (arr.length));
    }
}

//fill grid with values - used after sudoku has been solved
function fillGrid(arrayOfValues) {
    for (let index = 0; index < length * length; index++) {
        inputs[index].value = arrayOfValues[index];
    }   
}

//need logging because of recursion. when an attempt fails, need to go back to the state of
//the grid from before some choice
function log(values, last) {
    this.values = values;
    this.last = last;
}

//array method that checks if there is a value in the original array that doesn't occur
//in the other array. It returns an array with all such values, if any.
if (!Array.prototype.diff) {
    Array.prototype.diff = function(otherArray) {
        let values = this.slice();
        for (let i = 0; i < this.length; i++) {
            if (otherArray.includes(this[i])) {
                values.splice(values.indexOf(this[i]), 1);
            }
        }
        return values;
    }
}
  
//polyfill for IE
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {
  
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
          return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
        while (k < len) {
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }
        return false;
      }
    });
}