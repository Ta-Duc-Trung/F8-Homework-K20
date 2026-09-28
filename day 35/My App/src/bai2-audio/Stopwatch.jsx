import { useRef, useState, useEffect } from 'react';
import { btn, btnPrimary, btnDanger, card } from '../styles';

// Đổi mili-giây sang chuỗi "phút:giây.centi-giây", ví dụ 65430 -> "01:05.43"
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function Stopwatch() {
  // time: số mili-giây đã trôi qua -> cần HIỂN THỊ nên dùng useState
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // =================================================================
  // useRef lần này KHÔNG trỏ tới DOM, mà để CẤT GIỮ 1 giá trị:
  // id của setInterval.
  // Vì sao không dùng useState? Vì id này không cần hiện lên màn hình,
  // và đổi ref KHÔNG làm component render lại.
  // Vì sao không dùng biến thường (let id)? Vì mỗi lần render,
  // biến thường bị tạo lại từ đầu -> mất id -> không clearInterval được.
  // =================================================================
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (intervalRef.current !== null) return; // đang chạy rồi thì bỏ qua

    setIsRunning(true);
    // Mỗi 10ms cộng thêm 10ms vào time
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current); // dừng bộ đếm nhờ id đã cất trong ref
    intervalRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  // Dọn dẹp: nếu component bị gỡ khỏi màn hình (chuyển tab) mà đồng hồ
  // vẫn đang chạy thì dừng interval, tránh chạy ngầm tốn tài nguyên.
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={card}>
      <h3 className="mb-3 text-lg font-bold">⏱️ Stopwatch</h3>
      <p className="my-4 text-center font-mono text-5xl">{formatTime(time)}</p>

      <div className="flex flex-wrap justify-center gap-2">
        <button className={btnPrimary} onClick={handleStart} disabled={isRunning}>
          Bắt đầu
        </button>
        <button className={btn} onClick={handleStop} disabled={!isRunning}>
          Dừng
        </button>
        <button className={btnDanger} onClick={handleReset}>
          Đặt lại
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;