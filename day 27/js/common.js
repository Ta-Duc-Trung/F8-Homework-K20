
function detectBrowserName(userAgentString) {

  if (!userAgentString) {
    userAgentString = navigator.userAgent;
  }

  if (userAgentString.includes('Edg/')) {
    return 'Microsoft Edge';
  }

  if (userAgentString.includes('OPR/') || userAgentString.includes('Opera')) {
    return 'Opera';
  }

  if (userAgentString.includes('Firefox/')) {
    return 'Mozilla Firefox';
  }

  if (userAgentString.includes('Chrome/') && !userAgentString.includes('Edg/')) {
    return 'Google Chrome';
  }

  if (userAgentString.includes('Safari/') && !userAgentString.includes('Chrome/')) {
    return 'Safari';
  }

  return 'Không xác định';
}

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

function getLanguages() {
  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages.join(', ');
  }

  return navigator.language || 'Không xác định';
}

function getScreenSize() {
  var width = screen.width;
  var height = screen.height;
  return width + ' x ' + height + 'px';
}

function getOrientation() {

  if (screen.orientation && screen.orientation.type) {
    if (screen.orientation.type.indexOf('portrait') !== -1) {
      return 'Dọc (portrait)';
    } else {
      return 'Ngang (landscape)';
    }
  }

  var isPortrait = window.matchMedia('(orientation: portrait)').matches;
  if (isPortrait) {
    return 'Dọc (portrait)';
  } else {
    return 'Ngang (landscape)';
  }
}

function collectStaticBOMInfo() {
  var info = {};
  info.online = navigator.onLine;                             
  info.browser = detectBrowserName(navigator.userAgent);
  info.os = detectOSName(navigator.userAgent, navigator.platform);
  info.languages = getLanguages();
  info.screenSize = getScreenSize();
  info.orientation = getOrientation();
  return info;
}

function requestGeolocation(onSuccess, onError) {
  if (!('geolocation' in navigator)) {
    onError('Trình duyệt không hỗ trợ Geolocation');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude.toFixed(5);   
      var lng = position.coords.longitude.toFixed(5);
      var text = lat + ', ' + lng;
      onSuccess(text);
    },
       function (error) {
      var text = 'Không thể lấy vị trí';
      if (error.code === 1) text = 'Người dùng từ chối quyền truy cập vị trí';
      if (error.code === 2) text = 'Không xác định được vị trí';
      if (error.code === 3) text = 'Hết thời gian chờ lấy vị trí';
      onError(text);
    },
    { enableHighAccuracy: false, timeout: 8000 }
  );
}
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
function renderOnlineStatus(dotEl, textEl, isOnline) {
  if (!dotEl || !textEl) {
    return;
  }
  if (isOnline === true) {
       dotEl.className = 'inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)] animate-pulse-slow';
    textEl.textContent = 'Online';
    textEl.className = 'font-mono text-emerald-400 font-medium';
  } else {
    dotEl.className = 'inline-block w-3 h-3 rounded-full bg-rose-500';
    textEl.textContent = 'Offline';
    textEl.className = 'font-mono text-rose-500 font-medium';
  }
}