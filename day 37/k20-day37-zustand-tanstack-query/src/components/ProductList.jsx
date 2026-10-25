import { useQuery } from '@tanstack/react-query'
import { getProductsByCategory } from '../api/productApi'
import { useCartStore } from '../store/useCartStore'

function ProductList({ selectedCategory }) {
  // Selector: chỉ lấy action cần dùng
  const addToCart = useCartStore((state) => state.addToCart)

  // useQuery 2: sản phẩm, key chứa danh mục đang chọn
  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: ({ signal }) => getProductsByCategory(selectedCategory, { signal }),
    enabled: Boolean(selectedCategory), // chưa chọn → không chạy
  })

  let content
  // Thứ tự quan trọng: xử lý "chưa chọn" TRƯỚC isPending
  if (!selectedCategory) {
    content = <p className="text-gray-500">Vui lòng chọn danh mục</p>
  } else if (isPending) {
    content = <p className="text-gray-500">Đang tải...</p>
  } else if (isError) {
    content = <p className="text-red-600">{error.message}</p>
  } else if (products.length === 0) {
    content = <p className="text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
  } else {
    content = (
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col overflow-hidden rounded-lg border">
            <img
              src={product.thumbnail}
              alt={`Ảnh sản phẩm ${product.title}`}
              loading="lazy"
              className="aspect-square w-full bg-gray-100 object-cover"
            />
            <div className="flex flex-1 flex-col gap-2 p-3">
              <p className="line-clamp-2 text-sm font-medium">{product.title}</p>
              <p className="font-semibold">${product.price}</p>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-auto rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                Thêm vào giỏ
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="font-semibold capitalize">
        {selectedCategory ? selectedCategory.replaceAll('-', ' ') : 'Sản phẩm'}
      </h2>
      {content}
    </section>
  )
}

export default ProductList