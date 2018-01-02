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

function solve(index, last) {
    console.log("in solve function. index is " + index);
    //finished
    if (index === 81) {
        solved = true;
        
        fillGrid(myValues);
        return;
    }

    if (myValues[index] !== "") {
        return solve(index+1, last);
    }
    
    let available = getAvailable(checkPossible(index));

    console.log("available values are:");
    console.log(available);
    if (available.length === 0) {
        if (last) {

            let isLast = backup[backup.length-1]["last"];
            backup.pop();
            console.log("popped");
            console.log(backup[backup.length -1]);

            while (isLast) {
                isLast = backup[backup.length-1]["last"];
                backup.pop();
            }
        }
        return;
    }

    else {
        let sifted;
        if (available !== 1) {
            sifted = siftAvailable(available, index);
        }
        else {
            sifted = available.slice()
        }
        console.log("sifted values are: ");
        console.log(sifted);
        backup.push(new log(myValues.slice(), last));
        console.log("backing up");
        // console.log(myValues);

        for (let value = 0; value < sifted.length; value++) {
            console.log("in for loop with value: " + value);
            console.log("index is: " + index);
            // console.log("backups array is ");
            // console.log(backup);
            // console.log("backup array length is " + backup.length);
            myValues = backup[backup.length -1]["values"].slice();
            console.log("myValues from backup are: ");
            console.log(myValues);
            console.log("length of backup array is: " + backup.length);
            let newVal = sifted[value];
            console.log("newVal chosen is " + newVal);
            myValues.splice(index, 1, newVal);
            solve(index+1, value === sifted.length-1);
            if (solved) {return;}

        }
    }



}

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

    function addToTaken(value) {
        if (valuesTaken.indexOf(Number(value)) == -1) {
            valuesTaken.push(Number(value));
        }
    }
}


// function updateGrid(index) {
//     let myRow = Math.floor(index/length);
//     let myCol = index % length;
//     let myCell = myTable[0].children[myRow].children[myCol];
//     myCell.children[0].classList.add("solution");
//     myCell.children[0].value = myValues[index];

// }

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

function getAvailable(taken) {
    let availableValues = numberList.slice();
    taken.forEach(function(element) {
        availableValues.splice(availableValues.indexOf(Number(element)), 1);
    })
    return availableValues;
}

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
//get random array from examples
    let vals = exampleValues[getRandomIndex(exampleValues)];
    for (let index = 0; index < length * length; index++) {
        inputs[index].value = vals[index];
        inputs[index].className = "";
    }   
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * (arr.length));
    }
}

function fillGrid(arrayOfValues) {
    for (let index = 0; index < length * length; index++) {
        inputs[index].value = arrayOfValues[index];
    }   
}

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