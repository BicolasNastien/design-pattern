interface Character {
  hp: number;
  attack: number;
  defense: number;
  speed: number;

  stats(): string;
}

abstract class BaseCharacter implements Character {
  abstract hp: number;
  abstract attack: number;
  abstract defense: number;
  abstract speed: number;

  stats(): string {
    return `HP : ${this.hp} - Attack : ${this.attack} - Defense : ${this.defense} - Speed : ${this.speed}`;
  }
}

class Warrior extends BaseCharacter {
  hp: number = 200;
  attack: number = 50;
  defense: number = 100;
  speed: number = 10;
}

class Mage extends BaseCharacter {
  hp: number = 100;
  attack: number = 100;
  defense: number = 50;
  speed: number = 20;
}

class Rogue extends BaseCharacter {
  hp: number = 150;
  attack: number = 100;
  defense: number = 50;
  speed: number = 30;
}

class CharacterFactory {
  static create(type: 'warrior' | 'mage' | 'rogue'): Character {
    switch (type) {
      case 'warrior': return new Warrior();
      case 'mage': return new Mage();
      case 'rogue': return new Rogue();
      default: throw new Error(`Character ${type} not implemented.`);
    }
  }
}

// Client code
const warrior = CharacterFactory.create('warrior');
const mage = CharacterFactory.create('mage');
const rogue = CharacterFactory.create('rogue');
const archer = CharacterFactory.create('archer'); // ERROR

console.log(warrior.stats());  // HP : 200 - Attack : 50 - Defense : 100 - Speed : 10
console.log(mage.stats());     // HP : 100 - Attack : 100 - Defense : 50 - Speed : 20
console.log(rogue.stats());    // HP : 150 - Attack : 100 - Defense : 50 - Speed : 30
