var activeNum = null;

var GAME = {
    inputed: ["", "", "",
              "", "", "",
              "", "", ""],
    operators: ["+", "+",
                "-", "-", "-",
                "+", "+",
                "-", "-", "-",
                "+", "+"],
    expectedValues: [10, 10, 10, 10, 10, 10, 10]
}


window.onload = (event) => {
    setUpMainGrid();
    setUpInputNums();
};

function setUpMainGrid() {
    grid = document.getElementById('numberGrid');
    
    //GRID 7x7 49 divs
    for (d = 0; d < 49; d++) {
        div = document.createElement("div");
        div.id = d;
        div.classList.add("grid-item")
        grid.append(div);
    };      
    //Main Numbers
    mainNumbers = [0,2,4,14,16,18,28,30,32] //Number IDs
    for (num in mainNumbers) {
        div = document.getElementById(mainNumbers[num]);
        div.id = `mainNum${num}`;
        div.classList.add("mainNumber");
        div.addEventListener("click", mainNumberClick);
    };
    //Operators
    operators = [1,3,7,9,11,15,17,21,23,25,29,31] //Operator IDs
    for (operator in operators){
        div = document.getElementById(operators[operator]);
        div.id = `op${operators[operator]}`
        div.classList.add("operator");
        div.innerHTML = "+";        
    };

    //Equals
    equals = [5,19,33,35,37,39] //Eqal IDs
    for (equ in equals) {
        div = document.getElementById(equals[equ]);
        div.classList.add("equals");
        div.innerHTML = '=';
    };
    
    //Values
    values = [6,20,34,42,44,46] //Value IDs
    for (value in values) {
        div = document.getElementById(values[value]);
        div.id = `value${value}`
        div.classList.add("values");
        div.innerHTML = 10;
    };
};

function setUpInputNums() {
    inputDiv = document.getElementById("inputNumbers")
    for (i = 1; i < 10; i++) {
        div = document.createElement("div");
        div.id = `inputNum${i}`;
        div.classList.add("inputNumber");
        div.innerHTML = i;

        inputDiv.append(div);
    }
};
function mainNumberClick() {
    if (activeNum != null) {
        previous = document.getElementById(activeNum);
        previous.classList.remove("active");
    }
    this.classList.add("active");
    activeNum = this.id;
};

document.addEventListener('keydown', (event) =>{
 
    // console.log(event.key);
    if (isNumber = isFinite(event.key) && activeNum != null && event.key != 0) {
        inputNumber(event.key);
    }
    else {
        switch(event.key){
            case "ArrowLeft": 
                changeActiveCell(-1); 
                break;
            case "Tab":
                event.preventDefault();
            case "ArrowRight": 
                changeActiveCell(1); 
                break;
            case "ArrowUp": 
                changeActiveCell(-3); 
                break;
            case "Enter":
            case "ArrowDown": 
                changeActiveCell(3); 
                break;
        }
    }
})


// Input Number Function Controls Grid Pencilmark Layout
function inputNumber(num) {
    cell = document.getElementById(activeNum);
    numbers = cell.innerHTML;

    
    numbers = numbers.replace(/&nbsp;/gi, '');
    numbers = numbers.replace(/<br>/gi,'');
    console.log(numbers);

    if (numbers.includes(num)) {
        
        numbers = numbers.replace(num,'')

    }
    else {
        numbers += num
    }
    console.log (numbers.length);
    
    if (numbers.length == 1) {
        cell.innerHTML = numbers;
        cell.classList.add("regularInput");
        cell.classList.remove("pencilMark");
    }
    else {
        grid = [];
        for (i = 1; i<10; i++) {
            if (numbers.includes(i)) {
                grid.push(i);
            }
            else {
                grid.push("&nbsp")
            }
        }
        grid.splice(3,0,'<br>');
        grid.splice(7,0,'<br>');
        cell.innerHTML = grid.join('');
        cell.classList.remove("regularInput");
        cell.classList.add("pencilMark");
    }

}

//Simulates Click to change active cell
function changeActiveCell(increment) {
  
    num = activeNum.slice(-1);
    num = (parseInt(num) + increment) % 9;
    if (num < 0) {num += 9};
    num = `mainNum${num}`
    
    document.getElementById(num).dispatchEvent(new Event('click'));
}