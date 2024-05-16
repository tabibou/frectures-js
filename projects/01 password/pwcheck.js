import { sha1hex } from './sha1.js';
import { updateHistory } from './history.js';

export function findBreaches() {
    const resultCount = document.getElementById("result");
    const password = document.getElementById("password");
    const sha = sha1hex(password.value);
    const prefix = sha.substring(0, 5);
    const suffix = sha.substring(5);

    fetch("https://api.pwnedpasswords.com/range/" + prefix)
        .then(response => response.text())
        .then(text => {
            let count = 0;
            const lines = text.split(/\r?\n/);
            for (const line of lines) {
                if (line.includes(suffix)) {
                    count = line.split(":")[1];
                }
            }
            if (count === 0) {
                resultCount.innerText = "Lucky you! No breaches found."
            } else {
                resultCount.innerText = `Oh no! Found ${count} breaches.`
            }
            updateHistory(password.value, count);
        });
}
