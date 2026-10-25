import { forwardRef, useImperativeHandle, useState } from 'react';
import { btn, btnPrimary, overlay, modalBox } from '../styles';

const Modal = forwardRef(function Modal({ title, children, onAgree }, ref) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const handleAgree = () => {
    close(); 
    if (onAgree) onAgree(); 
  };

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