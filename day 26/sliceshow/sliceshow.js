const slideImages = [
    "https://picsum.photos/id/1015/900/500",
    "https://picsum.photos/id/1025/900/500",
    "https://picsum.photos/id/1035/900/500",
    "https://picsum.photos/id/1043/900/500",
    "https://picsum.photos/id/1050/900/500",
];
const totalSlides = slideImages.length;

const sliderWrapEl = document.getElementById("sliderWrap");
const sliderTrackEl = document.getElementById("sliderTrack");
const prevBtnEl = document.getElementById("prevBtn");
const nextBtnEl = document.getElementById("nextBtn");
const dotsWrapEl = document.getElementById("sliderDots");
const counterEl = document.getElementById("sliderCounter");

let currentPosition = 1;
let currentRealIndex = 0;
let autoplayTimerId = null;
let sliderKeydownListener = null;

function buildSlides() {
    let htmlContent = "";

    htmlContent += createSlideHtml(slideImages[totalSlides - 1]);

    for (let i = 0; i < totalSlides; i++) {
        htmlContent += createSlideHtml(slideImages[i]);
    }

    htmlContent += createSlideHtml(slideImages[0]);

    sliderTrackEl.innerHTML = htmlContent;
}

function createSlideHtml(imageUrl) {
    return (
        '<div class="slide w-full flex-shrink-0 h-[340px]">' +
        '<img src="' +
        imageUrl +
        '" alt="" class="w-full h-full object-cover block">' +
        "</div>"
    );
}

function buildDots() {
    let htmlContent = "";
    for (let i = 0; i < totalSlides; i++) {
        const activeClass = i === 0 ? " is-active" : "";
        htmlContent +=
            '<button class="dot' +
            activeClass +
            ' w-2 h-2 rounded-full bg-white/55 hover:bg-white/85 transition-all" ' +
            'data-index="' +
            i +
            '" aria-label="Slide ' +
            (i + 1) +
            '"></button>';
    }
    dotsWrapEl.innerHTML = htmlContent;
}

function moveTrackTo(position, useAnimation) {
    currentPosition = position;

    if (useAnimation === false) {
        sliderTrackEl.classList.add("no-anim");
    } else {
        sliderTrackEl.classList.remove("no-anim");
    }

    sliderTrackEl.style.transform = "translateX(-" + position * 100 + "%)";

    currentRealIndex = (position - 1 + totalSlides) % totalSlides;
    updateSliderUI();
}

function updateSliderUI() {
    const allDots = dotsWrapEl.querySelectorAll(".dot");
    for (let i = 0; i < allDots.length; i++) {
        if (i === currentRealIndex) {
            allDots[i].classList.add("is-active");
        } else {
            allDots[i].classList.remove("is-active");
        }
    }
    counterEl.textContent = currentRealIndex + 1 + " / " + totalSlides;
}

function goToNextSlide() {
    moveTrackTo(currentPosition + 1, true);
}

function goToPrevSlide() {
    moveTrackTo(currentPosition - 1, true);
}

sliderTrackEl.addEventListener("transitionend", function () {
    if (currentPosition === totalSlides + 1) {
        moveTrackTo(1, false);
    } else if (currentPosition === 0) {
        moveTrackTo(totalSlides, false);
    }
});

function restartAutoplay() {
    clearInterval(autoplayTimerId);
    autoplayTimerId = setInterval(goToNextSlide, 3000);
}

prevBtnEl.addEventListener("click", function () {
    goToPrevSlide();
    restartAutoplay();
});
nextBtnEl.addEventListener("click", function () {
    goToNextSlide();
    restartAutoplay();
});

dotsWrapEl.addEventListener("click", function (e) {
    const clickedDot = e.target.closest(".dot");
    if (!clickedDot) return;

    const index = Number(clickedDot.dataset.index);
    moveTrackTo(index + 1, true);
    restartAutoplay();
});

sliderWrapEl.addEventListener("mouseenter", function () {
    clearInterval(autoplayTimerId);
});
sliderWrapEl.addEventListener("mouseleave", function () {
    restartAutoplay();
});

function attachSliderKeydown() {
    if (sliderKeydownListener !== null) return;

    sliderKeydownListener = function (e) {
        if (e.key === "ArrowLeft") {
            goToPrevSlide();
            restartAutoplay();
        } else if (e.key === "ArrowRight") {
            goToNextSlide();
            restartAutoplay();
        }
    };
    document.addEventListener("keydown", sliderKeydownListener);
}

function detachSliderKeydown() {
    if (sliderKeydownListener === null) return;
    document.removeEventListener("keydown", sliderKeydownListener);
    sliderKeydownListener = null;
}

sliderWrapEl.addEventListener("click", function () {
    attachSliderKeydown();
});

document.addEventListener("click", function (e) {
    if (!sliderWrapEl.contains(e.target)) {
        detachSliderKeydown();
    }
});

buildSlides();
buildDots();
moveTrackTo(1, false);
restartAutoplay();
