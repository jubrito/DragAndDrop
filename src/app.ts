// DECORATORS execute when the cass is defined, not when it is initiated
function Logger(constructor: Function) {
    console.log('Loggin...');
    console.log(constructor);
}

// DECORATORS FACTORIES returns a decorator function and allows us to configure it when we assign it as a decorator to something
function LoggerFactory(logString: string) {
    // customizes decorator values
    return function(constructor: Function) {
        console.log('Loggin with factory...');
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        console.log('Loggin with template...');
        const hookElement = document.getElementById(hookId)
        const person = new constructor();
        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector('h1')!.textContent = person.name;
        }
    }}


@Logger
@LoggerFactory('LOGGIN USING A DECORATOR FACTORY WHICH ALLOWS CUSTOM VARIABLE VALUES')
@WithTemplate('<h1>Using a template factory to render HTML on the screen</h1>', 'app')
class Person {
    name = 'Ju';
    constructor() {
        console.log('Creating person object...')
    }
}

const person = new Person();
console.log(person);

function LogDecoratorForProperties(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
function LogDecoratorForAccessors(target: any, accessorName: string, propertyDescriptor: PropertyDescriptor){
    // The target is the prototype if we are dealing with an instance accessor 
    // The target is the constructor if we are dealing with a static accessor
    console.log('Accessor decorator');
    console.log(target);
    console.log(accessorName);
    console.log(propertyDescriptor);
}

function LogDecoratorForMethods(target: any, methodName: string | Symbol, methodDescriptor: PropertyDescriptor){
    // If is an instance method the target is the prototype of the object
    // If is a static method the target is the constructor
    console.log('Method decorator');
    console.log(target);
    console.log(methodName);
    console.log(methodDescriptor);
}

function LogDecoratorForParameters(target: any, methodName: string | Symbol, positionOfTheArgument: number) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(methodName);
    console.log(positionOfTheArgument);
}

class Product {
    @LogDecoratorForProperties
    title: string;
    private _price: number
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @LogDecoratorForAccessors
    set price (val: number){ // price is the Accessor
        if (val > 0){
            this.price = val;
        } else {
            throw new Error ('Invalid price: should be positive')
        }
    }

    @LogDecoratorForMethods
    getPriceWithTax(@LogDecoratorForParameters tax: number) {
        return this._price * (1+tax);
    }
}