"use strict";
function adds(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = adds(1, 1);
//# sourceMappingURL=app.js.map