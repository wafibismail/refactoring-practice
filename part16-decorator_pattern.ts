{/*
    Bad way of adding functionality
*/
enum HaircutOptions { BASIC_CUT, PERM, HAIR_FROSTING };
class CalculateHaircut {
    //HaircutOptions = HaircutOptions;

    #optionPicked: HaircutOptions;

    constructor(option: HaircutOptions) {
        this.#optionPicked = option;
    }

    getDescription(): string {
        if(this.#optionPicked == HaircutOptions.PERM) {
            return "\nAdd Chemicals and Put Hair in Rollers";
        } else
            if(this.#optionPicked == HaircutOptions.HAIR_FROSTING) {
                return "\nAdd Chemicals and Put Hair in Foil";
            } else return "Trim the Hair";
    }

    getCost(): number {
        if(this.#optionPicked == HaircutOptions.PERM) {
            return 75.00;
        } else
            if(this.#optionPicked == HaircutOptions.HAIR_FROSTING) {
                return 100.00;
            } else return 10.00;
    }
}
/*To continue from https://youtu.be/__-rstffCLs?t=124*/}