// LET: Introduces the Block Scope concept when compared to Var
function functionScope () {
    let letVariableOnlyExistsInsideFunction = true;
    var varVariableOnlyExistsInsideFunction = true;
    console.log(letVariableOnlyExistsInsideFunction, varVariableOnlyExistsInsideFunction)
}

let test = true;
if (test) {
    var varVariableIsAlwaysGlobal = true;
    let letVariableOnlyExistsInsideIfScope = true;
    console.log(varVariableIsAlwaysGlobal, letVariableOnlyExistsInsideIfScope);
}
// If we paste the code above on the console it would log: 
// console.log('Can access variable created with var: ' + varVariableIsAlwaysGlobal) // Prints true in the browser
// console.log('Can\'t access variable created with let' + letVariableOnlyExistsInsideIfScope) // Error because variable was not defined
