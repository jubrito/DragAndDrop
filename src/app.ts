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

function DecoratorFactoryWithFunctionThatOnlyRunsWhenInstanciatingAnObject(template: string, hookId: string) {
    console.log('Template factory');
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        // outside the 'class extends' we don't need to initiate the object for the decorator to run since it happens when the function is defined
        return class extends originalConstructor {
            // new constructor to add new functionality to class original constructor () {}
            // Logic that will only be added after instantiating:
            constructor(..._: any[]) {
                super();
                const hookElement = document.getElementById(hookId)
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}


@Logger
@LoggerFactory('LOGGIN USING A DECORATOR FACTORY WHICH ALLOWS CUSTOM VARIABLE VALUES')
@DecoratorFactoryWithFunctionThatOnlyRunsWhenInstanciatingAnObject('<h1>Using a template factory to render HTML on the screen</h1>', 'app')
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

const product1 = new Product('Book', 11);
const product2 = new Product ('Magazine', 1);

// set the 'this' keyword to the object this method belongs to
function DecoratorToAutoBind(_target: any, _methodName: string | Symbol, descriptorWithValueThatHoldsTheOriginalFunction: PropertyDescriptor){
    // the value property on the descriptor points to the method function
    const originalMethod = descriptorWithValueThatHoldsTheOriginalFunction.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false, // doesn't show up in 'for in' loops
        get() { // extra logic that runs before the value is returned
            const boundFunction = originalMethod.bind(this);
            // 'this' here refers to whatever is responsible for triggering getter method 
            // the getted method will be triggered by the concrete object to which it belongs
            // 'this' here = object on which we define the getter
            return boundFunction;
        }
    }
    return newDescriptor; // overwrites the old descriptor
}

class PrinterWithoutAutomaticBinder {
    bindExample = 'Binds makes the "this" refers to the p object and not to the event listener function!'

    @DecoratorToAutoBind
    showMessageWhenBinding() {
        console.log(this.bindExample);
    }
}

const printer = new PrinterWithoutAutomaticBinder();
const button = document.querySelector('button')!;
// Without a Decorator to bind, we must force it when calling the function:
// button.addEventListener('click', printer.showMessageWhenBinding.bind(printer));
button.addEventListener('click', printer.showMessageWhenBinding);



// DECORATORS FOR VALIDATION -------------------------------------
interface ValidatorConfig {
    [className: string]: {
        [validatableClassProperty: string]: string [] // ['required', etc]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}
 
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(object: any) {
    const objectValidatorConfig = registeredValidators[object.constructor.name]
    if (!objectValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const property in objectValidatorConfig) {
        for (const validator of objectValidatorConfig[property]) {
            switch(validator) {
                case 'required':
                    isValid = isValid && !!object[property];
                    break;
                case 'positive':
                    isValid = isValid && object[property] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}
const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;

    const title = titleElement.value;
    const price = +priceElement.value;

    const createdCourse = new Course (title, price);
    if (!validate(createdCourse)){
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
})

