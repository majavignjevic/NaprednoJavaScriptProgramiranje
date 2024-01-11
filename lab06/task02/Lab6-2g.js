const sumOfNumbers = require('./Lab6-2m.js');
const args = process.argv.slice(2);

const min = parseInt(args[0]);
const max = parseInt(args[1]);
const numbers = args.slice(2).map(Number);

const result = sumOfNumbers(min, max, numbers);

console.log(result);