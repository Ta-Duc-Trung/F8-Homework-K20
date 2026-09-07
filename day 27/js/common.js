/**
 * ==========================================================
 * FILE: common.js
 * ==========================================================
 * File này chứa các "hàm dùng chung" — tức là những đoạn code
 * mà cả 3 trang (index.html, campaign.html, fingerprint.html)
 * đều cần dùng tới, nên ta viết 1 lần ở đây rồi include vào
 * cả 3 trang bằng thẻ <script src="js/common.js"></script>.
 *
 * Nội dung chính:
 *  1. Đọc thông tin trình duyệt / hệ điều hành (từ navigator.userAgent)
 *  2. Đọc ngôn ngữ, kích thước màn hình, hướng màn hình
 *  3. Lấy vị trí người dùng (Geolocation API)
 *  4. Ghép tất cả thành 1 chuỗi "fingerprint"
 *  5. Vẽ chấm tròn Online/Offline
 * ==========================================================
 */


/* ----------------------------------------------------------
 * HÀM 1: Đoán tên trình duyệt
 * ----------------------------------------------------------
 * navigator.userAgent là 1 chuỗi text rất dài mà trình duyệt
 * tự gửi kèm, trong đó có chứa tên trình duyệt. Ta chỉ cần
 * kiểm tra xem chuỗi đó có chứa từ khóa nào không.
 *
 * Ví dụ userAgent của Chrome thường chứa chữ "Chrome/"
 * userAgent của Firefox thường chứa chữ "Firefox/"
 * ---------------------------------------------------------- */
function detectBrowserName(userAgentString) {

  // Nếu không truyền vào, tự lấy từ navigator
  if (!userAgentString) {
    userAgentString = navigator.userAgent;
  }

  // includes() dùng để kiểm tra 1 chuỗi có chứa 1 đoạn text khác không
  if (userAgentString.includes('Edg/')) {
    return 'Microsoft Edge';
  }

  if (userAgentString.includes('OPR/') || userAgentString.includes('Opera')) {
    return 'Opera';
  }

  if (userAgentString.includes('Firefox/')) {
    return 'Mozilla Firefox';
  }

  // Lưu ý: Edge cũng có chữ "Chrome/" trong userAgent của nó,
  // nên phải kiểm tra Edge ở TRÊN, và ở đây phải loại trừ Edge ra.
  if (userAgentString.includes('Chrome/') && !userAgentString.includes('Edg/')) {
    return 'Google Chrome';
  }

  // Safari cũng có chữ "Safari/" trong userAgent của Chrome,
  // nên phải loại trừ Chrome ra thì mới chắc chắn là Safari thật.
  if (userAgentString.includes('Safari/') && !userAgentString.includes('Chrome/')) {
    return 'Safari';
  }

  return 'Không xác định';
}


/* ----------------------------------------------------------
 * HÀM 2: Đoán tên hệ điều hành
 * ----------------------------------------------------------
 * Tương tự hàm trên, nhưng kiểm tra các từ khóa của hệ điều hành.
 * ---------------------------------------------------------- */
function detectOSName(userAgentString, platformString) {

  if (!userAgentString) {
    userAgentString = navigator.userAgent;
  }
  if (!platformString) {
    platformString = navigator.platform || '';
  }

  if (userAgentString.indexOf('Windows NT 10') !== -1) {
    return 'Windows 10/11';
  }
  if (userAgentString.indexOf('Windows') !== -1) {
    return 'Windows';
  }
  if (userAgentString.indexOf('Mac OS X') !== -1) {
    return 'macOS';
  }
  if (userAgentString.indexOf('Android') !== -1) {
    return 'Android';
  }
  if (userAgentString.indexOf('iPhone') !== -1 || userAgentString.indexOf('iPad') !== -1) {
    return 'iOS';
  }
  if (userAgentString.indexOf('Linux') !== -1) {
    return 'Linux';
  }

  return platformString || 'Không xác định';
}


/* ----------------------------------------------------------
 * HÀM 3: Lấy danh sách ngôn ngữ của trình duyệt
 * ----------------------------------------------------------
 * navigator.languages là 1 MẢNG (array), ví dụ: ["vi-VN", "en-US"]
 * Ta dùng join(', ') để nối các phần tử trong mảng thành 1 chuỗi,
 * cách nhau bởi dấu phẩy. Kết quả: "vi-VN, en-US"
 * ---------------------------------------------------------- */
function getLanguages() {
  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages.join(', ');
  }
  // Một số trình duyệt cũ chỉ có navigator.language (số ít, không phải mảng)
  return navigator.language || 'Không xác định';
}


/* ----------------------------------------------------------
 * HÀM 4: Lấy kích thước màn hình
 * ---------------------------------------------------------- */
function getScreenSize() {
  var width = screen.width;
  var height = screen.height;
  return width + ' x ' + height + 'px';
}


/* ----------------------------------------------------------
 * HÀM 5: Lấy hướng màn hình (dọc hay ngang)
 * ---------------------------------------------------------- */
