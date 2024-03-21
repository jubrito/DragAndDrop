"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(constructor) {
    console.log('Loggin...');
    console.log(constructor);
}
function LoggerFactory(logString) {
    return function (constructor) {
        console.log('Loggin with factory...');
        console.log(logString);
        console.log(constructor);
    };
}
function DecoratorFactoryWithFunctionThatOnlyRunsWhenInstanciatingAnObject(template, hookId) {
    console.log('Template factory');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Ju';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger,
    LoggerFactory('LOGGIN USING A DECORATOR FACTORY WHICH ALLOWS CUSTOM VARIABLE VALUES'),
    DecoratorFactoryWithFunctionThatOnlyRunsWhenInstanciatingAnObject('<h1>Using a template factory to render HTML on the screen</h1>', 'app')
], Person);
const person = new Person();
console.log(person);
function LogDecoratorForProperties(target, propertyName) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
function LogDecoratorForAccessors(target, accessorName, propertyDescriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(accessorName);
    console.log(propertyDescriptor);
}
function LogDecoratorForMethods(target, methodName, methodDescriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(methodName);
    console.log(methodDescriptor);
}
function LogDecoratorForParameters(target, methodName, positionOfTheArgument) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(methodName);
    console.log(positionOfTheArgument);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price: should be positive');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    LogDecoratorForProperties
], Product.prototype, "title", void 0);
__decorate([
    LogDecoratorForAccessors
], Product.prototype, "price", null);
__decorate([
    LogDecoratorForMethods,
    __param(0, LogDecoratorForParameters)
], Product.prototype, "getPriceWithTax", null);
const product1 = new Product('Book', 11);
const product2 = new Product('Magazine', 1);
function DecoratorToAutoBind(_target, _methodName, descriptorWithValueThatHoldsTheOriginalFunction) {
    const originalMethod = descriptorWithValueThatHoldsTheOriginalFunction.value;
    const newDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return newDescriptor;
}
class PrinterWithoutAutomaticBinder {
    constructor() {
        this.bindExample = 'Binds makes the "this" refers to the p object and not to the event listener function!';
    }
    showMessageWhenBinding() {
        console.log(this.bindExample);
    }
}
__decorate([
    DecoratorToAutoBind
], PrinterWithoutAutomaticBinder.prototype, "showMessageWhenBinding", null);
const printer = new PrinterWithoutAutomaticBinder();
const button = document.querySelector('button');
button.addEventListener('click', printer.showMessageWhenBinding);
const registeredValidators = {};
function DecoratorForRequired(target, propertyName) {
    registeredValidators[target.constructor.name] = {
        [propertyName]: ['required']
    };
}
function DecoratorForPositiveNumbers(target, propertyName) {
    registeredValidators[target.constructor.name] = {
        [propertyName]: ['positive']
    };
}
function validate(object) {
    const objectValidatorConfig = registeredValidators[object.constructor.name];
    if (!objectValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const property in objectValidatorConfig) {
        for (const validator of objectValidatorConfig[property]) {
            switch (validator) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    DecoratorForRequired
], Course.prototype, "title", void 0);
__decorate([
    DecoratorForPositiveNumbers
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title');
    const priceElement = document.getElementById('price');
    const title = titleElement.value;
    const price = +priceElement.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map