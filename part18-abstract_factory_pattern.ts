{/*
    Start
*/
interface MonsterAttackPower {
    toString(): string;
}
class BasicAttack implements MonsterAttackPower {
    toString(): string {
        return '10 in damage';
    }
}
class MediumAttack implements MonsterAttackPower {
    toString(): string {
        return '20 in damage';
    }
}

interface MonsterAttackRange {
    toString(): string;
}
class BasicRange implements MonsterAttackRange {
    toString(): string {
        return '5 away';
    }
}
class MediumRange implements MonsterAttackRange {
    toString(): string {
        return '10 away';
    }
}


interface MonsterFactory {
    assignAttackPower(): MonsterAttackPower;
    assignAttackRange(): MonsterAttackRange;
}
class ZombieFactory implements MonsterFactory {
    assignAttackPower(): MonsterAttackPower {
        return new BasicAttack();
    }
    assignAttackRange(): MonsterAttackRange {
        return new BasicRange();
    }
}
class VampireFactory implements MonsterFactory {
    assignAttackPower(): MonsterAttackPower {
        return new MediumAttack();
    }
    assignAttackRange(): MonsterAttackRange {
        return new MediumRange();
    }
}

abstract class Monster {
    #name:string;

    attackPower: MonsterAttackPower;
    attackRange: MonsterAttackRange;

    abstract makeMonster(): void;

    checkIfVictimIsInRange(): void {
        console.log(`${this.getName} checks if victim is ${this.attackRange}`);
    }

    attackTheVictim(): void {
        console.log(`${this.getName} attacks the victim for ${this.attackPower}`);
    }

    toString(): string {
        let infoOnMonster: string = `${this.getName} attacks anything ${this.attackRange} for ${this.attackPower}`;
        return infoOnMonster;
    }

    getName = (): string => this.#name;
    setName(name: string): void { this.#name = name; }
}
class Zombie extends Monster {
    monsterFactory: MonsterFactory;

    constructor(monsterFactory: MonsterFactory) {
        super();
        this.monsterFactory = monsterFactory;
    }

    makeMonster(): void {
        console.log("Making a Zombie");

        this.attackPower = this.monsterFactory.assignAttackPower();
        this.attackRange = this.monsterFactory.assignAttackRange();
        
    }
}
class Vampire extends Monster {
    monsterFactory: MonsterFactory;

    constructor(monsterFactory: MonsterFactory) {
        super();
        this.monsterFactory = monsterFactory;
    }

    makeMonster(): void {
        console.log("Making a Vampire");

        this.attackPower = this.monsterFactory.assignAttackPower();
        this.attackRange = this.monsterFactory.assignAttackRange();
        
    }
}

abstract class MonsterBuilder {
    makeMonster: (typeOfMonster: string) => Monster;

    orderAMonster(typeOfMonster: string): Monster {
        const theMonster: Monster = this.makeMonster(typeOfMonster);

        theMonster.makeMonster();
        theMonster.checkIfVictimIsInRange();
        theMonster.attackTheVictim();

        return theMonster;
    }
}
class OrderAMonster extends MonsterBuilder {
    makeMonster = (typeOfMonster: string): Monster => {
        let theMonster: Monster = null;
        if(typeOfMonster == "Zombie") {
            const monsterFactory: MonsterFactory = new ZombieFactory();
            theMonster = new Zombie(monsterFactory);
            theMonster.setName("Zombie Bob");
        }
        if(typeOfMonster == "Vampire") {
            const monsterFactory: MonsterFactory = new VampireFactory();
            theMonster = new Vampire(monsterFactory);
            theMonster.setName("Vampire Paul");
        }

        return theMonster;
    }
}

const monsterBuilder: MonsterBuilder = new OrderAMonster();

const zombie = monsterBuilder.orderAMonster("Zombie");
console.log(zombie.toString() + '\n');

const vampire = monsterBuilder.orderAMonster("Vampire");
console.log(vampire.toString() + '\n');/*

Making a Zombie
Zombie Bob checks if victim is 5 away
Zombie Bob attacks the victim for 10 in damage
Zombie Bob attacks anything 5 away for 10 damage

Making a Vampire
Vampire Paul checks if victim is 10 away
Vampire Paul attacks the victim for 20 in damage
Vampire Paul attacks anything 10 away for 20 damage

    End
*/}