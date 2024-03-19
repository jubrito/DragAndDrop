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
function extractAndConvert(obj, key) {
    return `Key: "${String(key)}" of object ${JSON.stringify(obj)} is ${obj[key]}`;
}
console.log(extractAndConvert({ name: 'Ju' }, 'name'));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item)) {
            this.data.splice(this.data.indexOf(item), 1);
        }
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Ju');
textStorage.addItem('Bel');
textStorage.addItem('Gabi');
textStorage.removeItem('Gabi');
console.log(textStorage.getItems());
const numberAndTextStorage = new DataStorage();
numberAndTextStorage.addItem(101);
numberAndTextStorage.addItem('Favorite Number');
numberAndTextStorage.addItem(1001);
numberAndTextStorage.removeItem(1001);
console.log(numberAndTextStorage.getItems());
//# sourceMappingURL=app.js.map