/**
 * ==========================================================
 * FILE: fingerprint.js  (chỉ dùng trong fingerprint.html)
 * ==========================================================
 * File này chạy khi người dùng mở TRỰC TIẾP file fingerprint.html
 * (gõ thẳng URL, hoặc bấm F5 để tải lại trang khi đang ở URL đó),
 * chứ KHÔNG phải đi qua nút bấm ở trang chủ.
 *
 * Vì sao cần file riêng cho trường hợp này?
 * -> Vì history.pushState() chỉ lưu "state" trong bộ nhớ của
 *    document HIỆN TẠI. Nếu người dùng F5 (tải lại trang), toàn
 *    bộ JavaScript và biến trong bộ nhớ sẽ bị xóa sạch và chạy
 *    lại từ đầu, nên history.state lúc đó sẽ là null (rỗng).
 *
 * Giải pháp: nếu không có sẵn state, ta tự đọc lại thông tin BOM
 * ngay tại trang này, y hệt như cách trang chủ đã làm.
 * ==========================================================
 */

/* ----------------------------------------------------------
 * HÀM render(state): vẽ dữ liệu ra giao diện
 * ----------------------------------------------------------
 * Hàm này giống hệt hàm showFingerprintView() bên file home.js,
 * chỉ khác là ở đây không cần ẩn/hiện view nào cả vì trang này
 * chỉ có đúng 1 nội dung để hiển thị.
 * ---------------------------------------------------------- */
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

/* ----------------------------------------------------------
 * KIỂM TRA: trang này đang có sẵn history.state hay không?
 * ----------------------------------------------------------
 * TRƯỜNG HỢP A: history.state có tồn tại và có field
 *   "fingerprint" = true.
 *   -> Trường hợp này khá hiếm khi mở file này, nhưng ta vẫn
 *      viết code xử lý cho đầy đủ và an toàn.
 *
 * TRƯỜNG HỢP B: history.state là null (trường hợp thường gặp
 *   nhất khi mở trực tiếp / F5 trang này).
 *   -> Ta tự thu thập lại dữ liệu BOM tại chỗ, y hệt trang chủ.
 * ---------------------------------------------------------- */
if (history.state && history.state.fingerprint) {
    // TRƯỜNG HỢP A
    document.getElementById("direct-note").classList.add("hidden");
    render(history.state);
} else {
    // TRƯỜNG HỢP B: tự lấy dữ liệu BOM giống hệt cách trang chủ đã làm

    var data = collectStaticBOMInfo();
    data.location = "Đang lấy vị trí…";

    // Vẽ giao diện ngay với dữ liệu tạm thời (vị trí đang chờ)
    render(data);

    // Xin vị trí (bất đồng bộ), khi có kết quả thì vẽ lại
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

/* ----------------------------------------------------------
 * Lắng nghe popstate phòng trường hợp hiếm gặp: người dùng
 * bấm Back/Forward ngay trong lúc vẫn đang ở document này
 * (ví dụ do trình duyệt lưu cache trang - "bfcache").
 * ---------------------------------------------------------- */
window.addEventListener("popstate", function (event) {
    if (event.state && event.state.fingerprint) {
        document.getElementById("direct-note").classList.add("hidden");
        render(event.state);
    }
});
