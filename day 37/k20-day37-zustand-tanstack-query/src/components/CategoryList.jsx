import { useQuery } from '@tanstack/react-query'
import { getCategoryList } from '../api/productApi'

function CategoryList({ selectedCategory, onSelect }) {
  // useQuery 1: danh mục, key riêng
  const { data: categories, isPending, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategoryList({ signal }),
  })

  let content
  if (isPending) {
    content = <p className="text-sm text-gray-500">Đang tải...</p>
  } else if (isError) {
    content = <p className="text-sm text-red-600">{error.message}</p>
  } else if (categories.length === 0) {
    content = <p className="text-sm text-gray-500">Không có danh mục nào.</p>
  } else {
    content = (
      <ul className="flex flex-wrap gap-2 md:flex-col md:flex-nowrap">
        {categories.map((category) => {
          const isActive = category === selectedCategory
          return (
            <li key={category}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category)}
                className={`w-full rounded-md px-3 py-1.5 text-left text-sm capitalize transition ${
                  isActive
                    ? 'bg-blue-600 font-semibold text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.replaceAll('-', ' ')}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <aside className="space-y-3">
      <h2 className="font-semibold">Danh mục</h2>
      {content}
    </aside>
  )
}

export default CategoryList