"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        if (age) {
            this.age = age;
        }
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
        if (this.age) {
            console.log("My age is " + this.age);
        }
    }
}
let user1;
user1 = new Person("Juliana", 26);
user1.greet('Hi, my name is');
console.log(user1);
//# sourceMappingURL=app.js.map