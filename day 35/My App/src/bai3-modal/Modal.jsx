import { forwardRef, useImperativeHandle, useState } from 'react';
import { btn, btnPrimary, overlay, modalBox } from '../styles';

// =====================================================================
// forwardRef: cho phép component cha truyền `ref` vào component con.
// (Bình thường ref không đi qua props được, nên phải bọc forwardRef.)
// Hàm bên trong nhận 2 tham số: (props, ref)
// =====================================================================
const Modal = forwardRef(function Modal({ title, children, onAgree }, ref) {
  // Modal TỰ quản lý trạng thái mở/đóng của chính nó.
  // Component cha không hề biết biến isOpen này tồn tại.
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // ===================================================================
  // useImperativeHandle(ref, () => object)
  // Quyết định: khi cha đọc ref.current thì sẽ nhận được CÁI GÌ.
  // Ở đây ta chỉ "mở cửa" đúng 2 phương thức: open và close.
  // => Cha gọi được modalRef.current.open() / modalRef.current.close()
  //    nhưng KHÔNG đụng được vào isOpen hay setIsOpen.
  // ===================================================================
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const handleAgree = () => {
    close(); // đóng modal
    if (onAgree) onAgree(); // báo cho cha biết người dùng đã đồng ý
  };

  // Đang đóng -> không render gì
  if (!isOpen) return null;

  return (
    <div className={overlay} onClick={close}>
      <div className={`${modalBox} max-w-lg`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="cursor-pointer text-lg" onClick={close}>
            ✕
          </button>
        </div>

        {/* children: nội dung do cha truyền vào giữa <Modal>...</Modal> */}
        <div className="my-3 leading-relaxed">{children}</div>

        <div className="flex justify-end gap-2">
          <button className={btn} onClick={close}>
            Đóng
          </button>
          <button className={btnPrimary} onClick={handleAgree}>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;