let newestXkcd = 1;
let currentXkcd;
const imgLeft = document.getElementById("imgLeft");
const imgMiddle = document.getElementById("imgMiddle");
const imgRight = document.getElementById("imgRight");
const imgTitle = document.getElementById("imgTitle");
const data = []

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
    if (middle === undefined) {
        console.log("undefined middle");
        middle = parseInt(document.getElementById("xkcdNumber").value);
        console.log(middle);
    }
    for (let i = -1; i < 2; i++) {
        fetchComicData(i+1, middle + i);
    }
}

function fetchComicData(imgNum, comicNum) {
    console.log(imgNum);
    console.log(comicNum);
    fetch("/" + comicNum + "/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            const comicData = {};
            comicData.num = result.num;
            comicData.img = result.img;
            comicData.alt = result.alt;
            comicData.title = result.title;
            data[imgNum] = comicData;
            showGallery();
        });
}

function showGallery() {
    const gallery = [imgLeft, imgMiddle, imgRight]
    for (const [idx, img] of gallery.entries()) {
        img.src = data[idx].img;
        img.title = data[idx].alt;
    } 
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
    currentXkcd -= 1;
    fetchThreeComics(currentXkcd);
}

function showNextImage() {
    if (currentXkcd === newestXkcd) {
        showError("end");
        return;
    }
    currentXkcd += 1;
    fetchThreeComics(currentXkcd);
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