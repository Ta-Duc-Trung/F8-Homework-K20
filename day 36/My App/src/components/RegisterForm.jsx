import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Vui lòng nhập email")
      .email("Email không đúng định dạng"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"], 
  });

const onSubmit = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Dữ liệu gửi đi:", data);
  alert("Đăng ký thành công!");
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema), 
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const inputClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
      hasError
        ? "border-red-400 focus:ring-red-200"
        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
    }`;

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">Đăng ký tài khoản</h2>

      {/* noValidate: tắt kiểm tra mặc định của trình duyệt, để Zod lo hết */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* ----- Email ----- */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p style={{ color: "red" }} className="mt-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ----- Mật khẩu ----- */}
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={inputClass(errors.password)}
          />
          {errors.password && (
            <p style={{ color: "red" }} className="mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ----- Nhập lại mật khẩu ----- */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Nhập lại mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={inputClass(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }} className="mt-1 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}