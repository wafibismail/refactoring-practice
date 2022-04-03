/*
    Factory Method - Example 1 of 2
*/
{
class Customer2 {
    #custRating:string;

    getCustRating = ():string => this.#custRating;
    setCustRating(custRating:string):void {
        this.#custRating = custRating;
    }
}

class Premier extends Customer2 {
    constructor() {
        super();
        this.setCustRating("Premier Customer");
    }
}

class Valued extends Customer2 {
    constructor() {
        super();
        this.setCustRating("Valued Customer");
    }
}

class Deadbeat extends Customer2 {
    constructor() {
        super();
        this.setCustRating("Deadbeat Customer");
    }
}

class CustomerFactory {
    getCustomer(custType:string):Customer2 {
        try {
            //since JavaScript classes are just global functinos, the following line is equivalent
            //to declaring a new instance of the class which name is specified in the string.
            return new window[custType]();
        } catch (error) {
            console.log("Invalid Customer Type");
        }
    }
}

const customerFactory:CustomerFactory = new CustomerFactory();

const goodCustomer:Customer2 = customerFactory.getCustomer("Premier");
const valuedCustomer:Customer2 = customerFactory.getCustomer("Valued");
const terribleCustomer:Customer2 = customerFactory.getCustomer("Deadbeat");

console.log("Customer Rating: " + goodCustomer.getCustRating());
console.log("Customer Rating: " + valuedCustomer.getCustRating());
console.log("Customer Rating: " + terribleCustomer.getCustRating());
/*
    "Customer Rating: Premier Customer"
    "Customer Rating: Valued Customer"
    "Customer Rating: Deadbeat Customer"
*/} {
/*
    Factory Method - Example 2 of 2

    Based on a challenge:
        Create a class called Athlete with subclass for Gold, Silver & Bronze Winners

        Make it so once an Athlete receives a medal no other Athlete can be assigned to that medal's subclass

        The program isn't allowed to contain conditional statements

    NOTE that I have actually not passed the challenge as I did use conditional statements
    ...within the try-catch block. Since the video tutorial implements the singleton pattern which
    is not naturally available nor appropriate in JavaScript, I will for the time being carry on
    with the rest of the exercises first, then maybe return to this challenge to do it properly.
*/

class Athlete {
    #athleteName:string;
    getAthleteName = ():string => this.#athleteName;
    setAthleteName(athleteName:string) {
        this.#athleteName = athleteName;
    }
    /*
        getInstance() exists on the Java implementation but I don't think it is something that
        should be considered in TypeScript. Singleton pattern is not appropriate in JavaScript/TypeScript.
        I will use an alternative approach instead.
    */
}
class GoldWinner extends Athlete {
    constructor(athleteName:string) {
        super();
        this.setAthleteName(athleteName);
    }
}
class SilverWinner extends Athlete {
    constructor(athleteName:string) {
        super();
        this.setAthleteName(athleteName);
    }
}
class BronzeWinner extends Athlete {
    constructor(athleteName:string) {
        super();
        this.setAthleteName(athleteName);
    }
}

class MedalFactory {
    #winners:any = {}; //Acts as a key-value store
    getMedal = (medalType:string, athleteName:string):Athlete => {
        try {
            if (typeof this.#winners[medalType] !== typeof undefined)
                return this.#winners[medalType];
            else
                return this.#winners[medalType] = new window[medalType](athleteName);
        } catch (error) {
            console.log("Invalid medal type");
        }
    }
}

const medalFactory = new MedalFactory();
let goldWinner = medalFactory.getMedal("GoldWinner", "Dave Thomas");
let silverWinner = medalFactory.getMedal("SilverdWinner", "Mac McDonald");
let bronzeWinner = medalFactory.getMedal("BronzeWinner", "David Edgerton");

let anotherGoldWinner = medalFactory.getMedal("GoldWinner", "Ray Kroc");

console.log("GoldWinner: " + goldWinner.getAthleteName());
console.log("SilverWinner " + silverWinner.getAthleteName());
console.log("BronzeWinner: " + bronzeWinner.getAthleteName());
console.log("AnotherGoldWinner: " + anotherGoldWinner.getAthleteName());

/*
    Results:
        GoldWinner: Dave Thomas
        SilverWinner: Mac McDonald
        BronzeWinner: David Edgerton
        AnotherGoldWinner: Dave Thomas

    As intended, no new GoldWinner with the property athleteName "Ray Kroc" is created.

    The presence of a GoldWinner that was created before "Ray Kroc" causes the MedalFactory
    ...to return the already existing GoldWinner instead.
*/

}