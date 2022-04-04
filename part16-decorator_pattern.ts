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
}{/*
    The better way, or, in another perspective, a general introduction to the Decorator Pattern: */
interface HairCut {
    getDescription: () => string;
    getCost: () => number;
}
abstract class HairCutDecorator implements HairCut {
    hairCut: HairCut;

    constructor(hairCut: HairCut) {
        this.hairCut = hairCut;
    }

    getDescription = (): string => this.hairCut.getDescription();
    getCost = (): number => this.hairCut.getCost();
}

/*
    Basic type of haircut, used every time before upgrade to the other options:
*/

class RegularHairCut implements HairCut {
    getDescription = (): string => "Trim the Hair";
    getCost = (): number => 10.00;
}

/*
    With a decorator, more functionality can be added without changing any existing code
*/

class Perm extends HairCutDecorator {
    constructor(hairCut: HairCut) {
        super(hairCut);
    }

    getDescription = (): string => 
        this.hairCut.getDescription() + "\nAdd Chemicals and Put Hair in Rollers";

    getCost = (): number =>
        this.hairCut.getCost() + 75.00;
}

const permAndCut: HairCut = new Perm(new RegularHairCut());
/*
    Perm is the embellishment (added feature); RegularHairCut is the main program
*/
console.log("SERVICES");
console.log(permAndCut.getDescription());
console.log(`Price $${permAndCut.getCost()}`);/*
SERVICES
Trim the Hair
Add Chemicals and Put Hair in Rollers
Price $85.0                                     */}