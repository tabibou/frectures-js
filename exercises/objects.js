function countWords_(str) {
    let wordCounts = {}
    for (const word of str.match(/\w+/g)) {
        if (word in wordCounts) wordCounts[word] += 1;
        else wordCounts[word] = 1;
    }
    return JSON.stringify(wordCounts);
}

function countWords(str) {
    let wordCounts = new Map();
    for (const word of str.match(/\w+/g)) {
        const count = wordCounts.get(word) ?? 0;
        wordCounts.set(word, count + 1);
    }
    return wordCounts;
}

console.log(countWords("Wenn hinter Fliegen Fliegen fliegen, fliegen Fliegen Fliegen nach."))
// { Wenn: 1, hinter: 1, Fliegen: 4, fliegen: 2, nach: 1 }

console.log(countWords("The constructor does not CREATE objects; The constructor INITIALIZES objects!"))
// Do you notice something weird? --> constructor is processed

console.log(countWords("Most JavaScript objects have a special __proto__ property related to inheritance."))
// Do you notice something weird? --> __proto__ is processed