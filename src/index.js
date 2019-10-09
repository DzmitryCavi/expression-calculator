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
    let tokenList = expr.replace(regex,"").split("");
   // console.log(tokenList);
    let numbers = "0123456789";
    let num="";
    let ArNumbers = numbers.split("");
    let balance = 0;
    tokenList.forEach(element => {
        if(element == ")"){
            balance -= 1; 
        } else if(element == "("){
            balance += 1;
        } 
    });
    if(balance != 0){ console.log(balance,"asdasd");
        throw "ExpressionError: Brackets must be paired";
    }
    
 

    tokenList.forEach(token => {
         if(ArNumbers.indexOf(token) != -1){ 
            num += token; 
         } else if(token == '('){
            opStack.push(token);
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
         } else if(token == ')'){
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
            let topToken = opStack.pop();
            while(topToken != "("){
                postfixList.push(topToken);
                topToken = opStack.pop();
            }
            
        } else {
            if(num != "") {
                postfixList.push(Number(num));
                num = "";
            }
            while(opStack.length != 0 && prec[opStack[opStack.length-1]] >= prec[token]) {
                postfixList.push(opStack.pop());
            }  
            opStack.push(token);
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

    postfixList.forEach(token => {
        if(token in prec){
            let result;
            let operand1 = operands.pop();
            let operand2 = operands.pop();
            switch(token){
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
            operands.push(Number(token));
        }
    });
    return operands.pop();



}



module.exports = {
    expressionCalculator
}