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

interface Lengthy {
    length: number;
}

function countAndDescribeElements<T extends Lengthy>(element: T): [T, string]{
    let descriptionText = 'Got no value since length is zero';
    if (element.length === 1 ) {
      descriptionText = 'Got 1 element'  
    } else if (element.length > 0) {
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}
console.log(countAndDescribeElements('Hi'))
console.log(countAndDescribeElements(['Juju', 'Brito']))
console.log(countAndDescribeElements([]))

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return `Key: "${String(key)}" of object ${JSON.stringify(obj)} is ${obj[key]}`
}

// extractAndConvert({}, 'name');
console.log(extractAndConvert({name: 'Ju'}, 'name'))

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem (item: T) {
        this.data.push(item)
    }

    removeItem (item: T) {
        if (this.data.indexOf(item)) {
            this.data.splice(this.data.indexOf(item), 1)
        }
    }

    getItems() {
        return [...this.data]; // copy of data with spread
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Ju');
textStorage.addItem('Bel');
textStorage.addItem('Gabi');
textStorage.removeItem('Gabi');
console.log(textStorage.getItems())

const numberAndTextStorage = new DataStorage<number | string>();
numberAndTextStorage.addItem(101)
numberAndTextStorage.addItem('Favorite Number')
numberAndTextStorage.addItem(1001)
numberAndTextStorage.removeItem(1001);
console.log(numberAndTextStorage.getItems())

// Not allowed anymore after extending primitive values:
// const objStorage = new DataStorage<object>();
// const gabiObj = {name: 'Gabi'};
// objStorage.addItem({name: 'Bat Rep'})
// objStorage.addItem(gabiObj)
// objStorage.removeItem(gabiObj) // since objects and references we need to pass the exact one instead of 'creating a new one' by passing {name: 'Gabi'} when calling add and remove
// console.log(objStorage.getItems())