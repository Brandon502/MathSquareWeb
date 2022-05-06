//TODO NEXT Add ng-module inputted numbers. Erase on new game.
var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope) {
    $scope.newGame = function() {
        game = createGame();
        $scope.operators = game[1];
        $scope.expectedValues = game[2];
        $scope.displayOp = game[1].join('').replaceAll('*','×'); //Change * to ×
    };
    setMainListener();
    $scope.newGame();
});

var activeNum = null;

function setMainListener() {
    for (i = 0; i < 9; i++) {
        $(`#mainNum${i}`).click(mainNumberClick)
    };
}

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

function createGame(weights = [.25, .25, .25, .25, .25, .25, .25, .25]) { //weights currently ignored

    checkLoop:
    for(x=0; x<1000; x++) {
        numbers = shuffle();
        operators = [];
        for (i = 0; i < 12; i++) {
            rand = Math.random();
            
            if (rand < .25) {
                operators.push('+');
            }
            else if (rand < .5) {
                operators.push('-');
            }
            else if (rand < .75) {
                operators.push('*');
            }
            else {
                operators.push('/');
            }

        }

        //Rows and Columns
        rc = [
            `(${numbers[0]} ${operators[0]} ${numbers[1]}) ${operators[1]} ${numbers[2]}`,   //Row 1
            `(${numbers[3]} ${operators[5]} ${numbers[4]}) ${operators[6]} ${numbers[5]}`,   //Row 2
            `(${numbers[6]} ${operators[10]} ${numbers[7]}) ${operators[11]} ${numbers[8]}`, //Row 3
            `(${numbers[0]} ${operators[2]} ${numbers[3]}) ${operators[7]} ${numbers[6]}`,   //Col 1
            `(${numbers[1]} ${operators[3]} ${numbers[4]}) ${operators[8]} ${numbers[7]}`,   //Col 2
            `(${numbers[2]} ${operators[4]} ${numbers[5]}) ${operators[9]} ${numbers[8]}`    //Col 3             
        ]

        for(check in rc) {
            if (countDecimals(eval(rc[check])) > 4) { //DECIMAL CHECK
                continue checkLoop //Too many decimals restart loop
            }
        }
        
        //All Values Passed Decimal Check
        values = []
        for(value in rc) {
            values.push(eval(rc[value]))
        }

        return [numbers, operators, values];
    }

}

function shuffle() {
    let numbers = [1,2,3,4,5,6,7,8,9];
    let shuffled = numbers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return shuffled;
}

function countDecimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}    
// function evaluateMath(num, op, location) {
//     // Takes in a number list, operators list and location such as 'r1' and evaulates the equation
//     Locations = {
//         'r1': `${num[0]} ${op[0]} ${num[1]} ${op[1]} ${num[2]}`,
//         'r2': `${num[3]} ${op[5]} ${num[4]} ${op[6]} ${num[5]}`,
//         'r3': `${num[6]} ${op[10]} ${num[7]} ${op[11]} ${num[8]}`,
//         'c1': `${num[0]} ${op[2]} ${num[3]} ${op[7]} ${num[6]}`,
//         'c2': `${num[1]} ${op[3]} ${num[4]} ${op[8]} ${num[7]}`,
//         'c3': `${num[2]} ${op[4]} ${num[5]} ${op[9]} ${num[8]}`     
//     }

//     return eval(Locations[location])
// }