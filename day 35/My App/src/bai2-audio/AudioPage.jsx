import AudioPlayer from './AudioPlayer';
import Stopwatch from './Stopwatch';

function AudioPage() {
  return (
    // Màn nhỏ: xếp dọc 1 cột. Màn từ md trở lên: chia 2 cột
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <AudioPlayer />
      <Stopwatch />
    </div>
  );
}

export default AudioPage;