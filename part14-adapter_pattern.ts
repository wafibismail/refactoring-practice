{
/*
    How and When to use the Adapter Pattern...
*/
class EnemyShip {
    name: string;
    attackPower: number;
    spacesMovedPerTurn: number;

    constructor(currentLevel: number) {
        if(currentLevel <= 5) {

            this.name = "Galax";
            this.attackPower = 5;
            this.spacesMovedPerTurn = 2;

        } else if(currentLevel > 5 || currentLevel < 10) {

            this.name = "Galaxian";
            this.attackPower = 10;
            this.spacesMovedPerTurn = 3;

        } else {

            this.name = "Galaxian Prime";
            this.attackPower = 15;
            this.spacesMovedPerTurn = 4;

        }
    }

    moveShip(): void {
        console.log(`${this.name} moves ${this.spacesMovedPerTurn} spaces`);
    }
    makeShipAttack(): void {
        console.log(`${this.name} does ${this.attackPower} damage`);
    }
}

let level1Ship:EnemyShip = new EnemyShip(6);

level1Ship.moveShip();
level1Ship.makeShipAttack();

/*
    Now, to add a different type of ship; One that warps around the screen
*/

class GalaxianPrime extends EnemyShip {
    constructor(currentLevel: number) {
        super(currentLevel);
    }

    moveShip(): void {
        console.log(`${this.name} turns on the forcefield and moves ${this.spacesMovedPerTurn} spaces`);
    }
}

let primeTime: GalaxianPrime = new GalaxianPrime(15);

primeTime.moveShip();
primeTime.makeShipAttack();

/*
    What about adding more subclasses of the new ship?
*/}{
/*
    The Adapter Pattern allows us to add limitless amounts of subclasses without disturbing any
    code already written, in addition to:
        - making it easier to swap in code at runtime
        - allowing us to communicate by method names that make sense to us 

    In the Adapter Pattern:
        - start with an interface
        - Adapter class ensures new classes are compatible with the interface
*/
interface Enemy {
    moveShip: () => void;
    makeShipAttack: () => void;
}

class Galax implements Enemy {
    #attackPower: number = 5;
    #spacesMovedPerTurn: number = 2;

    moveShip(): void {
        console.log(`Galax moves ${this.#spacesMovedPerTurn}`);
    };
    makeShipAttack(): void {
        console.log(`Galax does ${this.#attackPower} damage`);
    }
}

class GalaxPrime {
    #name: string = "Galaxian Prime";
    #attackPower: number = 15;
    #spacesMovedPerTurn: number = 4;

    turnOnForceField(): void {
        console.log(`${this.#name} turns on force field`);
    }

    warpToSpace(): void {
        console.log(`${this.#name} warps ${this.#spacesMovedPerTurn} spaces`);
    }

    chargePhasers(): void {
        console.log(`${this.#name} charges phasers`);
    }

    firePhasers(): void {
        console.log(`${this.#name} fires phasers for ${this.#attackPower}`);
    }
}

    // ^ Notice that the methods can be named freely

class EnemyAdapter implements Enemy {
    #galaxPrime: GalaxPrime;

    constructor(galaxPrime: GalaxPrime) {
        this.#galaxPrime = galaxPrime;
    }

        // Any call sent to moveShip and makeShipAttack will be rerouted to the proper methods
        // in the adaptee class 

    moveShip(): void {
        this.#galaxPrime.turnOnForceField();
        this.#galaxPrime.warpToSpace();
    }

    makeShipAttack(): void {
        this.#galaxPrime.chargePhasers();
        this.#galaxPrime.firePhasers();
    }
}

const galax: Enemy = new Galax();

const galaxPrimeAdaptee: GalaxPrime = new GalaxPrime();

const galaxPrime: Enemy = new EnemyAdapter(galaxPrimeAdaptee);

galax.moveShip();
galax.makeShipAttack();

console.log("");

galaxPrime.moveShip();
galaxPrime.makeShipAttack();/*

Galax moves 2 spaces
Galax does 5 damage

Galaxian Prime turns on force field
Galaxian Prime warps 4 spaces
Galaxian Prime charges phasers
Galaxian Prime fires phasers for 15

*/}