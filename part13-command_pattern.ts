{
/*
    Basics of Command Pattern e.g. for BillPayers differentiated by sex and age:
    -Interface to represent the different type of BillPayers and the methods used by them
        -e.g. method to calculate bill
    -Command interface to represent the method that will change based off the different  BillPayers
        -In a command interface it is common to have an "execute"* method
    -Object based on first interface (BillPayer) is passed onto the second's constructor and stored
    -An invoker e.g. CashRegister stores the object implementing Command interface and call the
        execute method and return a value after calculation
        -The invoker can accept numerous types if needed
    -TypePicker returns the correct object based on the method called

*//*
    A common way of coding (without command pattern) that could be refactored:
*/
class Customer {
    #age: number;
    #man: boolean;
    #bill: number;

    getAge(): number { return this.#age; }
    setAge(age: number): void {
        this.#age = age;
    }
    getMan(): boolean { return this.#man; }
    setMan(man: boolean): void {
        this.#man = man;
    }
    getBill(): number { return this.#bill; }
    setBill(bill: number): void {
        this.#bill = bill;
    }

    constructor(age: number, man: boolean, bill: number) {
        this.#age = age;
        this.#man = man;
        this.#bill = bill;
    }

    returnFinalBill(): void {
        let percentageOff = 0.0;

        if(this.#age > 60) { percentageOff += .05; }
        if(!this.#man) { percentageOff += .05; }

        console.log(`Bill Amount: $${this.#bill - this.#bill * percentageOff}`)
    }
}

let billSmith: Customer = new Customer(62, true, 12);
billSmith.returnFinalBill();/*
Bill amount: $11.4
*/
/*
    The drawback of using this method is that the customer logic has to be changed to return bill
    method on all types when certain changes are made e.g.
        new Customer types added, adding new discounts, etc.
*/
}{/*
    After implementing the Command Pattern:
*/
interface BillPayer {
    caluculateBill: (amountDue: number) => void;
}
interface Command {
    executeCalculation: (amountDue: number) => void;
}

class WomanOver60 implements BillPayer {
    caluculateBill (amountDue: number):void {
        console.log(`Bill Amount for Woman Over 60: $${amountDue - amountDue * .10}`);
    };
}
class ManOver60 implements BillPayer {
    caluculateBill (amountDue: number):void {
        console.log(`Bill Amount for Man Over 60: $${amountDue - amountDue * .05}`);
    };
}
class ManUnder60 implements BillPayer {
    caluculateBill (amountDue: number):void {
        console.log(`Bill Amount for Man Under 60: $${amountDue}`);
    };
}

class Waiter implements Command {
    thePayer: BillPayer;

    constructor(thePayer: BillPayer) {
        this.thePayer = thePayer;
    }

    executeCalculation (amountDue: number) {
        this.thePayer.caluculateBill(amountDue);
    };
}

class CashRegister {
    theCommand: Command;

    constructor(theCommand: Command) {
        this.theCommand = theCommand;
    }

    returnFinalBill(amountDue: number) {
        this.theCommand.executeCalculation(amountDue);
    }
}

class CustomerTypePicker {
    getWomanOver60 = (): BillPayer => new WomanOver60();
    getManOver60 = (): BillPayer => new ManOver60();
    getManUnder60 = (): BillPayer => new ManUnder60();
}

const customerTypePicker: CustomerTypePicker = new CustomerTypePicker();
const sallyMay: BillPayer = customerTypePicker.getWomanOver60();
let theWaiter: Waiter = new Waiter(sallyMay);
let calculateBill: CashRegister = new CashRegister(theWaiter);

calculateBill.returnFinalBill(12.00);/*
Bill Amount for Woman Over 60: $10.8 */

const paulThumb: BillPayer = customerTypePicker.getManOver60();
theWaiter = new Waiter(paulThumb);
calculateBill = new CashRegister(theWaiter);

calculateBill.returnFinalBill(12.00);/*
Bill Amount for Man Over 60: $11.4 */

/*
    Now, to add a functionality which groups BillPayers into an Array
    ...so that BillPayers can be used as simple commands

    (very easy to do)
*/

class CustomerGroup {
    customers: BillPayer[];

    constructor() {
        this.customers = [];
    }

    add(newPayer: BillPayer): void {
        this.customers.push(newPayer);
    }

    get = (customerIndex: number): BillPayer => this.customers[customerIndex];
}

const customerGroup: CustomerGroup = new CustomerGroup();

customerGroup.add(customerTypePicker.getManUnder60());

customerGroup.get(0).caluculateBill(12);/*
Bill Amount for Man Under 60: $12.0 */

}