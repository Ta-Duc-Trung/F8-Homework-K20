import { useState } from "react";
import UserProfileCard from "./components/UserProfileCard.jsx";
import ProductList from "./components/ProductList.jsx";
import FaqAccordion from "./components/FaqAccordion.jsx";

const users = [
    {
        id: 1,
        avatar: "https://i.pravatar.cc/150?img=32",
        fullName: "Nguyễn Minh Anh",
        jobTitle: "Frontend Developer",
        isOnline: true,
        skills: ["React", "Node.js", "Tailwind"],
    },
    {
        id: 2,
        avatar: "https://i.pravatar.cc/150?img=15",
        fullName: "Trần Quốc Bảo",
        jobTitle: "UI/UX Designer",
        isOnline: false,
        skills: ["Figma", "Design System", "CSS"],
    },
];

const products = [
    {
        id: 1,
        name: "Bàn phím cơ Akko Pro 68",
        price: 1200000,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQHf9PI8KKZ0Sx17LzVdBq-kiy2LTTJXaOGWVa7imHsD5c49VjqHI8k7k-xpeA9Flq9iGoxIm4C0c8IOr1T7DP6dvSH8k-rpKfXSVAuyXn9E61UOpri0MhCYfoAEQzLu1knFujXsdMKwg&usqp=CAc",
        inStock: true,
        discountPercent: 10,
    },
    {
        id: 2,
        name: "Chuột không dây Logi Air",
        price: 550000,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQc9200erS41eJ9AmypIkjlxtFXN2NEBM1OLRY0atTpEhd5JNOsz4lqdL3XcZcb550sTcL80o31aX94-SH7tUDsjzQQjl9X35BZ_d68KV6X8PaRGXlA6kS8KWKWq5_NtlwQ3k2oKBc&usqp=CAc",
        inStock: true,
        discountPercent: 0,
    },
    {
        id: 3,
        name: "Tai nghe chống ồn SoundMax",
        price: 2390000,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRU28Eqh8zess6XEkl6kq9CiRz9mdsxhmalQeoMygvVxYY-MxWlYgBbp7gwd2KH-BAf0kVgwHXIcBaNmNtVDgBmIONXk9wVXjY85Uuv-z_K2-Z6ymz2pF0HON0qO2kEEbBHjTf0Jw&usqp=CAc",
        inStock: false,
        discountPercent: 15,
    },
    {
        id: 4,
        name: 'Màn hình 27" QHD ViewPro',
        price: 4890000,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSRski7ko9SZ7BpMO5snOoo9HibrkCcenyJ0tf7lz82BF3lavdBawvbC_szqLE9DXZeojECntXm8WPOvsfv22sdVHbBeJGFrQfG0ZUelHXKKENcDsvFyjwVq8PYHZmjmxZxvXgaGw&usqp=CAc",
        inStock: true,
        discountPercent: 5,
    },
    {
        id: 5,
        name: "Webcam Full HD StreamCam",
        price: 890000,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRYHeLZuIOIIEdG9OEZokXqrAbV91XTE-KfKcdoSujjvsmooGw-y0EdrvgTBtnexWSHpSs9A9Tq-a7CicYPe1cUisZ2zGebAdZ7gyXHchApNSN1hsH8u3LSIZNI1t-RHed2y4ZEKUI&usqp=CAc",
        inStock: true,
        discountPercent: 0,
    },
    {
        id: 6,
        name: "Giá đỡ laptop nhôm ErgoStand",
        price: 320000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAvhhimvYvK9e4N_IsPAXt-a7CGNpKlAbaMxC3Z-zO1g&s",
        inStock: false,
        discountPercent: 0,
    },
];

const faqData = [
    {
        id: 1,
        question: "Props trong React dùng để làm gì?",
        answer: "Props giúp truyền dữ liệu từ component cha xuống component con.",
        category: "React",
        isHot: true,
    },
    {
        id: 2,
        question: "State khác gì so với Props?",
        answer: "State là dữ liệu nội bộ do chính component quản lý và có thể thay đổi, trong khi Props là dữ liệu được truyền vào từ bên ngoài và chỉ đọc.",
        category: "React",
        isHot: false,
    },
    {
        id: 3,
        question: "Vì sao cần key khi render danh sách bằng .map()?",
        answer: "Key giúp React nhận diện phần tử nào thay đổi, được thêm hoặc bị xóa, từ đó tối ưu việc re-render danh sách.",
        category: "React",
        isHot: true,
    },
    {
        id: 4,
        question: "CSS Modules hoạt động như thế nào?",
        answer: "CSS Modules tự động sinh ra tên class duy nhất cho từng file, giúp tránh xung đột style giữa các component.",
        category: "CSS",
        isHot: false,
    },
    {
        id: 5,
        question: "Khi nào nên dùng Arrow Function trong onClick?",
        answer: "Khi cần truyền tham số vào hàm xử lý sự kiện, ví dụ onClick={() => onSelectFaq(id)}, để hàm chỉ thực thi lúc được click thay vì lúc render.",
        category: "JavaScript",
        isHot: false,
    },
];

function App() {
    const [cartMessage, setCartMessage] = useState("");
    const [selectedFaqId, setSelectedFaqId] = useState(null);

    const handleAddToCart = (name, finalPrice) => {
        const formatted = `${new Intl.NumberFormat("vi-VN").format(finalPrice)}đ`;
        setCartMessage(`Đã thêm "${name}" vào giỏ hàng — giá ${formatted}`);
    };

    const handleSelectFaq = (id) => {
        setSelectedFaqId(id);
    };

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pb-20 pt-12">
            <header className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    K20 — Day 32: React Components &amp; Props
                </h1>
                <p className="text-slate-500">
                    Ba bài tập: UserProfileCard, ProductList và FAQ Accordion.
                </p>
            </header>

            <section className="flex flex-col gap-4.5">
                <h2 className="border-b border-slate-200 pb-2.5 text-lg font-semibold text-slate-900">
                    Bài 1 — UserProfileCard
                </h2>
                <div className="flex flex-wrap gap-5">
                    {users.map((user) => (
                        <UserProfileCard key={user.id} {...user} />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-4.5">
                <h2 className="border-b border-slate-200 pb-2.5 text-lg font-semibold text-slate-900">
                    Bài 2 — ProductList
                </h2>
                {cartMessage && (
                    <p className="rounded-md bg-teal-50 px-3.5 py-2.5 text-sm font-medium text-teal-700">
                        {cartMessage}
                    </p>
                )}
                <ProductList
                    products={products}
                    onAddToCart={handleAddToCart}
                />
            </section>

            <section className="flex flex-col gap-4.5">
                <h2 className="border-b border-slate-200 pb-2.5 text-lg font-semibold text-slate-900">
                    Bài 3 — FAQ / Accordion
                </h2>
                {selectedFaqId !== null && (
                    <p className="rounded-md bg-amber-50 px-3.5 py-2.5 text-sm font-medium text-amber-800">
                        Đã chọn xem chi tiết câu hỏi có id: {selectedFaqId}
                    </p>
                )}
                <FaqAccordion faqData={faqData} onSelectFaq={handleSelectFaq} />
            </section>
        </div>
    );
}

export default App;
