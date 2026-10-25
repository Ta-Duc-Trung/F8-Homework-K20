import AudioPlayer from './AudioPlayer';
import Stopwatch from './Stopwatch';

function AudioPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <AudioPlayer />
      <Stopwatch />
    </div>
  );
}

export default AudioPage;