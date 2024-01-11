const fs = require('fs');
const inputFile = 'input.txt';
const outputFile = 'output.txt';

let lines = [];
let countOdd = 0;

fs.readFile(inputFile, 'utf8', (err, inputData) => {
    if (err) {
        console.error(err);
        return;
    }

    lines = inputData.split('\r\n').map(line => line.split(/\s+/)).flat();

    const evenNumbers = lines.filter(num => {
        const number = parseInt(num);

        if(isNaN(number)){
            return false;
        }
        else if(number % 2 === 0){
            return true;
        }
        else{
            countOdd++;
            return false;
        }
    });
    
    const outputData = evenNumbers.join(' ');

    fs.writeFileSync(outputFile, outputData + '\n', 'utf8');

    console.log(countOdd);
});
