function add(a: number, b: number): number {
  return a + b;
}

console.log(add(4, 5));

function greet(name: string): string {
  return "hello " + name;
}

let greet2 = function(name: string): string {
  return "hello " + name;
};

let greet3 = (name: string): string => {
  return "hello " + name;
};

let greet4 = (name: string): string => "hello " + name;

let greet5 = new Function("name", 'return "hello " + name');

console.log(greet5("Jabbslad"));
let log = (message: string, userId?: string) => {
  let time = new Date().toLocaleTimeString();
  console.log(time, message, userId || "User not signed in");
};

log("page loaded");
log("user signed in", "Jabbslad");

let log2 = (message: string, userId = "User not signed in") =>
  log(message, userId);

log2("page loaded");

let sumVariadicsafe = (...numbers: number[]): number =>
  numbers.reduce((total, n) => total + n, 0);

console.log(sumVariadicsafe(1, 2, 3));

function* fibseq() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let fs = fibseq();
console.log(fs.next());
console.log(fs.next());
console.log(fs.next());
console.log(fs.next());

function* createNumbers() {
  let n = 0;
  while (1) {
    yield n++;
  }
}

let nums = createNumbers();
console.log(nums.next());
console.log(nums.next());
console.log(nums.next());

// ITERATORS

let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  }
};

for (let n of numbers) {
  console.log(n);
}

console.log([...numbers]);

// CALL SIGNATURES

type Log = (message: string, userId?: string) => void;

let log3: Log = (message, userId) => {
  let time = new Date().toLocaleTimeString();
  console.log(time, message, userId);
};

log3("log3", "Jabbslad");

type Reservation = string;

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};

let reserve: Reserve = (
  from: Date,
  toOrDestination: string | Date,
  destination?: string
) => {
  let ret: string = "";
  if (toOrDestination instanceof Date && destination !== undefined) {
    ret = `${toOrDestination.toLocaleTimeString()} ${destination}`;
  } else if (typeof toOrDestination === "string") {
    ret = toOrDestination;
  }
  return ret;
};

/*
function filter(array, f) {
  let result = []
  for (let i = 0; i<array.length; i++){
    let item = array[i]
    if(f(item)) {
      result.push(item)
    }
  }
  return result
}
*/

/*
type Filter = {
  (array: number[], f: (item: number) => boolean): unknown[]
}
*/

type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};

let filter: Filter<number> = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};
console.log(filter([1, 2, 3, 4, 5], _ => _ < 3));

// MAP

/*
function map(array: unknown[], f: (item: unknown) => unknown): unknown[] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
  return result
}
*/

type Map1 = {
  <T, U>(array: T[], f: (item: T) => U): U[];
};

let map1: Map1 = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
};

console.log(map1([1, 2, 3, 4, 5], _ => "" + _));

function map2<T, U>(array: T[], f: (item: T) => U): U[] {
  let result: U[] = [];
  for (let x of array) {
    result.push(f(x));
  }
  return result;
}

console.log(map2([1, 2, 3, 4, 5], _ => "" + _));

// annotated generic
console.log(map2<number, string>([1, 2, 3, 4, 5], _ => "" + _));

// GENERIC TYPE ALIAS

type MyEvent<T> = {
  target: T;
  type: string;
};

// BOUNDED POLLYMORPHISM

type TreeNode = {
  value: string;
};

type LeafNode = TreeNode & {
  isLeaf: true;
};

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

let a: TreeNode = { value: "a" };
let b: LeafNode = { value: "b", isLeaf: true };
let c: InnerNode = { value: "c", children: [b] };

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value)
  };
}

let a1 = mapNode(a, _ => _.toUpperCase());
let b1 = mapNode(b, _ => _.toUpperCase());
let c1 = mapNode(c, _ => _.toUpperCase());

console.log(a1);
console.log(b1);
console.log(c1);

type HasSides = { numberOfSides: number };
type SidesHaveLength = { sideLength: number };
type Square = HasSides & SidesHaveLength;

function logPerimeter<T extends HasSides & SidesHaveLength>(shape: T): T {
  console.log(shape.numberOfSides * shape.sideLength);
  return shape;
}

let square: Square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square);

// BOUNDED POLYMORPHISM TO MODEL ARITY

function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args);
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value);
}

console.log(call(fill, 10, "a")); // evaluates to an array of 10 'a's
