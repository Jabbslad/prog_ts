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

if (isValid(date)) {
    console.info('date is ', date.toISOString())
} else {
    console.error("error parsing the date for some reason")
}

function parse2(birthday: string): Date {
    let daye = new Date(birthday)
    if (!isValid(date)) {
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

class InvalidDateFormatError extends RangeError { }
class DateIsInTheFutureError extends RangeError { }

/**
 * @throws {InvalidDateFormatError} The user entered their birthday incorrectly
 * @throws {DateIsInTheFutureError} The user entered a birthday in the future
 */
function parse3(birthday: string): Date {
    let date = new Date(birthday)
    if (!isValid(date)) {
        throw new InvalidDateFormatError("Enter a date in the form YYYY/MM/DD")
    }
    if (date.getTime() > Date.now()) {
        throw new DateIsInTheFutureError("Are you a timelord?")
    }
    return date
}

try {
    let date = parse3(ask())
    console.info('date is', date.toISOString())
} catch (e) {
    if (e instanceof InvalidDateFormatError) {
        console.error(e.message)
    } else if (e instanceof DateIsInTheFutureError) {
        console.info(e.message)
    } else {
        throw e
    }
}


function parse4(birthday: string): Date | InvalidDateFormatError | DateIsInTheFutureError {
    let date = new Date(birthday)
    if (!isValid(date)) {
        return new InvalidDateFormatError("Enter a date in the form YYYY/MM/DD")
    }
    if (date.getTime() > Date.now()) {
        return new DateIsInTheFutureError("Are you a timelord?")
    }
    return date
}

let result = parse4(ask())
if (result instanceof InvalidDateFormatError) {
    console.error(result.message)
}

interface Option<T> { }
class Some<T> implements Option<T> {
    constructor(private value: T)
}
class None implements Option<never> { }





