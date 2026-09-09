import Badge from "./Badge.jsx";

const currencyFormatter = new Intl.NumberFormat("vi-VN");
const formatPrice = (value) => `${currencyFormatter.format(value)}đ`;

function ProductItem({ product, onAddToCart }) {
    const { name, price, image, inStock, discountPercent } = product;
    const hasDiscount = discountPercent > 0;
    const finalPrice = hasDiscount
        ? Math.round(price - (price * discountPercent) / 100)
        : price;

    const handleAddToCart = () => {
        onAddToCart(name, finalPrice);
    };

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition-opacity ${
                !inStock ? "opacity-55" : ""
            }`}
        >
            <div className="relative aspect-[4/3] bg-slate-100">
                <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={name}
                />
                <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
                    {hasDiscount && (
                        <Badge type="discount">
                            Giảm giá {discountPercent}%
                        </Badge>
                    )}
                    {!inStock && <Badge type="outOfStock">Hết hàng</Badge>}
                </div>
            </div>

            <div className="flex flex-col gap-2 px-4 pb-4 pt-3.5">
                <h3 className="min-h-[2.6em] text-[0.98rem] font-semibold text-slate-900">
                    {name}
                </h3>

                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-teal-700">
                        {formatPrice(finalPrice)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-slate-400 line-through">
                            {formatPrice(price)}
                        </span>
                    )}
                </div>

                <button
                    className="mt-1.5 rounded-md bg-teal-700 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:enabled:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    disabled={!inStock}
                    onClick={handleAddToCart}
                >
                    {inStock ? "Thêm vào giỏ" : "Hết hàng"}
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
