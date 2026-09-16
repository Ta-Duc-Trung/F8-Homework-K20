import { useState, useEffect } from 'react';
import UserProfileCard from './components/UserProfileCard.jsx';

function App() {
  const [userId, setUserId] = useState(1); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    let isCancelled = false;
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/users/${userId}`);

        if (!res.ok) {
          throw new Error(`Không tìm thấy user với ID ${userId}`);
        }

        const data = await res.json();
// Cập nhật state chỉ khi effect chưa bị hủy
        if (!isCancelled) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Đã có lỗi xảy ra khi gọi API');
          setUser(null);
          setLoading(false);
        }
      }
    }

    fetchUser();
    return () => {
      isCancelled = true;
    };
  }, [userId]);
  // ----- Xử lý nút chuyển user -----
  const handlePrevUser = () => {
    setUserId((prev) => Math.max(1, prev - 1)); // không cho xuống dưới 1
  };

  const handleNextUser = () => {
    setUserId((prev) => prev + 1);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 text-center bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-5">
        Single User Profile Card
      </h1>

      {/* Nút điều hướng */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          className="px-3.5 py-2 rounded-md bg-indigo-600 text-white text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrevUser}
          disabled={userId <= 1}
        >
          ⬅ User Trước
        </button>
        <span className="font-bold text-gray-700">User ID: {userId}</span>
        <button
          className="px-3.5 py-2 rounded-md bg-indigo-600 text-white text-sm"
          onClick={handleNextUser}
        >
          User Tiếp Theo ➡
        </button>
      </div>
{/* Render */}
      {loading && (
        <p className="text-indigo-600 font-medium">Đang tải dữ liệu người dùng...</p>
      )}

      {!loading && error && (
        <p className="text-red-600 font-medium">⚠ Lỗi: {error}</p>
      )}

      {!loading && !error && user && <UserProfileCard user={user} />}
    </div>
  );
}

export default App;