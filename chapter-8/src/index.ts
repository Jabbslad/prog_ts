/*
setTimeout(() => console.info('A'), 1)
setTimeout(() => console.info('B'), 2)
console.info('C')
*/

import * as fs from 'fs'

fs.readFile('/var/log/apache2/access_log',
    { encoding: 'utf8' },
    (error, data) => {
        if (error) {
            console.error('error reading!', error)
            return
        }
        console.info('success reading!', data)
    })

fs.appendFile('/var/log/apache2/access_log', 'New access log entry',
    error => {
        if (error) {
            console.error('error writing', error)
        }
    })

/*
function appendAndReadPromise(path: string, data: string): Promise<string> {
    return appendPromise(path, data)
        .then(() => readPromise(path))
        .catch(error => console.error(error))
}
*/

type Executor<T, E extends Error> = {
    resolve: (result: T) => void,
    reject: (error: E) => void
} => void

    class Promise<T, E extends Error> {
        constructor(f: Executor<T, E>) { }
    }
import { readFile } from 'fs'

function readFilePromise(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}
