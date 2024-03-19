const names: Array<string> = ['Ju', 'Bel', 'Gabi'];
const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!')
    }, 200)
    reject('Rejected');
});

promise.then(data => {
    data.split(' ');
})

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({name: 'Ju', hobbies: ['lol']}, {age: 26})
console.log(mergedObj)