{
/**/
class Sandwich {
    #bread: string = "";
    #vegetables: string = "";
    #meat: string = "";
    #cheese: string = "";
    #condiments: string = "";

    getBread = (): string => this.#bread;
    setBread(bread: string): void {
        this.#bread = bread;}
    getVegetables = (): string => this.#vegetables;
    setVegetables(vegetables: string): void {
        this.#vegetables = vegetables;
    }
    getMeat = (): string => this.#meat;
    setMeat(meat: string): void {
        this.#meat = meat;
    }
    getCheese = (): string => this.#cheese;
    setCheese(cheese: string): void {
        this.#cheese = cheese;
    }
    getCondiments = (): string => this.#condiments;
    setCondiments(condiments: string): void {
        this.#condiments = condiments;
    }

    toString(): string {
        return this.getBread() + " " + this.getVegetables() + " " + this.getMeat()
            + " " + this.getCheese() + " " + this.getCondiments();
    }
}

abstract class SandwichBuilder {
    sandwich: Sandwich;

    getSandwich(): Sandwich {
        return this.sandwich;
    };

    makeSandwich(): void {
        this.sandwich = new Sandwich();
    }

    abstract buildBread(): void;
    abstract buildVegetable(): void;
    abstract buildMeat(): void;
    abstract buildCheese(): void;
    abstract buildCondiments(): void;
}

class BLTBuilder extends SandwichBuilder { /*BLT = Bacon, Lettuce, Tomato*/
    buildBread(): void {
        this.sandwich.setBread("White bread");
    }
    buildVegetable(): void {
        this.sandwich.setVegetables("Lettuce Tomato");
    }
    buildMeat(): void {
        this.sandwich.setMeat("Bacon");
    }
    buildCheese(): void {
        this.sandwich.setCheese("");
    }
    buildCondiments(): void {
        this.sandwich.setCondiments("Mayonnaise");
    }
}

class SandwichArtist {
    #sandwichBuilder: SandwichBuilder;

    setSandwichBuilder(sandwichBuidler: SandwichBuilder) {
        this.#sandwichBuilder = sandwichBuidler;
    }

    getSandwich = (): Sandwich => this.#sandwichBuilder.getSandwich();

    takeSandwichOrder() {
        this.#sandwichBuilder.makeSandwich();
        this.#sandwichBuilder.buildBread();
        this.#sandwichBuilder.buildVegetable();
        this.#sandwichBuilder.buildMeat();
        this.#sandwichBuilder.buildCheese();
        this.#sandwichBuilder.buildCondiments();
    }
}

const paul: SandwichArtist = new SandwichArtist();
const bltBuilder: SandwichBuilder = new BLTBuilder();

paul.setSandwichBuilder(bltBuilder);
paul.takeSandwichOrder();

let bltSandwich: Sandwich = paul.getSandwich();

console.log(bltSandwich.toString());/*
White Bread Lettuce Tomato Bacon  Mayonnaise

________________________________________________

    SandwichArtist in this case is the Director, containing all the methods to:
        1) Assign the Sandwich to build, and
        2) Initializing it,
        3) Providing the object once it is asked for
*/}