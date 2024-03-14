"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = new Person("Juliana", 26);
user1.greet('Hi, my name is');
console.log(user1);
//# sourceMappingURL=app.js.map