import axiosClient from './axiosClient'

// Không try/catch: để lỗi truyền thẳng tới TanStack Query

export async function getCategories() {
  const response = await axiosClient.get('/products/categories')
  return response.data
}

export async function getProducts() {
  const response = await axiosClient.get('/products')
  return response.data.products
}

export async function getProductsByCategory(slug) {
  const response = await axiosClient.get(`/products/category/${slug}`)
  return response.data.products
}

export async function getProductById(id) {
  const response = await axiosClient.get(`/products/${id}`)
  return response.data
}

export async function addProduct(payload) {
  const response = await axiosClient.post('/products/add', payload)
  return response.data
}

export async function updateProduct({ id, ...payload }) {
  const response = await axiosClient.patch(`/products/${id}`, payload)
  return response.data
}