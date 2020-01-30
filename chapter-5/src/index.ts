class Game {}

type Colour = "Black" | "White";
type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Position {
  constructor(private file: File, private rank: Rank) {}
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
}

class King extends Piece {}
class Queen extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Rook extends Piece {}
class Pawn extends Piece {}
