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


type Filter = {
  (array: number[], f: (item: number) => boolean): unknown[]
}


//console.log(filter([1, 2, 3, 4, 5], _ => _ < 3))
