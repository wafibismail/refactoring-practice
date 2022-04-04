{/*
    An exercise/problem:
        - A company needs a program that calculates bonuses for each of its employees
        - Calculate quarterly and year-end bonuses
        - Each employee receives a bonus based off of different criteria
        - Use the visitor pattern
        - Employee classes can only be added to, and nothing can be changed.
*/
interface Visitor {
    visit(trainee: SalesTrainee): number;
    visit(salesman: Salesman): number;
    visit(boss: Boss): number;
}
class YearlyBonusVisitor implements Visitor {
    visit(trainee: SalesTrainee): number
    visit(salesman: Salesman): number
    visit(boss: Boss): number
    visit(visitable: Visitable): number
    /*In TypeScript, overloaded methods' implementations need to be compatible
      with each other, explaining the need for the conditionals here*/
    {
        let yearlyBonusPercentage: number;
        let yearlyBonusAmount: number;

        if(typeof visitable === typeof SalesTrainee) {
            const trainee: SalesTrainee = <SalesTrainee> visitable;

            console.log("Trainees Yearly Bonus");
            
            yearlyBonusPercentage = (trainee.getSickDays() < 10 && trainee.getFailedTests() < 2) ? .10 : .02
            yearlyBonusAmount = trainee.getSalary() * yearlyBonusPercentage;

            return yearlyBonusAmount;
        }

        if(typeof visitable === typeof Salesman) {
            const salesman: Salesman = <Salesman> visitable;

            console.log("Salesmans Yearly Bonus");
            
            yearlyBonusPercentage = (salesman.getTotalSalesAmount() > 100000 && salesman.getNewCustomers() > 50) ? .12 : .04
            yearlyBonusAmount = salesman.getTotalSalesAmount() * yearlyBonusPercentage;

            return yearlyBonusAmount;
        }

        if(typeof visitable === typeof Boss) {
            const boss: Boss = <Boss> visitable;

            console.log("Boss Yearly Bonus");
            
            yearlyBonusPercentage = (boss.getOfficeExpenses() > 50000 && boss.getNewCustomers() > 1000) ? .15 : .04
            yearlyBonusAmount = boss.getTotalSalesAmount() * yearlyBonusPercentage;

            return yearlyBonusAmount;
        }
        
    }
}

interface Visitable {
    accept: (visitor: Visitor) => number;
}
class SalesTrainee implements Visitable {
    #sickDays: number;
    #failedTests: number;
    #salary: number;

    getSickDays = (): number => this.#sickDays;
    getFailedTests = (): number => this.#failedTests;
    getSalary = (): number => this.#salary;

    setSickDays(sickDays: number): void {
        this.#sickDays = sickDays;
    }
    setFailedTests(failedTests: number): void {
        this.#failedTests = failedTests;
    }
    setSalary(salary: number): void {
        this.#salary = salary;
    }

    constructor(sickDays: number, failedTests: number, salary: number) {
        this.#sickDays = sickDays;
        this.#failedTests = failedTests;
        this.#salary = salary;
    }

    accept(visitor: Visitor) {
        return visitor.visit(this);
    }
}

class Salesman implements Visitable {
    #totalSalesAmount: number;
    #newCustomers: number;

    getTotalSalesAmount = (): number => this.#totalSalesAmount;
    getNewCustomers = (): number => this.#newCustomers;
    
    setTotalSalesAmount(totalSalesAmount: number) {
        this.#totalSalesAmount = totalSalesAmount;
    }
    setNewCustomers(newCustomers: number) {
        this.#newCustomers = newCustomers;
    }

    constructor(totalSalesAmount: number, newCustomers: number) {
        this.#totalSalesAmount = totalSalesAmount;
        this.#newCustomers = newCustomers;
    }

    accept(visitor: Visitor) {
        return visitor.visit(this);
    }
}

class Boss implements Visitable {
    #totalSalesAmount: number;
    #newCustomers: number;
    #officeExpenses: number;

    getTotalSalesAmount = (): number => this.#totalSalesAmount;
    getNewCustomers = (): number => this.#newCustomers;
    getOfficeExpenses = (): number => this.#officeExpenses;
    
    setTotalSalesAmount(totalSalesAmount: number) {
        this.#totalSalesAmount = totalSalesAmount;
    }
    setNewCustomers(newCustomers: number) {
        this.#newCustomers = newCustomers;
    }
    setOfficeExpenses(officeExpenses: number) {
        this.#officeExpenses = officeExpenses;
    }

    constructor(totalSalesAmount: number, newCustomers: number, officeExpenses: number) {
        this.#totalSalesAmount = totalSalesAmount;
        this.#newCustomers = newCustomers;
        this.#officeExpenses = officeExpenses;
    }

    accept(visitor: Visitor) {
        return visitor.visit(this);
    }
}

const yearlyBonusCalculator: YearlyBonusVisitor = new YearlyBonusVisitor;

const bradTrainee: SalesTrainee = new SalesTrainee(5, 1, 20000);
const tomSalesman: Salesman = new Salesman(150000, 62);
const rossBoss: Boss = new Boss(1000000, 1200, 40000);

console.log("YEARLY BONUS");
console.log(bradTrainee.accept(yearlyBonusCalculator));
console.log(tomSalesman.accept(yearlyBonusCalculator));
console.log(rossBoss.accept(yearlyBonusCalculator));/*
YEARLY BONUS
Trainees Yearly Bonus
2000.0
Salesmans Yearly Bonus
18000.0
Boss yearly Bonus
150000.0

    With the visitor pattern, it also becomes easier to add new calculation methods
    i.e. visitor e.g. quarterlyBonusCalculator of type QuarterlyBonusVisitor.
*/}