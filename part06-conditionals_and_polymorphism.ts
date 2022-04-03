/*
    Simplifying Conditionals & Replacing Them With Polymorphism

    Original Code
*/{
const bagWeight:number[] = [25, 55, 75];
let numberOfBags:number = bagWeight.length;
let bagFees:number = 0;

for (let i = 0; i < numberOfBags; i++) {
    if (i <= 1) {
        if (bagWeight[i] < 50) {
            if (i == 0) {bagFees += 25;} else {bagFees += 35;}
        } else if (bagWeight[i] < 70) {
            bagFees += 100;
        }
    } else if (i > 1 && bagWeight[i] < 70) {
        bagFees += 150;
    } else {
        bagFees += 200;
    }
}

console.log(`Bag fees: $${bagFees}`);

/*
    What the conditionals in the code mean:
        bag weigh < 50 lbs and there is 1 bag charge $25
        bag weigh < 50 lbs and htere is 2 bag charge $35
        bag weigh >= 70 lbs charge $200
        bag weigh between 50 to 70 lbs charge $100 if first bag and $150 for each additional bag

    Convert that into methods:
*/}{
const bagOver70lbs = function():number {
    return 200;
}
const bagUnder50lbs = function(bagNumber:number):number {
    return (bagNumber < 1) ? 25 : 35;
}
const bag50to70lbs = function(bagNumber:number):number {
    return (bagNumber < 2) ? 100 : 150;
}

const bagWeight:number[] = [25, 55, 75];
let numberOfBags:number = bagWeight.length;
let bagFees:number = 0;

for (let theBag:number = 0; theBag < numberOfBags; theBag++) {
    if (bagWeight[theBag] < 50) {
        bagFees += bagUnder50lbs(theBag);
    } else if (bagWeight[theBag] < 70) {
        bagFees += bag50to70lbs(theBag);
    } else {
        bagFees += 200; //bagOver70lbs() here, but method not really needed
    }
}

console.log(`Bag fees: $${bagFees}`);

/*
    The code is now readable.
    -------------------------------

    Note, however: For proper coding, if & else statements should not be used if things
    are NOT just as likely to occur. Instead, something called a "guard clause"
    should be used.

    Guard Clause: just the if statement, without the "else"s
*/}{
const bagUnder50lbs = function(bagNumber:number):number {
    return (bagNumber < 1) ? 25 : 35;
}
const bag50to70lbs = function(bagNumber:number):number {
    return (bagNumber < 2) ? 100 : 150;
}

const bagWeight:number[] = [25, 55, 75];
let numberOfBags:number = bagWeight.length;
let bagFees:number = 0;

for (let theBag:number = 0; theBag < numberOfBags; theBag++) {
    if (bagWeight[theBag] < 50) { bagFees += bagUnder50lbs(theBag); }
    if (bagWeight[theBag] < 70 && bagWeight[theBag] >= 50) {
        bagFees += bag50to70lbs(theBag);
    }
    if (bagWeight[theBag] > 70) { bagFees += 200; }
}

console.log(`Bag fees: $${bagFees}`);
/*
    Code becomes more readable, and at the same time implies that:
        bagUnder50lbs is most likely to occur, followed by
        bag50to70lbs, then by bagOver70lbs
*/}{

/*
    NEXT: Replacing conditionals with polymorphic techniques?

    Why?
        Conditional statements often choose different behaviour depending depending on
        the type of object that they are working with.

    In other words, when we know we're going to be performing different things depending on
    different objects, Polymorphism should be a part in coding.
*/

const makeSound = function(animal:string):void {
    switch (animal) {
        case "Dog":
            console.log("Woof!");
            break;
        case "Cat":
            console.log("Meow!");
            break;
        default:
            throw Error("I don't know that animal");
    }
}

let doggy:string = "Dog";
let kitty:string = "Cat";

makeSound(doggy); //Woof!
makeSound(kitty); //Meow!

/*
    The code can be made more dynamic by creating classes
*/}{
class Animal {
    #sound:string = "";

    getSound = ():string => this.#sound;
    setSound = (sound:string):void => { this.#sound = sound; }

    constructor (sound:string) {
        this.#sound = sound;
    }
}

class Dog extends Animal {
    constructor (sound:string) {
        super(sound);
    }
}

class Cat extends Animal {
    constructor (sound:string) {
        super(sound);
    }
}

let rex:Animal = new Dog("Woof!!!!");
let sophie:Animal = new Cat("Meow!!!!");
/**/}