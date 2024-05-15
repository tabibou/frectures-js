const isPerfectNumber = function (x) {
    let sumDivisors = 0;
    for (let i = 1; i <= x; i++) {
        if (x % i === 0) sumDivisors += i;
    }
    return 2 * x === sumDivisors;
}

const perfectList = [6, 28, 496, 8128];
const imperfectList = [8, 32, 504, 8140];

perfectList.forEach(x => console.log(isPerfectNumber(x)))
imperfectList.forEach(x => console.log(isPerfectNumber(x)))
