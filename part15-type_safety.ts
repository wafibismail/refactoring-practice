{/*
    Aim: eliminate the string name state, in order to improve type safety
*/
class ATMAccessBad {
    state: string;

    readonly CARD_ENTERED: string = "CARD_ENTERED";
    readonly VALID_CARD: string = "VALID_CARD";
    readonly VALID_PIN: string = "VALID_PIN";
    readonly VALID_CASH_REQUEST: string = "VALID_CASH_REQUEST";
    readonly DENIED: string = "DENIED";

    readonly CARD_NUMBER: number = 123456789;
    readonly PIN_NUMBER: number = 1234;
    readonly CARD_BALANCE: number = 1000.00;

    constructor() { this.state = this.CARD_ENTERED; }

    verifyCard(cardNumber: number): void {
        if(this.CARD_NUMBER == cardNumber) {
            this.state = this.VALID_CARD;
        } else this.state = this.DENIED;
    }

    verifyPin(pinNumber: number): void {
        if(this.PIN_NUMBER == pinNumber) {
            this.state = this.VALID_PIN;
        } else this.state = this.DENIED;
    }

    verifyWithdrawalAmount(withdrawalRequest: number): void {
        if(this.CARD_BALANCE > withdrawalRequest) {
            this.state = this.VALID_CASH_REQUEST;
        } else this.state = this.DENIED;
    }
}

let user: ATMAccessBad = new ATMAccessBad();

console.log(user.state);

user.verifyCard(123456789);

console.log(user.state);

user.verifyPin(1234);

console.log(user.state);

user.verifyWithdrawalAmount(99);

console.log(user.state);/*

CARD ENTERED
VALID CARD
VALID PIN
VALID CASH REQUEST

*/}{
/*
    Problems with the code above:
        - state is not encapsulated

    What needs to change:
        - getters and setters for state to be implemented
        - all state information moved to a separate class
        - which will be the type of the typesafe field in the ATMAccess class
*/
class ATMAccessGood {

    #cardState: ATMCardState;

    getState = (): string => this.#cardState.toString();

    setState = (state: ATMCardState): void => { this.#cardState = state; }

    readonly CARD_ENTERED: string = "CARD_ENTERED";
    readonly VALID_CARD: string = "VALID_CARD";
    readonly VALID_PIN: string = "VALID_PIN";
    readonly VALID_CASH_REQUEST: string = "VALID_CASH_REQUEST";
    readonly DENIED: string = "DENIED";

    readonly CARD_NUMBER: number = 123456789;
    readonly PIN_NUMBER: number = 1234;
    readonly CARD_BALANCE: number = 1000.00;

    constructor() { this.setState(ATMCardState.CARD_ENTERED); }

    verifyCard(cardNumber: number): void {
        if (this.getState() == ATMCardState.CARD_ENTERED.toString()) {
            if(ATMCardState.CARD_NUMBER == cardNumber) {
                this.setState(ATMCardState.VALID_CARD);
            }
        } else this.setState(ATMCardState.DENIED);
    }

    verifyPin(pinNumber: number): void {
        if(this.getState() == ATMCardState.VALID_CARD.toString()) {
            if(ATMCardState.PIN_NUMBER == pinNumber) {
                this.setState(ATMCardState.VALID_PIN);
            }
        } else this.setState(ATMCardState.DENIED);
    }

    verifyWithdrawalAmount(withdrawalRequest: number): void {
        if(this.getState() == ATMCardState.VALID_PIN.toString()) {
            if(withdrawalRequest <= ATMCardState.CARD_BALANCE) {
                this.setState(ATMCardState.VALID_CASH_REQUEST);
            }
        } else this.setState(ATMCardState.DENIED);
    }
}

class ATMCardState {
    readonly #name: string;

    constructor(name: string) {
        this.#name = name;
    }

    toString(): string {
        return this.#name;
    }

    static readonly CARD_ENTERED: ATMCardState = new ATMCardState("CARD_ENTERED");
    static readonly VALID_CARD: ATMCardState = new ATMCardState("VALID_CARD");
    static readonly VALID_PIN: ATMCardState = new ATMCardState("VALID_PIN");
    static readonly VALID_CASH_REQUEST: ATMCardState = new ATMCardState("VALID_CASH_REQUEST");
    static readonly DENIED: ATMCardState = new ATMCardState("DENIED");

    static readonly CARD_NUMBER: number = 123456789;
    static readonly PIN_NUMBER: number = 1234;
    static readonly CARD_BALANCE: number = 1000.00;
}

let user: ATMAccessGood = new ATMAccessGood();

console.log(user.getState());

user.verifyCard(123456789);

console.log(user.getState());

user.verifyPin(1234);

console.log(user.getState());

user.verifyWithdrawalAmount(99);

console.log(user.getState());/*

CARD ENTERED
VALID CARD
VALID PIN
VALID CASH REQUEST

    state is now 100% type-safe, as it is only pulling information from the external class
*/}