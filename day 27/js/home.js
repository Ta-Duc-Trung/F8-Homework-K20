/**
 * ==========================================================
 * FILE: home.js  (chỉ dùng trong index.html)
 * ==========================================================
 * File này làm 2 việc chính:
 *
 * VIỆC 1: Lấy thông tin BOM và hiển thị lên các "card" ở trang chủ.
 *
 * VIỆC 2: Xử lý việc chuyển sang "trang" Fingerprinting mà KHÔNG
 *         reload lại trang, bằng cách dùng history.pushState().
 *         Đây gọi là điều hướng kiểu SPA (Single Page Application):
 *         thật ra chỉ có 1 trang HTML (index.html) chứa 2 khối nội
 *         dung (2 "view"), và ta dùng JS để ẩn/hiện khối tương ứng.
 * ==========================================================
 */


/* ----------------------------------------------------------
 * BƯỚC 0: Lấy ra 2 khối <main> trong file index.html
 * ---------------------------------------------------------- */
var homeView = document.getElementById('home-view');
var fingerprintView = document.getElementById('fingerprint-view');


/* ----------------------------------------------------------
 * BƯỚC 1: Tạo 1 object để lưu tạm dữ liệu BOM
 * ----------------------------------------------------------
 * Ta gọi hàm collectStaticBOMInfo() (nằm trong common.js) để lấy
 * các thông tin lấy được ngay lập tức, rồi thêm vào field "location"
 * (vị trí) với giá trị tạm thời, vì vị trí phải chờ xin quyền mới có.
 * ---------------------------------------------------------- */
var bomData = collectStaticBOMInfo();
bomData.location = 'Đang lấy vị trí…';


/* ----------------------------------------------------------
 * BƯỚC 2: Hàm hiển thị dữ liệu trong bomData lên các thẻ HTML
 * ----------------------------------------------------------
 * Mỗi lần bomData thay đổi (ví dụ: vừa lấy được vị trí, hoặc
 * mạng vừa bị mất), ta gọi lại hàm này để cập nhật giao diện.
 * ---------------------------------------------------------- */
function renderHomeCards() {
  document.getElementById('geo-value').textContent = bomData.location;
  document.getElementById('browser-value').textContent = bomData.browser;
  document.getElementById('os-value').textContent = bomData.os;
  document.getElementById('lang-value').textContent = bomData.languages;
  document.getElementById('screen-value').textContent = bomData.screenSize;
  document.getElementById('orientation-value').textContent = bomData.orientation;

  var dotEl = document.getElementById('online-dot');
  var textEl = document.getElementById('online-text');
  renderOnlineStatus(dotEl, textEl, bomData.online);
}

// Gọi ngay 1 lần khi trang vừa load, để hiển thị dữ liệu ban đầu
renderHomeCards();


/* ----------------------------------------------------------
 * BƯỚC 3: Xin vị trí người dùng (bất đồng bộ)
 * ----------------------------------------------------------
 * Vì đây là API bất đồng bộ, code sẽ KHÔNG dừng lại chờ ở đây.
 * Trang vẫn tiếp tục chạy các dòng code phía dưới, và khi nào
 * trình duyệt trả lời xong (thành công hoặc thất bại), 1 trong
 * 2 hàm bên dưới mới được gọi.
 * ---------------------------------------------------------- */
requestGeolocation(
  // Nếu lấy vị trí THÀNH CÔNG
  function (locationText) {
    bomData.location = locationText;
    renderHomeCards(); // cập nhật lại giao diện với vị trí mới
  },
  // Nếu lấy vị trí THẤT BẠI
  function (errorText) {
    bomData.location = errorText;
    renderHomeCards();
  }
);


/* ----------------------------------------------------------
 * BƯỚC 4: Lắng nghe khi mạng có/mất kết nối
 * ----------------------------------------------------------
 * window sẽ tự bắn ra sự kiện 'online' khi máy có mạng trở lại,
 * và sự kiện 'offline' khi mất mạng. Ta lắng nghe 2 sự kiện này
 * để cập nhật lại chấm tròn Online/Offline ngay lập tức.
 * ---------------------------------------------------------- */
window.addEventListener('online', function () {
  bomData.online = true;
  renderHomeCards();
});

window.addEventListener('offline', function () {
  bomData.online = false;
  renderHomeCards();
});


/* ----------------------------------------------------------
 * BƯỚC 5: Lắng nghe khi người dùng xoay màn hình / đổi kích thước
 * cửa sổ trình duyệt, để cập nhật lại 2 thông tin liên quan.
 * ---------------------------------------------------------- */
window.addEventListener('resize', function () {
  bomData.screenSize = getScreenSize();
  bomData.orientation = getOrientation();
  renderHomeCards();
});


/* ============================================================
 * PHẦN 2: CHUYỂN SANG VIEW "FINGERPRINTING" KIỂU SPA
 * ============================================================ */

