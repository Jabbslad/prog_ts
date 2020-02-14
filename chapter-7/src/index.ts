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

function parse2(birthday: string): Date {
    let daye = new Date(birthday)
    if(!isValid(date)) {
        throw new RangeError("Enter a date in the form YYYY/MM/DD")
    }
    return date
}

try {
    let date = parse2(ask())
    console.info('Date is', date.toISOString())
} catch (e) {
    if (e instanceof RangeError) {
        console.error(e.message)
    } else {
        throw e
    }
}
