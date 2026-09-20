// Component Header: thanh menu điều hướng ở trên cùng, dùng NavLink để tự xử lý active.
//
// KHÔNG DÙNG CONTEXT: cartCount được nhận trực tiếp qua props (App -> DefaultLayout -> Header).
import { NavLink, Link } from "react-router-dom";

function getLinkClass({ isActive }) {
  if (isActive) {
    return "text-orange-600 font-semibold border-b-2 border-orange-600 pb-1";
  }
  return "text-gray-600 hover:text-orange-600 pb-1";
}

export default function Header({ cartCount }) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Simple Shop
        </Link>

        <nav className="flex items-center gap-5">
          {/* "end" rất quan trọng ở đây: nếu không có, Home sẽ bị active
              ở MỌI trang, vì mọi URL đều bắt đầu bằng "/" */}
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={getLinkClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={getLinkClass}>
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </NavLink>

          <NavLink to="/sign-in" className={getLinkClass}>
            Sign In
          </NavLink>

          <NavLink to="/sign-up" className={getLinkClass}>
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}