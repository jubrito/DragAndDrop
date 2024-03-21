// DECORATORS execute when the cass is defined, not when it is initiated
function Logger(constructor: Function) {
    console.log('Loggin...');
    console.log(constructor);
}

@Logger
class Person {
    name = 'Ju';

    constructor() {
        console.log('Creating person object...')
    }
}

const person = new Person();

console.log(person);