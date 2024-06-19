'use strict'
const path = require('path')

const resolve = (dir) => {
    return path.join(__dirname, '.', dir)
}
/*sss*/
module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "@": resolve('src')
        }
    }
}
