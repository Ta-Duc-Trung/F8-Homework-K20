import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { getCategories, getProducts, getProductsByCategory } from '@/api/productApi'
import { queryKeys } from '@/api/queryKeys'

const ALL = 'all'

function StatusBox({ children, tone = 'muted' }) {
  const toneClass =
    tone === 'error'
      ? 'border-destructive/40 bg-destructive/5 text-destructive'
      : 'border-dashed text-muted-foreground'
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-lg border p-4 text-sm ${toneClass}`}>
      {children}
    </div>
  )
}

function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState(ALL)

  // Query danh mục
  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  })

  // Query sản phẩm: key chứa danh mục đang chọn
  const productsQuery = useQuery({
    queryKey: queryKeys.catalog(selectedCategory),
    queryFn: () =>
      selectedCategory === ALL ? getProducts() : getProductsByCategory(selectedCategory),
  })

  const categories = categoriesQuery.data ?? []
  const products = productsQuery.data ?? []
  const selectedName =
    selectedCategory === ALL
      ? 'Tất cả'
      : categories.find((c) => c.slug === selectedCategory)?.name ?? selectedCategory

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">Danh mục sản phẩm</h2>
        <p className="text-sm text-muted-foreground">Chọn danh mục để lọc sản phẩm.</p>
      </header>

      {/* ===== Khu vực danh mục ===== */}
      <div>
        {categoriesQuery.isPending ? (
          <StatusBox>Đang tải danh mục...</StatusBox>
        ) : categoriesQuery.isError ? (
          <StatusBox tone="error">
            <span>Không tải được danh mục: {categoriesQuery.error.message}</span>
            <Button type="button" size="sm" variant="outline" onClick={() => categoriesQuery.refetch()}>
              Thử lại
            </Button>
          </StatusBox>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={selectedCategory === ALL ? 'default' : 'outline'}
              aria-pressed={selectedCategory === ALL}
              onClick={() => setSelectedCategory(ALL)}
            >
              Tất cả
            </Button>
            {categories.length === 0 && (
              <span className="self-center text-sm text-muted-foreground">Chưa có danh mục.</span>
            )}
            {categories.map((category) => (
              <Button
                key={category.slug}
                type="button"
                size="sm"
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                aria-pressed={selectedCategory === category.slug}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* ===== Khu vực sản phẩm ===== */}
      <div className="space-y-3">
        <h3 className="font-medium">
          Đang xem: <span className="text-primary">{selectedName}</span>
          {productsQuery.isSuccess && (
            <span className="text-muted-foreground"> ({products.length} sản phẩm)</span>
          )}
        </h3>

        {productsQuery.isPending ? (
          <StatusBox>Đang tải sản phẩm...</StatusBox>
        ) : productsQuery.isError ? (
          <StatusBox tone="error">
            <span>Không tải được sản phẩm: {productsQuery.error.message}</span>
            <Button type="button" size="sm" variant="outline" onClick={() => productsQuery.refetch()}>
              Thử lại
            </Button>
          </StatusBox>
        ) : products.length === 0 ? (
          <StatusBox>Không có sản phẩm nào trong danh mục này.</StatusBox>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id} className="overflow-hidden rounded-lg border">
                <img
                  src={product.thumbnail}
                  alt={`Ảnh sản phẩm ${product.title}`}
                  loading="lazy"
                  className="aspect-square w-full bg-muted object-cover"
                />
                <div className="space-y-1 p-3">
                  <p className="line-clamp-2 text-sm font-medium">{product.title}</p>
                  <p className="text-sm font-semibold">${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default ProductCatalog