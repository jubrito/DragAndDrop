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
function countAndDescribeElements(element) {
    let descriptionText = 'Got no value since length is zero';
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    }
    else if (element.length > 0) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}
console.log(countAndDescribeElements('Hi'));
console.log(countAndDescribeElements(['Juju', 'Brito']));
console.log(countAndDescribeElements([]));
//# sourceMappingURL=app.js.map