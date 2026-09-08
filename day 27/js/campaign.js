var searchParams = new URLSearchParams(location.search);
var sourceValue = searchParams.get("utm_source");
var campaignValue = searchParams.get("utm_campaign");

var paramsBox = document.getElementById("params-box");
var noParamsMessage = document.getElementById("no-params-msg");

function createFieldCardHtml(label, value) {
    return (
        '<div class="bg-surface2 border border-edge rounded-lg px-4 py-3">' +
        '<p class="text-xs text-muted mb-1">' +
        label +
        "</p>" +
        '<p class="font-data text-base text-accent">' +
        value +
        "</p>" +
        "</div>"
    );
}

if (!sourceValue && !campaignValue) {
    paramsBox.classList.add("hidden");
    noParamsMessage.classList.remove("hidden");
} else {
    var sourceToShow = sourceValue ? sourceValue : "—";
    var campaignToShow = campaignValue ? campaignValue : "—";
    var html = "";
    html = html + createFieldCardHtml("utm_source (Tên nguồn)", sourceToShow);
    html =
        html +
        createFieldCardHtml("utm_campaign (Tên chiến dịch)", campaignToShow);

    paramsBox.innerHTML = html;
}
