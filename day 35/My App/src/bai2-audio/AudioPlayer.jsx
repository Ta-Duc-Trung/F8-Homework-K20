import { useRef, useState } from 'react';
import { btn, btnPrimary, card } from '../styles';

const SONG = {
  title: 'SoundHelix Song 1',
  src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

const VOLUME_STEP = 0.1; 

function AudioPlayer() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1); 

  const handlePlay = () => {
    audioRef.current.play().catch((err) => {
      alert('Không phát được nhạc: ' + err.message);
    });
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted; 
    setIsMuted(audio.muted);
  };

  const changeVolume = (delta) => {
    const audio = audioRef.current;
    let newVolume = audio.volume + delta;

    newVolume = Math.min(1, Math.max(0, newVolume));
    newVolume = Math.round(newVolume * 10) / 10;

    audio.volume = newVolume;
    setVolume(newVolume);
  };

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