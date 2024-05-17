const imgLeft = document.getElementById("imgLeft");
const imgMiddle = document.getElementById("imgMiddle");
const imgRight = document.getElementById("imgRight");
const titleLeft = document.getElementById("titleLeft");
const titleMiddle = document.getElementById("titleMiddle");
const titleRight = document.getElementById("titleRight");
const ratingLeft = document.getElementById("ratingLeft");
const ratingMiddle = document.getElementById("ratingMiddle");
const ratingRight = document.getElementById("ratingRight");
const comicData = []
const GOOD = "good";
const BAD = "bad";

let newestXkcd = 1;
let currentXkcd;

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
    const limit = middle === newestXkcd ? 0 : 1;
    Promise.all([fetchComicData(0, middle + start),
        fetchComicData(1, middle),
        fetchComicData(2, middle + limit)]
    ).then(updateGallery);
}

function fetchComicData(imgNum, comicNum) {
    return fetch("/" + comicNum + "/info.0.json")
        .then(response => response.text())
        .then(text => {
            const result = JSON.parse(text);
            const data = {};
            data.num = result.num;
            data.img = result.img;
            data.alt = result.alt;
            data.title = result.title;
            data.rating = null;
            comicData[imgNum] = data;
        });
}

function updateGallery() {
    const gallery = [imgLeft, imgMiddle, imgRight]
    const titles = [titleLeft, titleMiddle, titleRight]
    const ratings = [ratingLeft, ratingMiddle, ratingRight]
    for (const [idx, img] of gallery.entries()) {
        if (comicData[idx] !== undefined) {
            img.src = comicData[idx].img;
            img.title = comicData[idx].alt;
            titles[idx].innerHTML = comicData[idx].title;
            const rating = localStorage.getItem(comicData[idx].num.toString());
            if (rating !== null) {
                ratings[idx].innerHTML = (rating === GOOD) ? "Nice" : "Meh";
            } else {
                ratings[idx].innerHTML = "";
            }
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
        fetchComicData(0, currentXkcd - 1)
        .then(updateGallery);
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
        fetchComicData(2, currentXkcd + 1)
        .then(updateGallery);
    } else {
        showError("end");
        return;
    }
}

function rate(id) {
    let comicNumber;
    let rating;
    switch (id) {
        case "upLeft":
            comicNumber = comicData[0].num;
            rating = GOOD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        case "downLeft":
            comicNumber = comicData[0].num;
            rating = BAD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        case "upMiddle":
            comicNumber = comicData[1].num;
            rating = GOOD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        case "downMiddle":
            comicNumber = comicData[1].num;
            rating = BAD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        case "upRight":
            comicNumber = comicData[2].num;
            rating = GOOD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        case "downRight":
            comicNumber = comicData[2].num;
            rating = BAD;
            localStorage.setItem(comicNumber.toString(), rating);
            break;
        }
    updateGallery();
    
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