"use strict";
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Animal is moving at speed ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 101 });
//# sourceMappingURL=app.js.map