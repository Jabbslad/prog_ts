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
