{/*
    About Template Method:
        -Part of Generalization (code refactoring method), i.e.
            ...transform specific purpose code into general purpose code
            ...and in doing so, simplifies code & removes duplicate code

        -When to apply it?:
            -Object perform similar steps in the same order

        -What is done in implementing it?
            -Implement the similar code in a template method
            -Allow subclasses to override the behaviour that varies

    Original code:
*/

class Hamburger {
    #customerWantsCondiments:boolean = true;

    constructor (wantsCondiments:boolean) {
        this.#customerWantsCondiments = wantsCondiments
    }

    makeSandwich ():void {
        this.cutBun();
        this.addMeat();
        this.addVegetables();
        if (this.#customerWantsCondiments) this.addCondiments();
        this.wrapSandwich();
    }
    
    cutBun = () => {};
    addMeat = () => {};
    addVegetables = () => {};
    addCondiments = () => {};
    wrapSandwich = () => {};
}
class VeggieSub {
    #customerWantsCondiments:boolean = true;

    constructor (wantsCondiments:boolean) {
        this.#customerWantsCondiments = wantsCondiments
    }

    makeSandwich ():void {
        this.cutBun();
        this.addVegetables();
        if (this.#customerWantsCondiments) this.addCondiments();
        this.wrapSandwich();
    }
    
    cutBun = () => {};
    addVegetables = () => {};
    addCondiments = () => {};
    wrapSandwich = () => {};
}
/*
    With the difference between the two classes being only whether meat is added, implementing the
    Template Method is very appropriate
*/}{
/*
    Implement the similar code inside the Template method

    Refactored code:
*/
abstract class Sandwich {
    readonly makeSandwich = ():void => {

        console.log("\n------NEW ORDER------\n")

        this.cutBun();

        if (this.customerWantsMeat()) {
            this.addMeat();
        }

        this.addVegetables();

        if (this.customerWantsCondiments()) {
            this.addCondiments();
        }

        this.wrapSandwich();
    }

    //Abstract methods MUST be overwridden. Non-abstract methods are optional
    abstract addMeat():void;
    abstract addCondiments():void;

    cutBun():void {
        console.log("The bun was cut");
    }

    addVegetables():void {
        console.log("Lettuce, Onions & Tomatoes");
    }

    wrapSandwich():void {
        console.log("The sandwich was wrapped");
    }

    customerWantsMeat = ():boolean => true;
    customerWantsCondiments = ():boolean => true;
}

class Hamburger extends Sandwich {
    addMeat(): void {
        console.log("Hamburger added");
    }

    addCondiments(): void {
        console.log("Special sauce added");
    }
}

class VeggieSub extends Sandwich {
    customerWantsMeat = ():boolean => false;
    addMeat(): void {}

    addCondiments(): void {
        console.log("Vinegar and oil added");
    }
}

const customer1:Sandwich = new Hamburger();
const customer2:Sandwich = new VeggieSub();

customer1.makeSandwich();   /*

------NEW ORDER------

The bun was cut
Hamburger added
Lettuce, Onions & Tomatoes
Special sauce added
The sandwich was wrapped    */

customer2.makeSandwich();   /*

------NEW ORDER------

The bun was cut
Lettuce, Onions & Tomatoes
Vinegar and oil added
The sandwich was wrapped    */
/**/}