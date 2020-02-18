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
