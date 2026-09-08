var homeView = document.getElementById("home-view");
var fingerprintView = document.getElementById("fingerprint-view");
var bomData = collectStaticBOMInfo();
bomData.location = "Đang lấy vị trí…";
function renderHomeCards() {
    document.getElementById("geo-value").textContent = bomData.location;
    document.getElementById("browser-value").textContent = bomData.browser;
    document.getElementById("os-value").textContent = bomData.os;
    document.getElementById("lang-value").textContent = bomData.languages;
    document.getElementById("screen-value").textContent = bomData.screenSize;
    document.getElementById("orientation-value").textContent =
        bomData.orientation;

    var dotEl = document.getElementById("online-dot");
    var textEl = document.getElementById("online-text");
    renderOnlineStatus(dotEl, textEl, bomData.online);
}
renderHomeCards();
requestGeolocation(
    function (locationText) {
        bomData.location = locationText;
        renderHomeCards();
    },

    function (errorText) {
        bomData.location = errorText;
        renderHomeCards();
    },
);
window.addEventListener("online", function () {
    bomData.online = true;
    renderHomeCards();
});

window.addEventListener("offline", function () {
    bomData.online = false;
    renderHomeCards();
});
window.addEventListener("resize", function () {
    bomData.screenSize = getScreenSize();
    bomData.orientation = getOrientation();
    renderHomeCards();
});
function showHomeView() {
    fingerprintView.classList.add("hidden");
    homeView.classList.remove("hidden");
    homeView.classList.add("view-fade");
}

function showFingerprintView(state) {
    homeView.classList.add("hidden");
    fingerprintView.classList.remove("hidden");
    fingerprintView.classList.add("view-fade");

    var fingerprintText = buildFingerprintString(state);
    document.getElementById("fingerprint-string").textContent = fingerprintText;

    var labels = {
        location: "Vị trí",
        online: "Trạng thái",
        browser: "Trình duyệt",
        os: "Hệ điều hành",
        languages: "Ngôn ngữ",
        screenSize: "Kích thước màn hình",
        orientation: "Hướng màn hình",
    };

    var fieldsEl = document.getElementById("fingerprint-fields");
    fieldsEl.innerHTML = "";

    var keys = Object.keys(labels);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var label = labels[key];

        var value;
        if (key === "online") {
            value = state.online ? "Online" : "Offline";
        } else {
            value = state[key];
        }

        var cardHtml =
            '<div class="bg-surface border border-edge rounded-lg px-4 py-3">' +
            '<p class="text-xs text-muted mb-1">' +
            label +
            "</p>" +
            '<p class="font-data text-sm text-slate-100 break-words">' +
            value +
            "</p>" +
            "</div>";

        fieldsEl.insertAdjacentHTML("beforeend", cardHtml);
    }
}
function goToFingerprint() {
    var state = {
        fingerprint: true,
        location: bomData.location,
        online: bomData.online,
        browser: bomData.browser,
        os: bomData.os,
        languages: bomData.languages,
        screenSize: bomData.screenSize,
        orientation: bomData.orientation,
    };

    history.pushState(state, "Fingerprinting", "fingerprint.html");

    showFingerprintView(state);
}

document
    .getElementById("go-fingerprint-btn")
    .addEventListener("click", goToFingerprint);

document
    .getElementById("nav-fingerprint-btn")
    .addEventListener("click", goToFingerprint);
document.getElementById("back-home-btn").addEventListener("click", function () {
    history.back();
});

window.addEventListener("popstate", function (event) {
    if (event.state && event.state.fingerprint) {
        showFingerprintView(event.state);
    } else {
        showHomeView();
    }
});
