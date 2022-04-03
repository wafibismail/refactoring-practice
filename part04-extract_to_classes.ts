/*
    ORIGINAL CODE; [Final refactored code starts from line 190 onwards]
*/{
class Customer {
    #firstName:string = "";
    #lastName:string = "";
    #street:string = "";
    #city:string = "";
    #state:string = "";
    #postalCode:number = 0;
    #birthDay:string = "";

    getFirstName = ():string => this.#firstName;
    setFirstName(firstName:string):void {
        this.#firstName = firstName;
    }
    getLastName = ():string => this.#lastName;
    setLastName(lastName:string):void {
        this.#lastName = lastName;
    }
    getStreet = ():string => this.#street;
    setStreet(street:string):void {
        this.#street = street;
    }
    getCity = ():string => this.#city;
    setCity(city:string):void {
        this.#city = city;
    }
    getState = ():string => this.#state;
    setState(state:string) {
        this.#state = state;
    }
    getPostalCode = ():number => this.#postalCode;
    setPostalCode(postalCode:number) {
        this.#postalCode = postalCode;
    }
    getBirthDay = ():string => this.#birthDay;
    setBirthDay (birthDay:string) {
        this.#birthDay = birthDay;
    }

    constructor(firstName:string, lastName:string, street:string,
        city:string, state:string, postalCode:number, birthDay:string) {
        
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#street = street;
        this.#city = city;
        this.#state = state;
        this.#postalCode = postalCode;
        this.#birthDay = birthDay;

    }
}
/*
    The problem with the code above is that the class is getting too big
    with that many instance variables, getters, setters, and a constructor.

    Some of the information can be extracted into separate classes
    (including moving methods & fields over to the new classes)

    How?
        Look for different parts of the class data that fits together
            -E.g.: street, city, state, postalCode...
        ... and extract them into a class (as shown below)


    REFACTORED CODE - 1st ITERATION - EXTRACTION variables INTO Address class
*/}{
class Customer {
    #firstName:string = "";
    #lastName:string = "";

    #address:Address = null;

    #birthDay:string = "";
    

    getFirstName = ():string => this.#firstName;
    setFirstName(firstName:string):void {
        this.#firstName = firstName;
    }
    getLastName = ():string => this.#lastName;
    setLastName(lastName:string):void {
        this.#lastName = lastName;
    }
    getAddress = ():Address => this.#address;
    setAddress(address:Address):void {
        this.#address = address;
    }
    getBirthDay = ():string => this.#birthDay;
    setBirthDay (birthDay:string) {
        this.#birthDay = birthDay;
    }

    constructor(firstName:string, lastName:string, address:Address, birthDay:string) {
        this.#firstName = firstName;
        this.#address = address;
        this.#lastName = lastName;
        this.#birthDay = birthDay;
    }
}

class Address {
    #street:string = "";
    #city:string = "";
    #state:string = "";
    #postalCode:number = 0;
    getStreet = ():string => this.#street;
    setStreet(street:string):void {
        this.#street = street;
    }
    getCity = ():string => this.#city;
    setCity(city:string):void {
        this.#city = city;
    }
    getState = ():string => this.#state;
    setState(state:string) {
        this.#state = state;
    }
    getPostalCode = ():number => this.#postalCode;
    setPostalCode(postalCode:number) {
        this.#postalCode = postalCode;
    }

    constructor(street:string, city:string, state:string, postalCode:number) {
        this.#street = street;
        this.#city = city;
        this.#state = state;
        this.#postalCode = postalCode;
    }
}

let sallySmithAddress:Address = new Address("123 Main St", "Perry", "Iowa", 50220);

const sallySmith:Customer = new Customer("Sally", "Smith", sallySmithAddress, "12/12/74");

console.log("Customer name: " + sallySmith.getFirstName() + " " + sallySmith.getLastName());
console.log("Customer address: " + sallySmithAddress.getStreet() + " " + sallySmithAddress.getCity()
            + " " + sallySmithAddress.getState() + " " + sallySmithAddress.getPostalCode());
/*
    Now, another problem arises, which is that the code for printing address
    is unnecessarily long due to having to call 4 accessor methods.

    What could be done is to define a toString() method in address.
*/}{
class Address {
    #street:string = "";
    #city:string = "";
    #state:string = "";
    #postalCode:number = 0;
    getStreet = ():string => this.#street;
    setStreet(street:string):void {
        this.#street = street;
    }
    getCity = ():string => this.#city;
    setCity(city:string):void {
        this.#city = city;
    }
    getState = ():string => this.#state;
    setState(state:string) {
        this.#state = state;
    }
    getPostalCode = ():number => this.#postalCode;
    setPostalCode(postalCode:number) {
        this.#postalCode = postalCode;
    }

    constructor(street:string, city:string, state:string, postalCode:number) {
        this.#street = street;
        this.#city = city;
        this.#state = state;
        this.#postalCode = postalCode;
    }

    toString():string {
        return this.getStreet() + " " + this.getCity() + " " + this.getState() + " " + this.getPostalCode;
    }
}
//Sample run 1b
let sallySmithAddress:Address = new Address("123 Main St", "Perry", "Iowa", 50220);
console.log("Customer address: " + sallySmithAddress.toString());
/*
    A lot simpler than using 4 accessor methods!

    A similar approach can be applied with birthDay, and in this case, it should be done,
    as a birthDay of primitive type string has little use for what it can otherwise be used for.

    REFACTORED CODE - FINAL ITERATION - EXTRACT INTO BirthDay Class
*/}{
class Customer {
    #firstName:string = "";
    #lastName:string = "";

    #address:Address = null;

    #birthDay:Birthday = null;    

    getFirstName = ():string => this.#firstName;
    setFirstName(firstName:string):void {
        this.#firstName = firstName;
    }
    getLastName = ():string => this.#lastName;
    setLastName(lastName:string):void {
        this.#lastName = lastName;
    }
    getAddress = ():Address => this.#address;
    setAddress(address:Address):void {
        this.#address = address;
    }
    getBirthDay = ():Birthday => this.#birthDay;
    setBirthDay (birthDay:Birthday) {
        this.#birthDay = birthDay;
    }

    constructor(firstName:string, lastName:string, address:Address, birthDay:Birthday) {
        
        this.#firstName = firstName;
        this.#address = address;
        this.#lastName = lastName;
        this.#birthDay = birthDay;
    }
}
class Address {
    #street:string = "";
    #city:string = "";
    #state:string = "";
    #postalCode:number = 0;
    getStreet = ():string => this.#street;
    setStreet(street:string):void {
        this.#street = street;
    }
    getCity = ():string => this.#city;
    setCity(city:string):void {
        this.#city = city;
    }
    getState = ():string => this.#state;
    setState(state:string) {
        this.#state = state;
    }
    getPostalCode = ():number => this.#postalCode;
    setPostalCode(postalCode:number) {
        this.#postalCode = postalCode;
    }

    constructor(street:string, city:string, state:string, postalCode:number) {
        this.#street = street;
        this.#city = city;
        this.#state = state;
        this.#postalCode = postalCode;
    }

    toString():string {
        return this.getStreet() + " " + this.getCity() + " " + this.getState() + " " + this.getPostalCode;
    }
}
class Birthday {
    #day:number;
    #month:number;
    #year:number;

    getDay = ():number => this.#day;
    setDay(day:number) {
        this.#day = day;
    }
    getMonth = ():number => this.#month;
    setMonth(month:number) {
        this.#month = month;
    }
    getYear = ():number => this.#year;
    setYear(year:number) {
        this.#year = year;
    }

    constructor(day:number, month:number, year:number) {
        this.#day = day;
        this.#month = month;
        this.#year = year;
    }

    getBirthDate = ():string => this.getDay() + '/' + this.getMonth() + '/' + this.getYear();

    toString = ():string => this.getDay() + '/' + this.getMonth() + '/' + this.getYear();
}
//Sample run2
let sallySmithAddress:Address = new Address("123 Main St", "Perry", "Iowa", 50220);
const sallysmithBirthday:Birthday = new Birthday(12, 21, 1974);
const sallySmith:Customer = new Customer("Sally", "Smith", sallySmithAddress, sallysmithBirthday);

let cName:string = sallySmith.getFirstName() + " " + sallySmith.getLastName();
let cAddress:string = sallySmith.getAddress().toString();
let cBirthday:string = sallySmith.getBirthDay().toString();

console.log("Customer name: " + cName);
console.log("Customer address: " + cAddress);
console.log("Customer birthday: " + cBirthday);

/*
    Now, birthday, having been divided into day, month and year numbers,
    can be utilized in more ways compared to if it were merely a string type.

    END
*/}