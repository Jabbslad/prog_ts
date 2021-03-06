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

type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

let account1: Account = {
  id: 1,
  isEmployee: true,
  notes: ["note 1"]
};

console.log(account1);

type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

let optionalAccount1: OptionalAccount = {
  id: 1
};

console.log(optionalAccount1);

type UnOptional = Required<OptionalAccount>;

let unOptionalAccount1: UnOptional = {
  id: 1,
  isEmployee: false,
  notes: []
};

console.log(unOptionalAccount1);

type CurrencyName = "EUR" | "GBP" | "JPY" | "USD";

type Currency = {
  unit: CurrencyName;
  value: number;
};

let Currency = {
  from(value: number, unit: CurrencyName = "USD"): Currency {
    return { unit, value };
  }
};

// Advanced function types

function tuple<T extends unknown[]>(...ts: T): T {
  return ts;
}

let tupleA = tuple(1, true);

console.log(tupleA);

function isString(a: unknown): a is string {
  return typeof a === "string";
}

console.log(isString("a"));
console.log(isString([7]));

function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
    formattedInput = input.toUpperCase();
  }
}

// Conditional Types

type IsString<T> = T extends string ? true : false;
type A = IsString<string>;
type B = IsString<number>;

type ToArray<T> = T[];

type AArray = ToArray<number>;
type BArray = ToArray<string | number>;

let arr: BArray = ["hello", "world"];
console.log(arr);
//let arr2: BArray = [true, false]

type ToArray2<T> = T extends unknown ? T[] : T[];
type AArray2 = ToArray2<number>;
type BArray2 = ToArray2<number | string>;

type Without<T, U> = T extends U ? never : T;
type AWithout = Without<boolean | string | number, boolean>;

// using infer
type ElementType<T> = T extends unknown[] ? T[number] : T;
type AElementType = ElementType<number[]>;

type ElementType2<T> = T extends (infer U)[] ? U : T;
type BElementType2 = ElementType2<number[]>;

// Typesafe prototypes

interface Array<T> {
  zip<U>(list: U[]): [T, U][];
}

Array.prototype.zip = function<T, U>(this: T[], list: U[]): [T, U][] {
  return this.map((v, k) => tuple(v, list[k]));
};
