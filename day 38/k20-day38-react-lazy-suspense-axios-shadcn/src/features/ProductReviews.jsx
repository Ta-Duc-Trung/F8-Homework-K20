function Stars({ rating }) {
  const rounded = Math.round(rating)
  return (
    <span aria-label={`${rating} trên 5 sao`} className="text-amber-500">
      {'★'.repeat(rounded)}
      <span className="text-muted-foreground/40">{'★'.repeat(5 - rounded)}</span>
    </span>
  )
}

function ProductReviews({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">Sản phẩm chưa có đánh giá</p>
  }

  return (
    <div className="space-y-3">
      <p className="font-medium">Tổng số đánh giá: {reviews.length}</p>
      <ul className="space-y-3">
        {reviews.map((review, index) => (
          <li key={`${review.reviewerName}-${index}`} className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium">{review.reviewerName}</span>
              <span className="flex items-center gap-2 text-sm">
                <Stars rating={review.rating} />
                <span>{review.rating}/5</span>
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductReviews