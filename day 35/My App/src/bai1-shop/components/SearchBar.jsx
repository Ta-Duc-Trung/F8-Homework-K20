import { useShop, ACTIONS } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

// Class chung cho ô input và select
const fieldClass =
  'rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none focus:border-indigo-500';

// Ô tìm kiếm + dropdown chọn danh mục.
// Component này KHÔNG có state riêng: giá trị lấy từ context,
// khi người dùng thay đổi thì dispatch action SET_FILTER.
function SearchBar() {
  const { keyword, category, dispatch } = useShop();

  const handleKeywordChange = (e) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { keyword: e.target.value } });
  };

  const handleCategoryChange = (e) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { category: e.target.value } });
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="🔍 Tìm sản phẩm theo tên..."
        value={keyword}
        onChange={handleKeywordChange}
        className={`${fieldClass} flex-1`}
      />

      <select value={category} onChange={handleCategoryChange} className={fieldClass}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;