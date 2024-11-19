const path = require('path');
module.exports = {
    mode: 'development', // 'development ou production'
    entry: './script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    
    },
}