/*
    Replacing Conditionals with Strategy Pattern
    as well as other ways touse the Strategy Pattern
    ...and a bit on the guard cluse
*/{
class Employee {
    #bonus:boolean = false;
    #salary:number = 0.0;

    constructor(bonus?:boolean, salary?:number) {
        //Equivalent to overloading constructors
        this.#bonus = bonus ? bonus : this.#bonus;
        this.#salary = salary ? salary : this.#salary;
    }
    
    getSalary ():number {
        if (this.#bonus) return this.#salary + this.#salary * 0.15;
        else return this.#salary;
    }
    setSalary (salary:number):void {
        this.#salary = salary;
    }
}

let salesman = new Employee(true, 15000.00);
let secretary = new Employee(false, 20000.00);

console.log(salesman.getSalary());//17250.00
console.log(secretary.getSalary());//20000.00
/*
    However, what happens when we want to make several changes e.g. make the bonus amount customizable
*/}{
class Employee {
    #bonus:boolean = false;
    #salary:number = 0.0;

    #bonusAmount:number = 0.15;

    constructor(bonus?:boolean, salary?:number, bonusAmount?:number) {
        //Equivalent to overloading constructors
        this.#bonus = bonus ? bonus : this.#bonus;
        this.#salary = salary ? salary : this.#salary;
        this.#bonusAmount = bonusAmount ? bonusAmount : this.#bonusAmount;
    }
    
    getSalary ():number {
        if (this.#bonus) return this.#salary + this.#salary * this.#bonusAmount;
        else return this.#salary;
    }
    setSalary (salary:number):void {
        this.#salary = salary;
    }
}
/*
    We have to make changes to the Employee class
    However with the Strategy Pattern we are able to just create a new class
    and not have to make any changes to the Employee class

    -------------------------------------------------
    Replace Conditional With Strategy

    Conditionals: used to determine which algorithms to use
    Strategy Pattern: used to dynamically change those algorithms that are used by objects AT RUNTIME
*/}{
class Employee {
    #salary:number = 0.0;
    payType:Pay = new NoBonus();

    constructor (salary:number, payType?:Pay) {
        this.#salary = salary;
        this.payType = payType ? payType : this.payType;
    }

    setBonusOption (newPayType:Pay) {
        this.payType = newPayType;
    }

    getPay = ():number => this.payType.getPay(this.#salary);
}

interface Pay {
    getPay(salary:number);
}
class NoBonus implements Pay {
    getPay(salary:number):number {
        return salary;
    }
}
class GetsBonus implements Pay {
    getPay(salary:number):number {
        return salary + salary * 0.15;
    }
}
class Bonus20Per implements Pay {
    getPay(salary:number):number {
        return salary + salary * 0.20;
    }
}

class Salesman extends Employee {
    constructor (salary:number, payType?:Pay) {
        super(salary);
        if (payType) this.setBonusOption(payType);
    }
}

class Secretary extends Employee {
    constructor (salary:number, payType?:Pay) {
        super(salary);
        if (payType) this.setBonusOption(payType);
    }
}

let salesman:Employee = new Salesman(15000.00);
let secretary:Employee = new Secretary(25000.00);

console.log(salesman.getPay());//15000.00
console.log(secretary.getPay());//25000.00

salesman.setBonusOption(new GetsBonus());
secretary.setBonusOption(new GetsBonus());

let salesTrainee:Employee = new Salesman(15000.00, new NoBonus());

console.log(salesman.getPay());//17250.00
console.log(secretary.getPay());//28750.00
console.log(salesTrainee.getPay());//15000.00
/*
    It now becomes easy to implement changes, that is, by introducing new classes,
    not having to change other parts of the program

    ------------------------------------------------
    About: Guard Clause
        - to show the noamal path of execution and make it very clear
            -by eliminating the normal ins and outs whenever we use if-then-else statements. 
*/}{
const bagUnder50lbs = function(bagNumber:number):number {
    return (bagNumber < 1) ? 25 : 35;
}
const bag50to70lbs = function(bagNumber:number):number {
    return (bagNumber < 2) ? 100 : 150;
}

const getBagPrice = function (weight:number[], theBag:number):number {
    if (bagWeight[theBag] < 50) return bagUnder50lbs(theBag); //most likely
    if (bagWeight[theBag] < 70 && bagWeight[theBag] >= 50) {
        return bag50to70lbs(theBag);
    }
    return 200; //least likely
}

const bagWeight:number[] = [25, 55, 75];
let numberOfBags:number = bagWeight.length;
let bagFees:number = 0;

for (let theBag:number = 0; theBag < numberOfBags; theBag++)
    bagFees += getBagPrice(bagWeight, theBag);

console.log(`Bag fees: $${bagFees}`);
/**/}