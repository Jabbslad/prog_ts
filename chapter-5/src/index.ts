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
  eat(food: string): void;
  sleep(hours: number): void;
}

class Cat implements Animal {
  eat(food: string): void {
    console.info("ate some", food);
  }
  sleep(hours: number): void {
    console.info("slept for", hours, "hours");
  }
}

let cat: Cat = new Cat();
cat.eat("cat food");
cat.sleep(6);
