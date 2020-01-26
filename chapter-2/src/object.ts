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
