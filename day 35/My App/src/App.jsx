import { useState } from 'react';
import ShopPage from './bai1-shop/ShopPage';
import AudioPage from './bai2-audio/AudioPage';
import TermsPage from './bai3-modal/TermsPage';

// App chỉ làm 1 việc: cho phép chuyển qua lại giữa 3 bài bằng tab.
const TABS = [
  { id: 1, label: 'Bài 1: Giỏ hàng (useReducer + useContext)' },
  { id: 2, label: 'Bài 2: Audio & Stopwatch (useRef)' },
  { id: 3, label: 'Bài 3: Modal (useImperativeHandle)' },
];

function App() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">
      <div className="mx-auto max-w-6xl p-4">
        <nav className="mb-5 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              // Tab đang chọn: nền tím chữ trắng. Tab khác: nền trắng.
              className={
                'cursor-pointer rounded-lg border px-3.5 py-2.5 text-sm ' +
                (activeTab === tab.id
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300 bg-white hover:bg-gray-100')
              }
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main>
          {activeTab === 1 && <ShopPage />}
          {activeTab === 2 && <AudioPage />}
          {activeTab === 3 && <TermsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;