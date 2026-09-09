function Badge({ type = 'discount', children }) {
  const variantClass =
    type === 'outOfStock'
      ? 'bg-rose-50 text-rose-600'
      : type === 'hot'
      ? 'bg-rose-50 text-rose-600'
      : 'bg-amber-50 text-amber-700'

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClass}`}>
      {children}
    </span>
  )
}

export default Badge