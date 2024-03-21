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
function WithTemplate(template, hookId) {
    return function (constructor) {
        console.log('Loggin with template...');
        const hookElement = document.getElementById(hookId);
        const person = new constructor();
        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector('h1').textContent = person.name;
        }
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
    WithTemplate('<h1>Using a template factory to render HTML on the screen</h1>', 'app')
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
//# sourceMappingURL=app.js.map