let newestXkcd = 1;
let currentXkcd;
const img = document.getElementById("xkcdImg");
const imgTitle = document.getElementById("imgTitle");

function fetchNewestXkcd() {
    fetch("/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            newestXkcd = result.num;
            currentXkcd = newestXkcd;
            img.src = result.img;
            img.title = result.alt;
            imgTitle.innerHTML = result.title;
        });
}

function fetchCustomXkcd() {
    const input = document.getElementById("xkcdNumber").value;
    console.log(input);
    if (input < 1 || input > newestXkcd) {
        showError("input");
        return;
    }
    fetchComic(input);
}

function showPrevImage() {
    if (currentXkcd === 1) {
        showError("zero");
        return;
    }
    const prevXkcd = currentXkcd - 1;
    fetchComic(prevXkcd);
}

function showNextImage() {
    if (currentXkcd === newestXkcd) {
        showError("end");
        return;
    }
    const nextXkcd = currentXkcd + 1;
    fetchComic(nextXkcd);
}

function fetchComic(number) {
    fetch("/" + number + "/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            img.src = result.img;
            currentXkcd = result.num;
            img.title = result.alt;
            imgTitle.innerHTML = result.title;
        });
}

function showError(type) {
    let msg;
    switch (type) {
        case "input":
            msg = `Please enter a whole number between 1 and ${newestXkcd}!`;
            break;
        case "zero":
            msg = `First comic reached! Can't go to previous.`;
            break;
        case "end":
            msg = `Last comic reached! Can't go to next`;
            break;
        default:
            msg = `Error! Please reload page.`
    }
    document.getElementById("error").innerHTML = msg;
}