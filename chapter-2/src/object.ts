let f: { firstname: string; surname: string } = {
  firstname: "jabbs",
  surname: "lad"
};

class Person {
  constructor(public firstname: string, public surname: string) {}
}

f = new Person("jabbs", "lad");

let g: {
  b: number;
  c?: string;
  [key: number]: boolean;
};

g = { b: 1, 10: true };

let h: object = {
  a: 10
};

let user: { readonly firstname: string } = { firstname: "jabbs" };

type Age = number;

let i: { name: string; age: Age } = { name: "Jabbslad", age: 10 };

type Colour = "red";
{
  type Colour = "blue";
  let x: Colour = "blue";
  console.log(x);
}
let x: Colour = "red";
console.log(x);

type NumOrString = number | string;
let j: NumOrString[] = [1, "2"];
j.push(3);

let k = [1, "2", 3, "four"];
k = k.map(n => {
  if (typeof n === "number") {
    return n * 3;
  }
  return n.toUpperCase();
});
console.log(k);

type Cat = { firstname: string; meow: boolean };
type Dog = { firstname: string; bark: boolean };
type CatOrDog = Cat | Dog;
type CatAndDog = Cat & Dog;

let cat1 = { firstname: "oscar", meow: true };
let dog1 = { firstname: "chalky", bark: true };
let catdog = { firstname: "horsey", meow: true, bark: true };

// ARRAYS
let arr1: number[] = [];
arr1.push(1);
console.log(arr1);

function buildArray() {
  let a = [];
  a.push(1);
  a.push("hello");
  return a;
}

let arr2 = buildArray();
// arr2.push(true); <- will not work because the type is number | string

// TUPLES
let tup1: [number] = [1];
let tup2: [string, string, string] = ["jabbs", ".", "lad"];

console.log(tup2);

type TrainFare = [number, number?][];
let trainFares: TrainFare = [[1.0, 2.0], [1.0]];

let friends: [string, ...string[]] = ["fiend1", "friend2"];
let heterogenous: [number, boolean, ...string[]] = [1.0, true, "friend1"]; // ordering matters

let roArr: readonly number[] = [1, 2, 3, 4, 5];
let roArr2 = roArr.concat(6); // look into using 'immutable' package for better performance.
console.log(roArr2);
roArr2.push(3);

function double(x: number): number {
  return x + x;
}
