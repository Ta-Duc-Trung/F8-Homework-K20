// Component này KHÔNG hiển thị gì cả (return null) - nó chỉ có 1 nhiệm vụ:
// mỗi khi URL đổi, tự động cuộn trang về đầu.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // useLocation() cho biết URL hiện tại. pathname sẽ đổi mỗi khi chuyển trang.
  const { pathname } = useLocation();

  useEffect(() => {
    // useEffect này sẽ chạy lại mỗi khi "pathname" thay đổi giá trị
    // (nhờ có [pathname] trong mảng dependency bên dưới)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // component này không cần vẽ ra HTML gì cả
}