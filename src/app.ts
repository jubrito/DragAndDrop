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

const e1: ElevatedEmployee = {
    name: "Juliana",
    priviledges: ['create server'],
    startDate: new Date()
}

interface Admin2 {
    name: string;
    privledges: string[];
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