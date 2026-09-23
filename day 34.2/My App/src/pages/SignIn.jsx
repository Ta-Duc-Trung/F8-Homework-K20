import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (form.password.length === 0) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    }

    setErrors(newErrors);
    setSuccess(Object.keys(newErrors).length === 0);
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-1">Đăng nhập</h1>
      <p className="text-sm text-gray-500 mb-6">Chào mừng bạn quay lại</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>
    
        {success && <p className="text-sm text-green-600">Đăng nhập thành công !</p>}

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2.5 rounded hover:bg-orange-700"
        >
          Đăng nhập
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Chưa có tài khoản?{" "}
        <Link to="/sign-up" className="text-orange-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </>
  );
}