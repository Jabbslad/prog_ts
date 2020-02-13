var readline = require('readline-sync')

function prompt(question: string) {
    return readline.question(question)
}

function ask() {
  return prompt("when is your birthday? ");
}

function parse(birthday: string): Date {
  return new Date(birthday);
}

let date = parse(ask())
console.info('date is ', date.toISOString())
