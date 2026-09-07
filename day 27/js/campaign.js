/**
 * ==========================================================
 * FILE: campaign.js  (chỉ dùng trong campaign.html)
 * ==========================================================
 * Mục tiêu: đọc các tham số nằm trên URL, ví dụ URL:
 *
 *   campaign.html?utm_source=ta_duc&utm_campaign=campage_1
 *
 * thì phần "?utm_source=ta_duc&utm_campaign=campage_1" được
 * gọi là "query string", và trong JavaScript ta lấy nó ra bằng:
 *
 *   location.search
 *
 * Sau đó dùng URLSearchParams để "bóc tách" từng cặp key=value
 * ra cho dễ đọc, thay vì tự viết code tách chuỗi thủ công.
 * ==========================================================
 */


/* ----------------------------------------------------------
 * BƯỚC 1: Đọc location.search và tạo đối tượng URLSearchParams
 * ----------------------------------------------------------
 * location.search trả về chuỗi dạng: "?utm_source=ta_duc&utm_campaign=campage_1"
 * (bao gồm cả dấu ? ở đầu)
 *
 * new URLSearchParams(...) sẽ biến chuỗi đó thành 1 đối tượng
 * mà ta có thể gọi .get('tên_tham_số') để lấy giá trị ra.
 * ---------------------------------------------------------- */
var searchParams = new URLSearchParams(location.search);

// Lấy giá trị của 2 tham số utm_source và utm_campaign
// Nếu URL không có tham số đó, .get() sẽ trả về null
var sourceValue = searchParams.get('utm_source');
var campaignValue = searchParams.get('utm_campaign');


/* ----------------------------------------------------------
 * BƯỚC 2: Lấy ra 2 phần tử HTML cần hiển thị kết quả
 * ---------------------------------------------------------- */
var paramsBox = document.getElementById('params-box');
var noParamsMessage = document.getElementById('no-params-msg');


/* ----------------------------------------------------------
 * BƯỚC 3: Hàm tạo sẵn 1 "khối" HTML hiển thị 1 cặp label - value
 * ----------------------------------------------------------
 * Viết thành hàm riêng để không phải lặp lại code 2 lần
 * (1 lần cho utm_source, 1 lần cho utm_campaign).
 * ---------------------------------------------------------- */
function createFieldCardHtml(label, value) {
  return (
    '<div class="bg-surface2 border border-edge rounded-lg px-4 py-3">' +
      '<p class="text-xs text-muted mb-1">' + label + '</p>' +
      '<p class="font-data text-base text-accent">' + value + '</p>' +
    '</div>'
  );
}


/* ----------------------------------------------------------
 * BƯỚC 4: Kiểm tra và hiển thị kết quả
 * ----------------------------------------------------------
 * TRƯỜNG HỢP 1: Nếu cả 2 tham số đều không có (đều là null),
 *   nghĩa là người dùng mở thẳng file campaign.html mà không
 *   có query string nào => hiển thị dòng chữ "Không có tham số
 *   quảng cáo" theo đúng yêu cầu đề bài.
 *
 * TRƯỜNG HỢP 2: Nếu có ít nhất 1 trong 2 tham số => hiển thị
 *   ra các "card" tương ứng.
 * ---------------------------------------------------------- */
if (!sourceValue && !campaignValue) {

  // Ẩn khung hiển thị card đi, hiện dòng thông báo thay thế
  paramsBox.classList.add('hidden');
  noParamsMessage.classList.remove('hidden');

} else {

  // Nếu 1 trong 2 giá trị bị thiếu, hiển thị dấu gạch ngang thay thế
  var sourceToShow = sourceValue ? sourceValue : '—';
  var campaignToShow = campaignValue ? campaignValue : '—';

  var html = '';
  html = html + createFieldCardHtml('utm_source (Tên nguồn)', sourceToShow);
  html = html + createFieldCardHtml('utm_campaign (Tên chiến dịch)', campaignToShow);

  paramsBox.innerHTML = html;
}