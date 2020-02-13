var readline = require('readline-sync')

function prompt(question: string) {
    return readline.question(question)
}

function ask() {
  return prompt("when is your birthday? ");
}

function parse(birthday: string): Date | null {
    let date = new Date(birthday);
    if (!isValid(date)) {
        return null
    }
    return date
}

function isValid(date: Date): boolean {
    return Object.prototype.toString.call(date) === '[object Date]'
        && !Number.isNaN(date.getTime())
}

let date = parse(ask())

if(isValid(date)) {
    console.info('date is ', date.toISOString())
} else {
    console.error("error parsing the date for some reason")
}
