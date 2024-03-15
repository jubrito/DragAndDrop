"use strict";
const names = ['Ju', 'Bel', 'Gabi'];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 200);
    reject('Rejected');
});
promise.then(data => {
    data.split(' ');
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Ju', hobbies: ['lol'] }, { age: 26 });
console.log(mergedObj);
//# sourceMappingURL=app.js.map