type Colour = "Black" | "White";
type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Position {
  constructor(private file: File, private rank: Rank) {}

  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    };
  }
}

abstract class Piece {
  protected position: Position;
  constructor(
    private readonly colour: Colour,
    private file: File,
    private rank: Rank
  ) {
    this.position = new Position(file, rank);
  }

  moveTo(position: Position) {
    this.position = position;
  }

  abstract canMoveTo(position: Position): boolean;
}

class King extends Piece {
  canMoveTo(position: Position): boolean {
    let distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
//class Queen extends Piece {}
//class Bishop extends Piece {}
//class Knight extends Piece {}
//class Rook extends Piece {}
//class Pawn extends Piece {}

class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [new King("White", "E", 1), new King("Black", "E", 8)];
  }
}

let set = new Set();
set
  .add(1)
  .add(2)
  .add(3);
set.has(2);
set.has(4);

// Interface Extension

interface Set2 {
  has(value: number): boolean;
}

interface MutableSet extends Set2 {
  add(value: number): this;
  delete(value: number): this;
}

// Declaration Merging

interface User {}

interface User {
  name: string;
}

interface User {
  age: number;
}

let user: User = {
  name: "Jamie",
  age: 18
};

console.log(user);

interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

interface Feline {
  meow(): void;
}

class Cat implements Animal, Feline {
  name = "cat";
  eat(food: string): void {
    console.info("ate some", food);
  }
  sleep(hours: number): void {
    console.info("slept for", hours, "hours");
  }
  meow(): void {
    console.info("meow!");
  }
}

let cat: Cat = new Cat();
cat.eat("cat food");
cat.sleep(6);
cat.meow();

type State = {
  [key: string]: string;
};

class StringDatabase {
  state: State = {};
  get(key: string): string | null {
    return key in this.state ? this.state[key] : null;
  }
  set(key: string, value: string): void {
    this.state[key] = value;
  }
  static from(state: State): StringDatabase {
    let db: StringDatabase = new StringDatabase();
    for (let key in state) {
      db.set(key, state[key]);
    }
    return db;
  }
}

type State2<V> = {
  [key: string]: V | null;
};

class Map1<K, V> {
  private state: State2<V> = {};
  get(key: K): V | null {
    let key_s = JSON.stringify(key);
    return key_s in this.state ? this.state[key_s] : null;
  }
  set(key: K, value: V): void {
    let key_s = JSON.stringify(key);
    this.state[key_s] = value;
  }
}

let map1: Map1<number, string> = new Map1();
map1.set(1, "one");
map1.set(1, "one");
map1.set(2, "two");

console.log(map1);

// Mixins

type ClassConstructor<T> = new (...args: any[]) => T;

function withEZDebug<C extends ClassConstructor<{ getDebugValue(): object }>>(
  Class: C
) {
  return class extends Class {
    debug() {
      let Name = Class.constructor.name;
      let value = this.getDebugValue();
      return Name + "(" + JSON.stringify(value) + ")";
    }
  };
}

class HardToDebugUser {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}

  getDebugValue() {
    return {
      id: this.id,
      name: this.firstName + " " + this.lastName
    };
  }
}

let User = withEZDebug(HardToDebugUser);
let user1 = new User(1, "Jabbs", "lad");
console.log(user1.debug());
