export const queryKeys = {
  categories: ['categories'],
  catalog: (selectedCategory) => ['products', 'catalog', selectedCategory],
  products: ['products'],
  product: (id) => ['product', id],
}