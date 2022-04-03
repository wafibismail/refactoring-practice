{/*
    Aim: eliminate the string name state, in order to improve type safety
*/
class ATMAccessBad {
    #state: string;

    readonly CARD_ENTERED: string = "CARD_ENTERED";
    readonly VALID_CARD: string = "VALID_CARD";
    readonly VALID_PIN: string = "VALID_PIN";
    readonly VALID_CASH_REQUEST: string = "VALID_CASH_REQUEST";
    readonly DENIED: string = "DENIED";

    readonly CARD_NUMBER: number = 123456789;
    readonly PIN_NUMBER: number = 1234;
    readonly CARD_BALANCE: number = 1000.00;

    constructor() { this.#state = this.CARD_ENTERED; }

    verifyCard(cardNumber: number): void {
        if(this.CARD_NUMBER == cardNumber) {
            this.#state = this.VALID_CARD;
        } else this.#state = this.DENIED;
    }

    verifyPin(pinNumber: number): void {
        if(this.PIN_NUMBER == pinNumber) {
            this.#state = this.VALID_PIN;
        } else this.#state = this.DENIED;
    }

    verifyWithdrawalAmount(withdrawalRequest: number): void {
        if(this.CARD_BALANCE > withdrawalRequest) {
            this.#state = this.VALID_CASH_REQUEST;
        } else this.#state = this.DENIED;
    }
}

// To be continued from https://youtu.be/EIsip10vrfk?t=96 

}