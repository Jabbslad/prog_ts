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