function getOrientation() {

  // Cách 1: dùng screen.orientation nếu trình duyệt hỗ trợ
  if (screen.orientation && screen.orientation.type) {
    if (screen.orientation.type.indexOf('portrait') !== -1) {
      return 'Dọc (portrait)';
    } else {
      return 'Ngang (landscape)';
    }
  }

  // Cách 2: nếu trình duyệt không hỗ trợ screen.orientation,
  // ta dùng matchMedia để tự kiểm tra chiều rộng/cao màn hình
  var isPortrait = window.matchMedia('(orientation: portrait)').matches;
  if (isPortrait) {
    return 'Dọc (portrait)';
  } else {
    return 'Ngang (landscape)';
  }
}


/* ----------------------------------------------------------
 * HÀM 6: Gom tất cả thông tin "tĩnh" (lấy được ngay lập tức,
 * không cần chờ đợi gì) vào 1 object.
 *
 * Lưu ý: KHÔNG gồm vị trí (geolocation), vì lấy vị trí cần xin
 * quyền người dùng và phải chờ (bất đồng bộ - asynchronous),
 * nên ta xử lý riêng ở hàm requestGeolocation() bên dưới.
 * ---------------------------------------------------------- */
function collectStaticBOMInfo() {
  var info = {};
  info.online = navigator.onLine;                              // true/false
  info.browser = detectBrowserName(navigator.userAgent);
  info.os = detectOSName(navigator.userAgent, navigator.platform);
  info.languages = getLanguages();
  info.screenSize = getScreenSize();
  info.orientation = getOrientation();
  return info;
}


/* ----------------------------------------------------------
 * HÀM 7: Xin phép và lấy vị trí (tọa độ) người dùng
 * ----------------------------------------------------------
 * Đây là API BẤT ĐỒNG BỘ (asynchronous) — nghĩa là khi gọi hàm
 * này, trình duyệt sẽ hiện popup xin quyền, và ta KHÔNG BIẾT
 * ngay lập tức kết quả là gì. Ta phải truyền vào 2 hàm callback:
 *   - onSuccess: sẽ được gọi khi lấy vị trí thành công
 *   - onError:   sẽ được gọi khi lấy vị trí thất bại / bị từ chối
 * ---------------------------------------------------------- */
function requestGeolocation(onSuccess, onError) {

  // Kiểm tra trình duyệt có hỗ trợ Geolocation không
  if (!('geolocation' in navigator)) {
    onError('Trình duyệt không hỗ trợ Geolocation');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    // Hàm này chạy khi LẤY THÀNH CÔNG
    function (position) {
      var lat = position.coords.latitude.toFixed(5);   // làm tròn 5 số thập phân
      var lng = position.coords.longitude.toFixed(5);
      var text = lat + ', ' + lng;
      onSuccess(text);
    },
    // Hàm này chạy khi LẤY THẤT BẠI (vd: người dùng bấm "Từ chối")
    function (error) {
      var text = 'Không thể lấy vị trí';
      if (error.code === 1) text = 'Người dùng từ chối quyền truy cập vị trí';
      if (error.code === 2) text = 'Không xác định được vị trí';
      if (error.code === 3) text = 'Hết thời gian chờ lấy vị trí';
      onError(text);
    },
    // Tùy chọn thêm
    { enableHighAccuracy: false, timeout: 8000 }
  );
}


/* ----------------------------------------------------------
 * HÀM 8: Ghép các thông tin thành 1 chuỗi fingerprint duy nhất
 * ----------------------------------------------------------
 * "Nối chuỗi" đơn giản là dùng dấu + để ghép nhiều chuỗi lại
 * thành 1 chuỗi dài. Ví dụ: "Xin " + "chào" = "Xin chào"
 * ---------------------------------------------------------- */
function buildFingerprintString(data) {

  var onlineText = data.online ? 'true' : 'false';

  var result = '';
  result = result + 'LOC(' + data.location + ')';
  result = result + ' | ONLINE(' + onlineText + ')';
  result = result + ' | BROWSER(' + data.browser + ')';
  result = result + ' | OS(' + data.os + ')';
  result = result + ' | LANG(' + data.languages + ')';
  result = result + ' | SCREEN(' + data.screenSize + ')';
  result = result + ' | ORIENT(' + data.orientation + ')';

  return result;
}


/* ----------------------------------------------------------
 * HÀM 9: Đổi màu + chữ cho chấm tròn Online/Offline
 * ----------------------------------------------------------
 * dotEl  = phần tử <span> đóng vai trò chấm tròn
 * textEl = phần tử chứa chữ "Online"/"Offline"
 * isOnline = true hoặc false
 * ---------------------------------------------------------- */
function renderOnlineStatus(dotEl, textEl, isOnline) {

  // Nếu vì lý do gì đó không tìm thấy phần tử thì dừng lại, tránh lỗi
  if (!dotEl || !textEl) {
    return;
  }

  if (isOnline === true) {
    // className ở đây là các class Tailwind để tô màu xanh + hiệu ứng nhấp nháy
    dotEl.className = 'inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)] animate-pulse-slow';
    textEl.textContent = 'Online';
    textEl.className = 'font-mono text-emerald-400 font-medium';
  } else {
    dotEl.className = 'inline-block w-3 h-3 rounded-full bg-rose-500';
    textEl.textContent = 'Offline';
    textEl.className = 'font-mono text-rose-500 font-medium';
  }
}