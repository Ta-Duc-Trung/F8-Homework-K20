import { lazy, Suspense, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { getProductById } from '@/api/productApi'
import { queryKeys } from '@/api/queryKeys'

// Khai báo lazy NGOÀI component (đặt trong component sẽ bị tạo lại mỗi lần render)
const ProductReviews = lazy(() => import('./ProductReviews'))

const PRODUCT_ID = 1
const STORE_NAME = 'Đức Store'

function ProductDetail() {
  const [showReviews, setShowReviews] = useState(false)

  const { data: product, isPending, isError, error, refetch } = useQuery({
    queryKey: queryKeys.product(PRODUCT_ID), // ["product", 1]
    queryFn: () => getProductById(PRODUCT_ID),
  })

  return (
    <section className="space-y-6">
      {/* Tên cửa hàng luôn hiển thị */}
      <h2 className="text-2xl font-semibold">{STORE_NAME}</h2>

      {/* Trạng thái tải DỮ LIỆU API → isPending */}
      {isPending ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          Đang tải thông tin sản phẩm...
        </p>
      ) : isError ? (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <span>Không tải được sản phẩm: {error.message}</span>
          <Button type="button" size="sm" variant="outline" onClick={() => refetch()}>
            Thử lại
          </Button>
        </div>
      ) : (
        <>
          <article className="grid gap-6 rounded-lg border p-4 md:grid-cols-[280px_1fr]">
            <img
              src={product.thumbnail}
              alt={`Ảnh sản phẩm ${product.title}`}
              className="aspect-square w-full rounded-md bg-muted object-cover"
            />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-lg font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <Button type="button" onClick={() => setShowReviews((prev) => !prev)}>
                {showReviews ? 'Ẩn đánh giá' : 'Xem đánh giá'}
              </Button>
            </div>
          </article>

          {/* Trạng thái tải CODE component → Suspense, chỉ bọc riêng phần đánh giá */}
          {showReviews && (
            <div className="rounded-lg border p-4">
              <Suspense
                fallback={<p className="text-sm text-muted-foreground">Đang tải giao diện đánh giá...</p>}
              >
                <ProductReviews reviews={product.reviews ?? []} />
              </Suspense>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ProductDetail