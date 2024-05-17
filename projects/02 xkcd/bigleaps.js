let newestXkcd = 1;
let currentXkcd;
const imgLeft = document.getElementById("imgLeft");
const imgMiddle = document.getElementById("imgMiddle");
const imgRight = document.getElementById("imgRight");
const comicData = []

function fetchNewestXkcd() {
    fetch("/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            newestXkcd = result.num;
            currentXkcd = newestXkcd;
            fetchThreeComics(currentXkcd);
        });
}

function fetchThreeComics(middle) {
    currentXkcd = middle;
    const start = middle === 1 ? 0 : -1;
    const limit = middle === newestXkcd ? 1 : 2;
    for (let i = start; i < limit; i++) {
        fetchComicData(i+1, middle + i);
    }
}

function fetchComicData(imgNum, comicNum) {
    fetch("/" + comicNum + "/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            const data = {};
            data.num = result.num;
            data.img = result.img;
            data.alt = result.alt;
            data.title = result.title;
            comicData[imgNum] = data;
            showGallery();
        });
}

function showGallery() {
    const gallery = [imgLeft, imgMiddle, imgRight]
    for (const [idx, img] of gallery.entries()) {
        if (comicData[idx] !== undefined) {
            img.src = comicData[idx].img;
            img.title = comicData[idx].alt;
        }
    } 
}

function fetchCustomXkcd() {
    input = parseInt(document.getElementById("xkcdNumber").value);
    if (input < 1 || input > newestXkcd) {
        showError("input");
        return;
    }
    fetchThreeComics(input);
}

function showPrevImage() {
    if (currentXkcd !== 1) {
        currentXkcd -= 1;
        comicData[2] = comicData[1];
        comicData[1] = comicData[0];
        fetchComicData(0, currentXkcd - 1);
    } else {
        showError("zero");
        return;
    }
}

function showNextImage() {
    if (currentXkcd !== newestXkcd) {
        currentXkcd += 1;
        comicData[0] = comicData[1];
        comicData[1] = comicData[2];
        fetchComicData(2, currentXkcd + 1);
    } else {
        showError("end");
        return;
    }
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