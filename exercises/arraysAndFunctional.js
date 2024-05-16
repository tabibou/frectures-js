const divisors = function (x) {
    let retArray = []
    for (let divisor = 1; divisor <= x; divisor++) {
        if (x % divisor === 0) retArray.push(divisor); 
    }
    return retArray;
}

console.log(divisors(1234))

const isPerfectNumber = function (x) {
    let dvsrs = divisors(x);
    let sumDivisors = dvsrs.reduce((sumSoFar, divisor) => sumSoFar + divisor, 0); 
    return 2 * x === sumDivisors;
}

const perfectList = [6, 28, 496, 8128];
const imperfectList = [8, 32, 504, 8140];

perfectList.forEach(x => console.log(isPerfectNumber(x)))
imperfectList.forEach(x => console.log(isPerfectNumber(x)))