const images = [
    "https://imgs.xkcd.com/comics/time_vulture.png",
    "https://imgs.xkcd.com/comics/standards.png",
    "https://imgs.xkcd.com/comics/mimic_octopus.png"
]

const img = document.getElementById("xkcdImg");
const buttonPrev = document.getElementById("prev");
const buttonNext = document.getElementById("next");

function showPrevImage() {  
    const currentImg = img.getAttribute("src");
    switch (currentImg) {
        case images[0]:
            img.src = images[2];
            break;
        case images[1]:
            img.src = images[0];
            break;
        case images[2]:
            img.src = images[1];
    }
}

function showNextImage() {
    const currentImg = img.getAttribute("src");
    switch (currentImg) {
        case images[0]:
            img.src = images[1];
            break;
        case images[1]:
            img.src = images[2];
            break;
        case images[2]:
            img.src = images[0];
    }
}