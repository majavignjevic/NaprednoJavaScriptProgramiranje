function sumOfNumbers(min, max, array) {
    const minimal = min;
    const maximal = max;

    const filterNumbers = array.filter(num => num >= minimal && num <= maximal);
    const sum = filterNumbers.reduce((total, current) => total + current, 0);
    return sum;
}

module.exports = sumOfNumbers;