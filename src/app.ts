type AddFn = (a: number, b: number) => number;
interface AddFnAsInterface {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2
}

interface Named {
    readonly name: string;
    outputName?: string;
}

// describes the structure of an object
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string, public age?: number) {
        if (age) {
            this.age = age;
        }
    }

    greet(phrase: string) {
        console.log(phrase+ ' ' + this.name)
        if (this.age) {
            console.log("My age is "+this.age)
        }
    }
}

let user1: Greetable;
user1 = new Person("Juliana", 26);
user1.greet('Hi, my name is')
console.log(user1);