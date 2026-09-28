import { useRef, useState } from 'react';
import Modal from './Modal';
import { btnPrimary, card } from '../styles';

// Component CHA.
// Lưu ý: ở đây KHÔNG có state isOpen nào cả!
// Cha chỉ giữ một ref trỏ tới Modal và gọi modalRef.current.open().
function TermsPage() {
  const modalRef = useRef(null);

  // State này là của riêng cha (lưu kết quả đồng ý), KHÔNG phải trạng thái mở/đóng modal
  const [agreed, setAgreed] = useState(false);

  const handleOpenModal = () => {
    modalRef.current.open();
  };

  return (
    <div className={card}>
      <h3 className="mb-3 text-lg font-bold">📜 Điều khoản sử dụng</h3>

      <button className={btnPrimary} onClick={handleOpenModal}>
        Mở bảng điều khoản
      </button>

      <p className="my-2 text-gray-600">
        {agreed ? '✅ Bạn đã đồng ý với điều khoản.' : '⏳ Bạn chưa đồng ý điều khoản.'}
      </p>

      {/* Gắn ref vào Modal. Nhờ useImperativeHandle,
          modalRef.current = { open, close } */}
      <Modal ref={modalRef} title="Điều khoản sử dụng" onAgree={() => setAgreed(true)}>
        {/* Tailwind xóa kiểu mặc định của <ol>, nên thêm list-decimal + pl-5 để hiện số thứ tự */}
        <ol className="list-decimal space-y-1 pl-5">
          <li>Bạn phải cung cấp thông tin chính xác khi đăng ký tài khoản.</li>
          <li>Không sử dụng dịch vụ cho mục đích vi phạm pháp luật.</li>
          <li>Chúng tôi có quyền cập nhật điều khoản và sẽ thông báo trước.</li>
          <li>Thông tin cá nhân của bạn được bảo mật theo chính sách riêng tư.</li>
        </ol>
      </Modal>
    </div>
  );
}

export default TermsPage;