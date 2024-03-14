"use strict";
function functionScope() {
    let letVariableOnlyExistsInsideFunction = true;
    var varVariableOnlyExistsInsideFunction = true;
    console.log(letVariableOnlyExistsInsideFunction, varVariableOnlyExistsInsideFunction);
}
let test = true;
if (test) {
    var varVariableIsAlwaysGlobal = true;
    let letVariableOnlyExistsInsideIfScope = true;
    console.log(varVariableIsAlwaysGlobal, letVariableOnlyExistsInsideIfScope);
}
//# sourceMappingURL=variables.js.map