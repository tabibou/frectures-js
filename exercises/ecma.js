
function releaseYearOfEcmaScript(version) {
    if (typeof version !== "number") throw new Error(`Please submit a number`);
    if (version < 1) throw new Error(`non-positive ECMAScript version ${version}`);
    //               /////
    switch (version) {
    //////
        case 1: return 1997;
        case 2: return 1998;
        case 3: return 1999;
        case 4: throw new Error("abandoned ECMAScript version 4");
        case 5: return 2009;

        default: return (version >= 2015) ? version : 2009 + version;
    }            //////                  ///       ///
}

// releaseYearOfEcmaScript([]);
// releaseYearOfEcmaScript({});
// releaseYearOfEcmaScript(NaN);
releaseYearOfEcmaScript("number");
