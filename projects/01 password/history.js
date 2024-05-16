export const history = [];

export function updateHistory(pw, n) {
    if (!history.some(entry => entry.password === pw)) {
        const entry = {password: pw, count : n};
        history.push(entry);
        history.sort((a, b) => b.count - a.count);
        createTable(history);
    }
}

function createTable(data) {
    const old_tbody = document.getElementById("tbodyId");
    const new_tbody = document.createElement('tbody');
    new_tbody.id = "tbodyId";

    data.forEach(entry => {
        let row = new_tbody.insertRow();
        let pwCell = row.insertCell(0);
        pwCell.innerHTML = entry.password;
        let countCell = row.insertCell(1);
        countCell.innerHTML = entry.count;
    });

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}