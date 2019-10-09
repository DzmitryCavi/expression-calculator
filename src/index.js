function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let prec = {};
    prec["*"] = 3;
    prec["/"] = 3;
    prec["+"] = 2;
    prec["-"] = 2;
    prec["("] = 1;
    let opStack = [];
    let postfixList = [];
    let regex = /\s/gi ;
    let elementList = expr.replace(regex,"").split("");
    let numbers = "0123456789";
    let num="";
    let ArNumbers = numbers.split("");
    let balance = 0;
    elementList.forEach(element => {
        if(element == ")"){
            balance -= 1; 
        } else if(element == "("){
            balance += 1;
        } 
    });
    if(balance != 0){ 
        throw "ExpressionError: Brackets must be paired";
    }
    
 

    elementList.forEach(element => {
         if(ArNumbers.indexOf(element) != -1){ 
            num += element; 
         } else if(element == '('){
            opStack.push(element);
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
         } else if(element == ')'){
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
            let topelement = opStack.pop();
            while(topelement != "("){
                postfixList.push(topelement);
                topelement = opStack.pop();
            }
            
        } else {
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
            while(opStack.length != 0 && prec[opStack[opStack.length-1]] >= prec[element]) {
                postfixList.push(opStack.pop());
            }  
            opStack.push(element);
        }
        
    }); 
    if(num != ""){
        postfixList.push(Number(num));
        num = "";
    }
    while(opStack.length>0){
        postfixList.push(opStack.pop());
    }
 
    let operands = [];

    postfixList.forEach(element => {
        if(element in prec){
            let result;
            let operand1 = operands.pop();
            let operand2 = operands.pop();
            switch(element){
                case "+" :
                  result = operand1 + operand2;
                break;
                case "*" :
                    result = operand1 * operand2;
                break;
                case "-" :
                    result = operand2 - operand1;
                break;
                case "/" :
                    if(operand1 == 0){
                        throw("TypeError: Division by zero.") 
                    }
                    result = operand2 / operand1;  
                break;
            }
            operands.push(result);   
        } else {
            operands.push(Number(element));
        }
    });
    return operands.pop();



}



module.exports = {
    expressionCalculator
}