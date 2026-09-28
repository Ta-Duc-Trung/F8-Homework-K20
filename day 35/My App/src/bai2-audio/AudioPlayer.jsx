import { useRef, useState } from 'react';
import { btn, btnPrimary, card } from '../styles';

// File nhạc online miễn phí dùng để test.
// Muốn dùng nhạc local: bỏ file .mp3 vào thư mục /public rồi đổi SRC thành '/ten-file.mp3'
const SONG = {
  title: 'SoundHelix Song 1',
  src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

const VOLUME_STEP = 0.1; // mỗi lần bấm tăng/giảm 10%

function AudioPlayer() {
  // =================================================================
  // useRef: tạo một "cái hộp" để giữ tham chiếu tới thẻ <audio> thật trong DOM.
  // Sau khi render, audioRef.current chính là phần tử <audio>
  // -> gọi được các hàm có sẵn: .play(), .pause(), .muted, .volume ...
  // =================================================================
  const audioRef = useRef(null);

  // State CHỈ dùng để HIỂN THỊ trạng thái lên màn hình.
  // Việc điều khiển thật sự luôn đi qua audioRef.current.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); // 0 -> 1 (0% -> 100%)

  const handlePlay = () => {
    // play() trả về Promise, có thể lỗi (mất mạng, link hỏng...) nên cần catch
    audioRef.current.play().catch((err) => {
      alert('Không phát được nhạc: ' + err.message);
    });
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted; // đảo trạng thái tắt tiếng
    setIsMuted(audio.muted); // cập nhật để giao diện hiển thị đúng
  };

  // Hàm chung để đổi âm lượng, luôn giữ trong khoảng 0 -> 1
  const changeVolume = (delta) => {
    const audio = audioRef.current;
    let newVolume = audio.volume + delta;

    // Kẹp giá trị: volume của <audio> chỉ chấp nhận 0 -> 1, ngoài khoảng sẽ báo lỗi
    newVolume = Math.min(1, Math.max(0, newVolume));
    // Làm tròn 1 chữ số thập phân (tránh lỗi số thực kiểu 0.30000000004)
    newVolume = Math.round(newVolume * 10) / 10;

    audio.volume = newVolume;
    setVolume(newVolume);
  };

  // Chữ mô tả trạng thái hiện tại
  let statusText = isPlaying ? '▶️ Đang phát' : '⏸️ Đã dừng';
  if (isMuted) statusText += ' · 🔇 Tắt tiếng';

  return (
    <div className={card}>
      <h3 className="mb-3 text-lg font-bold">🎵 Audio Player</h3>

      {/*
        Thẻ <audio> KHÔNG có thuộc tính `controls`
        -> trình duyệt sẽ không hiện thanh điều khiển mặc định.
        onPlay / onPause / onEnded: sự kiện do chính thẻ audio phát ra,
        dùng để đồng bộ state (ví dụ bài hát tự hết thì cũng hiện "Đã dừng").
      */}
      <audio
        ref={audioRef}
        src={SONG.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <p className="font-semibold">Bài hát: {SONG.title}</p>
      <p className="my-2 text-gray-600">{statusText}</p>
      <p className="my-2 text-gray-600">Âm lượng: {Math.round(volume * 100)}%</p>

      <div className="flex flex-wrap gap-2">
        <button className={btnPrimary} onClick={handlePlay} disabled={isPlaying}>
          ▶ Play
        </button>
        <button className={btn} onClick={handlePause} disabled={!isPlaying}>
          ⏸ Pause
        </button>
        <button className={btn} onClick={handleToggleMute}>
          {isMuted ? '🔊 Unmute' : '🔇 Mute'}
        </button>
        <button className={btn} onClick={() => changeVolume(-VOLUME_STEP)} disabled={volume <= 0}>
          🔉 Giảm
        </button>
        <button className={btn} onClick={() => changeVolume(VOLUME_STEP)} disabled={volume >= 1}>
          🔊 Tăng
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;