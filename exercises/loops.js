for (let divisor = 1; divisor <= 42; divisor++) {
    if (42 % divisor === 0) console.log(divisor); 
}


x = 27;
while (x > 1) {
    if (x % 2 === 0) x /= 2;
    else x = x * 3 + 1;
    console.log(x);
}
