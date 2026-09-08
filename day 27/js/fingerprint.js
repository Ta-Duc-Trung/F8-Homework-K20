
function render(state) {
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

if (history.state && history.state.fingerprint) {

    document.getElementById("direct-note").classList.add("hidden");
    render(history.state);
} else {
      var data = collectStaticBOMInfo();
    data.location = "Đang lấy vị trí…";

    render(data);

      requestGeolocation(
        function (locationText) {
            data.location = locationText;
            render(data);
        },
        function (errorText) {
            data.location = errorText;
            render(data);
        },
    );
}
window.addEventListener("popstate", function (event) {
    if (event.state && event.state.fingerprint) {
        document.getElementById("direct-note").classList.add("hidden");
        render(event.state);
    }
});
