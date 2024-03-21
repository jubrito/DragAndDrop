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
    }
}

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