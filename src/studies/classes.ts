// Abstract classes can't be instanciated
abstract class Department {
    static fiscalYear = 2024;
    protected employees: string[] = [];
    constructor(protected readonly id: string, public name: string) {}

    // Abstract must not be implemented
    abstract describe(this: Department): void;

    static createEmployee(name: string) {
        return { name: name }
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInfo () {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }
    describe (){
        console.log("IT Department ID: "+ this.id);
    }
}

// Singleton = only 1 instance allowed
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;
    // A private constructor ensures we can't call a newAccountingDepartment outside the class, only on static methods
    private constructor (id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0]
    }

    static getInstance() {
        if (this.instance){
            return this.instance;
        }
        this.instance = new AccountingDepartment('3', []);
        return this.instance;
    }

    get mostRecentReport(){
        if (this.lastReport){
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostRecentReport(report: string) {
        if (!report){
            throw new Error ('A new report is required');
        }
        this.addReport(report);
    }

    addEmployee(name: string){
        if (name === 'Max'){
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReport(){
        console.log(this.reports);
    }

    describe () {
        console.log('Accounting department ID: ' + this.id)
    }
}

const employee1 = Department.createEmployee('Max');
console.log(Department.fiscalYear)

const accounting = AccountingDepartment.getInstance();
console.log(accounting);
accounting.describe(); 
accounting.addEmployee('Juliana')
accounting.addEmployee('Isabel')
accounting.addEmployee('Gabriele')
accounting.printEmployeeInfo()

accounting.addReport('Report: Something went wrong.')
console.log(accounting.mostRecentReport);
accounting.printReport()

accounting.mostRecentReport = 'Report: new!';
accounting.printReport()

const itDepartment = new ITDepartment('1', ['Juliana'])
itDepartment.describe(); 
itDepartment.addEmployee('Juliana')
itDepartment.addEmployee('Isabel')
itDepartment.addEmployee('Gabriele')
itDepartment.printEmployeeInfo()