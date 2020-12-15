
const add = function(a,b){
    return a + b;
}

const subtract = function(a,b){
    return a - b;
}

const multiply = function(a,b){
    return a * b;
}

const divide = function(a,b){
    return a / b;
}

const exponent = function(a,b){
    return Math.pow(a,b);

}

const modulo = function(a,b){
    return ( (a % b) + b) % b;
}


// Basic Calculation

const operate = function(a,operator,b){

    a = Number(a);
    b = Number(b);

    switch(operator){
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case "÷":
            return divide(a,b);
            break;
        case "^":
            return exponent(a,b);
            break;
        case "%":
            return modulo(a,b);
            break;
    }
}

// Operating Calculation


const clickInput = function(e){

    let condition = e.target.id;
   
    switch(condition){
        case "clear":
            clearHistory();
            break;
        case "backspace":
            backOneInput();
            break;
        case "equal":
            calResult();
            break;
        default:
            getInput(e);
        }
        

}
// Click Event
let control = "on";
let lastInput = "";
const controlDot = function(e){
    let inputClass = e.target.className;

    if(inputClass == "operator") control = "on";
    if(lastInput == ".") control = "off";
    
    lastInput = e.target.id; 
    console.log(control)
    return control;  

}

// One Dot Per Number

let equation =[];
let counter = 0;
const getEquation = function(e){
    if(!equation[1]){
        counter = 0;
    }

    let input = e.target.textContent;
    if(e.target.className == "number"){
        if(typeof(equation[counter]) === "undefined") equation[counter] = "";
        equation[counter] = equation[counter] + input;
    }else{
        counter += 1;
        equation[counter] = input;
        counter += 1;
    }
    console.log(equation)
    return equation;

}

// Get Equation

const history = document.querySelector(".history");
const result = document.querySelector(".result");

const getInput = function(e){

    if(result.textContent){
        history.textContent = result.textContent;
        result.textContent = "";
    }

    let input = e.target.textContent;
    let inputClass = e.target.className;

    if(history.textContent == "" && inputClass == "operator") return;
    if(history.textContent.length == 19) return;
    if(isNaN(history.textContent.slice(-1)) && inputClass == "operator" ) return;

    if(controlDot(e) ==  "off" && e.target.id == ".") return;

    getEquation(e);
    history.textContent= history.textContent + input;

}

// Input Process


const clearHistory = function() {

    history.innerHTML = "";
    result.textContent = "";
    equation = [];
    counter = 0;
}

// Clear History Section

const backOneInput = function(){

    if(result.textContent){
        history.textContent = result.textContent;
        result.textContent = "";
    }

    history.textContent = history.textContent.slice(0,-1);

    let array = equation.join(",");
    if(array.slice(-2, -1) == ","){
        array = array.slice(0, -2);
        equation = array.split(",");
    }else{
        array = array.slice(0, -1);
        equation = array.split(",");
    }
    console.log(equation)
    return equation;
    
}

// Back One Input



const calResult = function(){
    if(history.textContent.length <= 2) return;

    let a;
    let b;
    let operator;
    let calResult = 0;
    const operators = ["^", "÷", "*", "%", "+", "-"]

    for(let i =0; i < operators.length; i++){
        while(equation.includes(operators[i])){
            index = equation.findIndex(item => item == operators[i]);
            a = equation[index - 1];
            operator = equation[index];
            b = equation[index + 1];
            calResult = operate(a, operator, b);
            equation.splice(index - 1, 3, calResult);

        }
    }

    if(!Number.isInteger(calResult)) {
        calResult =  calResult.toFixed(2);
        calResult = Number(calResult);
    }
    if(calResult.toString().length >= 11) calResult =  calResult.toExponential(2);
    result.textContent = calResult;

}




const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",clickInput));



