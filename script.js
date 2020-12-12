
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function exponent(a,b){
    return Math.pow(a,b);

}

function factorial(a){
    if(a==0) return 1;
    let product = 1;
    for(let i = a; i > 0; i--){
        product *= i;
    }
    return product;
}

// Basic Calculation




function operate(a,b,operator){
    switch(operator){
        case add:
            return add(a,b);
            break;
        case subtract:
            return subtract(a,b);
            break;
        case multiply:
            return multiply(a,b);
            break;
        case divide:
            return divide(a,b);
            break;
        case exponent:
            return exponent(a,b);
            break;
    }
}