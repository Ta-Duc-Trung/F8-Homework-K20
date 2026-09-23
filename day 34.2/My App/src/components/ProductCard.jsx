import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice.jsx";

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/products/${product.id}`}
            className="block bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
        >
            <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full aspect-square object-cover"
            />
            <div className="p-4">
                <p className="font-medium">{product.name}</p>
                <ProductPrice
                    value={product.price}
                    className="text-orange-600 font-semibold mt-1 block"
                />
            </div>
        </Link>
    );
}
