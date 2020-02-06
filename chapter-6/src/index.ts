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

new API({
  baseURL: "http://test.com",
  tier: "prod"
});

/* error
new API({
    baseURL: "test.com",
    tierr: 'prod'
}) 
*/
type Unit = "cm" | "px" | "%";

let units: Unit[] = ["cm", "px", "%"];

function parseUnit(value: string): Unit | null {
  for (let i = 0; i < units.length; i++) {
    if (value.endsWith(units[i])) {
      return units[i];
    }
  }
  return null;
}

type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
  if (width == null) {
    return null;
  }

  if (typeof width === "number") {
    return { unit: "px", value: width };
  }

  let unit = parseUnit(width);
  if (unit) {
    return { unit, value: parseFloat(width) };
  }
  return null;
}

type Weekday = "Mon" | "Tue" | "Wed" | "Thur" | "Fri";
type Day = Weekday | "Sat" | "Sun";

function getNextDay(w: Weekday): Day {
  switch (w) {
    case "Mon":
      return "Tue";
    default:
      return "Mon";
  }
}

function isBig(n: number): boolean {
  if (n >= 100) {
    return true;
  }
  return false;
}

function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}

type ActivityLog = {
  lastEvent: Date;
  events: {
    id: string;
    timestamp: Date;
    type: "Read" | "Write";
  }[];
};

let activityLog: ActivityLog = {
  lastEvent: new Date(),
  events: [
    {
      id: "1",
      timestamp: new Date(),
      type: "Read"
    }
  ]
};

console.log(get(activityLog, "lastEvent"));

type Get = {
  <O extends Object, K1 extends keyof O>(o: O, k1: K1): O[K1];
  <O extends Object, K1 extends keyof O, K2 extends keyof O[K1]>(
    o: O,
    k1: K1,
    k2: K2
  ): O[K1][K2];
  <
    O extends Object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    o: O,
    k1: K1,
    k2: K2,
    k3: K3
  ): O[K1][K2][K3];
};

let getter: Get = (obj: any, ...keys: string[]) => {
  let result = obj;
  keys.forEach(k => (result = result[k]));
  return result;
};

console.log(getter(activityLog, "events", 0, "type"));

let nextDay: Record<Weekday, Day> = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thur",
  Thur: "Fri",
  Fri: "Sat"
};

// Mapped Types
let nextDay2: { [K in Weekday]: Day } = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thur",
  Thur: "Fri",
  Fri: "Sat"
};

type RecordJ<K extends keyof any, T> = {
  [P in K]: T;
};

let nextDayJ: RecordJ<Weekday, Day> = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thur",
  Thur: "Fri",
  Fri: "Sat"
};

console.log(nextDayJ.Mon);
