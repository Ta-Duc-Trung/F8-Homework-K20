import { useRef, useState, useEffect } from 'react';
import { btn, btnPrimary, btnDanger, card } from '../styles';

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (intervalRef.current !== null) return; 

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };
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