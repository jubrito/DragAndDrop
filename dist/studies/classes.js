"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2024;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log("IT Department ID: " + this.id);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('3', []);
        return this.instance;
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    set mostRecentReport(report) {
        if (!report) {
            throw new Error('A new report is required');
        }
        this.addReport(report);
    }
    addEmployee(name) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.reports);
    }
    describe() {
        console.log('Accounting department ID: ' + this.id);
    }
}
const employee1 = Department.createEmployee('Max');
console.log(Department.fiscalYear);
const accounting = AccountingDepartment.getInstance();
console.log(accounting);
accounting.describe();
accounting.addEmployee('Juliana');
accounting.addEmployee('Isabel');
accounting.addEmployee('Gabriele');
accounting.printEmployeeInfo();
accounting.addReport('Report: Something went wrong.');
console.log(accounting.mostRecentReport);
accounting.printReport();
accounting.mostRecentReport = 'Report: new!';
accounting.printReport();
const itDepartment = new ITDepartment('1', ['Juliana']);
itDepartment.describe();
itDepartment.addEmployee('Juliana');
itDepartment.addEmployee('Isabel');
itDepartment.addEmployee('Gabriele');
itDepartment.printEmployeeInfo();
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Human {
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
user1 = new Human("Juliana", 26);
user1.greet('Hi, my name is');
console.log(user1);
//# sourceMappingURL=classes.js.map