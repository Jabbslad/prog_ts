type ExistingUser = {
  id: number;
  name: string;
};

type NewUser = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

let existingUser: ExistingUser = {
  id: 1,
  name: "Jabbslad"
};

console.log(existingUser);
deleteUser(existingUser);
console.log(existingUser);

type LegacyUser = {
  id: number | string;
  name: string;
};

let legacyUser: LegacyUser = {
  id: "1234567",
  name: "Xin Yang"
};

//deleteUser(legacyUser);

class Animal {}
class Bird extends Animal {
  chirp() {}
}
class Crow extends Bird {
  caw() {}
}

function chirp(bird: Bird): Bird {
  bird.chirp();
  return bird;
}

function clone(f: (bird: Bird) => Bird): void {}

function birdToBird(b: Bird): Bird {
  return new Bird();
}

clone(birdToBird);

function birdToCrow(bird: Bird): Crow {
  return new Crow();
}

clone(birdToCrow);

function birdToAnimal(bird: Bird): Animal {
  return new Animal();
}

// clone(birdToAnimal);

// Type Widening

const a = "x"; // 'x'
let b = a; // widened to string

const c: "x" = "x"; // explicit type set
let d = c; // 'x' (unwidened)

type Options = {
  baseURL: string;
  cacheSize?: number;
  tier?: "prod" | "dev";
};

class API {
  constructor(private options: Options) {}
}
