// Intersection types -------------
type Admin = {
    name: string;
    priviledges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;
type UnknownEmployee = Employee | Admin;

const e1: ElevatedEmployee = {
    name: "Juliana",
    priviledges: ['create server'],
    startDate: new Date()
}

interface Admin2 {
    name: string;
    priviledges: string[];
}

interface Employee2 {
    name: string;
    startDate: Date;
}

type ElevatedEmployee2V1 = Admin2 & Employee2;
interface ElevatedEmployee2V2 extends Admin2, Employee2 {}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function adds(a: Combinable, b: Combinable) {
    // Type guards
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a+b;
}

function printEmployeeInfo(emp: UnknownEmployee){
    console.log('Name: ' + emp.name);
    if ('priviledges' in emp){
        console.log('Priviledges: ' + emp.priviledges);
    }
    if ('startDate' in emp){
        console.log('Start date: ' + emp.startDate);
    }
}
printEmployeeInfo(e1);

class Car {
    drive() {
        console.log('Driving a car...')
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...')
    }
    loadCargo(amount: number){
        console.log('Loading cargo... '+amount)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck()

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1001);
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(101);
    }
}
useVehicle(v2)