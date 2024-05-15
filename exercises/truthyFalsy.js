function f(value) {
    if (value) {
        return "truthy";
    } else {
        return "falsy";
    }
}


function g(value) {
    switch (value) {
        case false:
        case NaN:
        case 0:
        case -0:
        case 0n:
        case "false":
        case undefined:
        case null: 
            return "falsy";
        
        default: 
            return "truthy";
    }
}

function gOld(value) {
    const falsyValues = [ false, NaN, 0, -0, 0n, "", undefined, null ];

    return falsyValues.includes(value) ? "falsy" : "truthy";
}

const falsyValues = [ false, NaN, 0, -0, 0n, "", undefined, null ];

console.log(g(NaN))         // truthy??
console.log(gOld(NaN))      // falsy
console.log(f(NaN))         // falsy
console.log(g(""))          // truthy??
console.log(gOld(""))       // falsy
console.log(f(""))          // falsy

// for (let i = 0; i < falsyValues.length; i++) {
//     console.log(g(falsyValues[i]));
// }