/* ----------------------------------------------------------
 * Hàm hiển thị lại view trang chủ (dùng khi bấm Back)
 * ---------------------------------------------------------- */
function showHomeView() {
  fingerprintView.classList.add('hidden');     // ẩn view fingerprint
  homeView.classList.remove('hidden');         // hiện view trang chủ
  homeView.classList.add('view-fade');         // thêm hiệu ứng fade nhẹ
}


/* ----------------------------------------------------------
 * Hàm hiển thị view Fingerprinting, dựa vào dữ liệu "state"
 * được truyền vào (state chính là bomData tại thời điểm bấm nút)
 * ---------------------------------------------------------- */
function showFingerprintView(state) {
  homeView.classList.add('hidden');
  fingerprintView.classList.remove('hidden');
  fingerprintView.classList.add('view-fade');

  // Ghép state thành 1 chuỗi fingerprint và hiển thị lên trang
  var fingerprintText = buildFingerprintString(state);
  document.getElementById('fingerprint-string').textContent = fingerprintText;

  // Object này dùng để gán "nhãn tiếng Việt dễ hiểu" cho từng field
  var labels = {
    location: 'Vị trí',
    online: 'Trạng thái',
    browser: 'Trình duyệt',
    os: 'Hệ điều hành',
    languages: 'Ngôn ngữ',
    screenSize: 'Kích thước màn hình',
    orientation: 'Hướng màn hình'
  };

  var fieldsEl = document.getElementById('fingerprint-fields');
  fieldsEl.innerHTML = ''; // xóa nội dung cũ (nếu có) trước khi vẽ lại

  // Duyệt qua từng key trong labels để tạo ra từng thẻ <div> hiển thị
  var keys = Object.keys(labels);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var label = labels[key];

    var value;
    if (key === 'online') {
      value = state.online ? 'Online' : 'Offline';
    } else {
      value = state[key];
    }

    var cardHtml =
      '<div class="bg-surface border border-edge rounded-lg px-4 py-3">' +
        '<p class="text-xs text-muted mb-1">' + label + '</p>' +
        '<p class="font-data text-sm text-slate-100 break-words">' + value + '</p>' +
      '</div>';

    fieldsEl.insertAdjacentHTML('beforeend', cardHtml);
  }
}


/* ----------------------------------------------------------
 * Hàm được gọi khi người dùng bấm nút "Xem Fingerprinting"
 * ----------------------------------------------------------
 * Đây là bước quan trọng nhất của yêu cầu bài tập:
 *   history.pushState(state, title, url)
 * sẽ:
 *   1. Lưu "state" (dữ liệu) vào lịch sử trình duyệt
 *   2. Đổi địa chỉ trên thanh URL thành "fingerprint.html"
 *   3. KHÔNG load lại trang (không mất dữ liệu JS đang chạy)
 * ---------------------------------------------------------- */
function goToFingerprint() {

  // Tạo 1 object state mới, copy toàn bộ dữ liệu từ bomData sang
  var state = {
    fingerprint: true,     // đánh dấu để sau này biết đây là state của trang fingerprint
    location: bomData.location,
    online: bomData.online,
    browser: bomData.browser,
    os: bomData.os,
    languages: bomData.languages,
    screenSize: bomData.screenSize,
    orientation: bomData.orientation
  };

  // Đổi URL + lưu state, không reload trang
  history.pushState(state, 'Fingerprinting', 'fingerprint.html');

  // Hiển thị view fingerprint ngay lập tức với dữ liệu vừa tạo
  showFingerprintView(state);
}


// Gắn sự kiện click cho nút ở khối "Xem dấu vân tay trình duyệt"
document.getElementById('go-fingerprint-btn').addEventListener('click', goToFingerprint);

// Gắn sự kiện click cho link "Fingerprinting" trên thanh menu (làm y hệt)
document.getElementById('nav-fingerprint-btn').addEventListener('click', goToFingerprint);

// Nút "Quay lại trang chủ" trong view fingerprint: gọi history.back()
// giống hệt như khi người dùng bấm nút Back của trình duyệt.
document.getElementById('back-home-btn').addEventListener('click', function () {
  history.back();
});


/* ----------------------------------------------------------
 * BƯỚC QUAN TRỌNG: Lắng nghe sự kiện 'popstate'
 * ----------------------------------------------------------
 * Sự kiện này tự động được trình duyệt bắn ra khi người dùng
 * bấm nút Back hoặc Forward (hoặc khi ta gọi history.back()).
 *
 * event.state chính là dữ liệu ta đã truyền vào lúc pushState().
 * - Nếu event.state có tồn tại và có field "fingerprint" = true,
 *   nghĩa là ta đang quay lại/tiến tới trang fingerprint.
 * - Nếu event.state là null, nghĩa là ta đang ở trang gốc (trang chủ).
 * ---------------------------------------------------------- */
window.addEventListener('popstate', function (event) {
  if (event.state && event.state.fingerprint) {
    showFingerprintView(event.state);
  } else {
    showHomeView();
  }
});