const BASE_URL = 'https://dummyjson.com'

// Lấy danh sách tên danh mục → mảng chuỗi
export async function getCategoryList({ signal } = {}) {
  const response = await fetch(`${BASE_URL}/products/category-list`, { signal })

  if (!response.ok) {
    throw new Error(`Tải danh mục thất bại (HTTP ${response.status})`)
  }

  return response.json()
}

// Lấy sản phẩm theo danh mục → mảng products
export async function getProductsByCategory(categoryName, { signal } = {}) {
  const response = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(categoryName)}`,
    { signal }
  )

  if (!response.ok) {
    throw new Error(`Tải sản phẩm của danh mục "${categoryName}" thất bại (HTTP ${response.status})`)
  }

  const data = await response.json()
  return data.products
}