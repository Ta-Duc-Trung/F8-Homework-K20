import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
export default function DefaultLayout({ cartCount }) {
    return (
        <>
            <Header cartCount={cartCount} />

            <main className="max-w-5xl mx-auto px-4 py-8 min-h-[70vh]">
                <Outlet />
            </main>
            <footer className="text-center text-sm text-gray-400 py-6">
                Simple Shop - Bài tập React Router
            </footer>
        </>
    );
}
