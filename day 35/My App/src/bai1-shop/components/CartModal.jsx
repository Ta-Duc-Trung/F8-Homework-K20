import { useShop, ACTIONS } from "../context/ShopContext";
import { formatPrice } from "../data/products";
import { btnDanger, overlay, modalBox } from "../../styles";

// Class cho 2 nút +/- nhỏ
const qtyBtn =
    "h-8 w-8 cursor-pointer rounded-md border border-gray-300 bg-white enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

// Modal giỏ hàng.
// - isOpen / onClose: nhận từ ShopPage (đây chỉ là trạng thái giao diện
//   "đang mở hay đóng", không phải dữ liệu cửa hàng nên không cần đưa vào context).
// - cart / dispatch: lấy từ context.
function CartModal({ isOpen, onClose }) {
    const { cart, dispatch } = useShop();

    // Đang đóng -> không render gì cả
    if (!isOpen) return null;

    // Tính tổng tiền: cộng dồn (giá x số lượng) của từng item
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    // Gửi action cập nhật số lượng (dùng chung cho +, -, và ô input)
    const updateQuantity = (id, quantity) => {
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    };

    const removeItem = (id) => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
    };

    return (
        // Lớp nền mờ. Bấm ra ngoài hộp -> đóng modal
        <div className={overlay} onClick={onClose}>
            {/* stopPropagation: bấm BÊN TRONG hộp thì không bị đóng */}
            <div
                className={`${modalBox} max-w-3xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">🛒 Giỏ hàng</h2>
                    <button
                        className="cursor-pointer text-lg"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {cart.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">
                        Giỏ hàng đang trống.
                    </p>
                ) : (
                    <ul className="my-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-wrap items-center gap-3 border-b border-gray-200 py-2.5"
                            >
                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl"
                                    style={{
                                        backgroundColor: item.thumbnail.color,
                                    }}
                                >
                                    {item.thumbnail.emoji}
                                </div>

                                <div className="flex min-w-36 flex-1 flex-col text-sm">
                                    <strong>{item.name}</strong>
                                    <span>{formatPrice(item.price)}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    {/* Nút giảm: khóa lại khi số lượng đang là 1 */}
                                    <button
                                        className={qtyBtn}
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1,
                                            )
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        −
                                    </button>

                                    {/* Nhập trực tiếp số lượng */}
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateQuantity(
                                                item.id,
                                                e.target.value,
                                            )
                                        }
                                        className="h-8 w-14 rounded-md border border-gray-300 text-center"
                                    />

                                    <button
                                        className={qtyBtn}
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1,
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <span className="w-32 text-right font-semibold">
                                    {formatPrice(item.price * item.quantity)}
                                </span>

                                <button
                                    className={btnDanger}
                                    onClick={() => removeItem(item.id)}
                                >
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="text-right text-lg">
                    Tổng tiền: <strong>{formatPrice(totalPrice)}</strong>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
