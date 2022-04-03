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

    To be continued: https://youtu.be/cBEUlEHZuqw?t=164
*/}