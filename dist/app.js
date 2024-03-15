"use strict";
const e1 = {
    name: "Juliana",
    priviledges: ['create server'],
    startDate: new Date()
};
function adds(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInfo(emp) {
    console.log('Name: ' + emp.name);
    if ('priviledges' in emp) {
        console.log('Priviledges: ' + emp.priviledges);
    }
    if ('startDate' in emp) {
        console.log('Start date: ' + emp.startDate);
    }
}
printEmployeeInfo(e1);
class Car {
    drive() {
        console.log('Driving a car...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo... ' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1001);
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(101);
    }
}
useVehicle(v2);
//# sourceMappingURL=app.js.map