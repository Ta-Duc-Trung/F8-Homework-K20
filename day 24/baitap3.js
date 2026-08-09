class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    getMonthlySalary() {
        return this.baseSalary;
    }
    describe() {
        return `${this.name} - Lương: ${this.getMonthlySalary()}đ`;
    }
}
class Manager extends Employee {
    constructor(name, baseSalary, teamSize) {
        super(name, baseSalary);
        this.teamSize = teamSize;
    }
    getMonthlySalary() {
        const baseSalary = super.getMonthlySalary();
        const allowance = this.teamSize * 500000;
        return baseSalary + allowance;
    }

    describe() {
        const originalDescription = super.describe();
        return `[Quản lý] ${originalDescription} (đội ${this.teamSize} người)`;
    }
}
// Test cases
const emp = new Employee("An", 10000000);
console.log(emp.getMonthlySalary());
console.log(emp.describe());
const manager = new Manager("Bình", 15000000, 5);
console.log(manager.getMonthlySalary());
console.log(manager.describe());
console.log(manager instanceof Employee);
console.log(manager instanceof Manager);
console.log(emp instanceof Manager);
