import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProductList from "./components/ProductList.jsx";
function App() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isCancelled = false;

        const timer = setTimeout(async () => {
            setLoading(true);
            setError(null);
            const url = searchTerm.trim()
                ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
                : `https://dummyjson.com/products?limit=10`;

            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error("Không thể tải danh sách sản phẩm");
                }

                const data = await res.json();

                if (!isCancelled) {
                    setProducts(data.products || []);
                    setLoading(false);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message || "Đã có lỗi xảy ra khi gọi API");
                    setProducts([]);
                    setLoading(false);
                }
            }
        }, 400);
        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [searchTerm]);
    const handleAddToCart = (product) => {
        console.log("Đã thêm vào giỏ:", product.title);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">
                Danh sách sản phẩm
            </h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {loading && (
                <p className="text-center text-indigo-600 font-medium py-10">
                    Đang tải sản phẩm...
                </p>
            )}
            {!loading && error && (
                <p className="text-center text-red-600 font-medium py-10">
                    ⚠ {error}
                </p>
            )}
            {!loading && !error && (
                <ProductList
                    products={products}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}

export default App;
