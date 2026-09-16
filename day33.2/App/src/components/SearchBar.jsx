// Component "câm" - chỉ nhận value hiện tại + hàm onChange từ cha truyền xuống
// Bản thân nó không tự quản lý state searchTerm (state đó nằm ở App.jsx)
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Tìm kiếm sản phẩm..."
      className="w-full border rounded-lg px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );
}

export default SearchBar;