import { Link, useNavigate } from "react-router";
import AuthLayout, { SocialLoginButtons } from "./AuthLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required") // Bo'sh qoldirilsa shu xato chiqadi
    .email("Invalid email address"), // Noto'g'ri format yozilsa shu xato chiqadi

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"), // Kamida 6 ta belgi talab qilamiz

  rememberMe: z.boolean().optional(), // Checkbox ixtiyoriy bo'lgani uchun .optional() qo'yamiz
});

// 2. TypeScript tushunishi uchun undan Type ajratib olamiz
export type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register, // Inputlarni ulash uchun
    handleSubmit, // Formani yuborish uchun
    formState: { errors, isSubmitting }, // Xatolar va yuklanish holati
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema), // "Tarjimon" orqali Zod ni uladik
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // Boshlang'ich holatda ptichka bo'lmaydi
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    // Backend'dan javob kelishini 2 soniya simulyatsiya qilamiz
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { access_token } = response.data;
      const fakeUser = { id: "1", full_name: "user1", email: data.email };
      login(fakeUser, access_token);
      navigate("/");
    } catch (err: any) {
      const errMsg = err.response?.data?.detail || "Email yoki parol xato!";
      alert(errMsg);
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Tayyor ma'lumot:", data);
  };
  return (
    <AuthLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Welcome back!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your details to sign in
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs font-medium text-orange-500 transition hover:text-orange-600"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 rounded border-gray-300 accent-orange-500 focus:ring-orange-500"
          />
          Remember me
        </label>
        <button
          type="submit"
          disabled={isSubmitting} // Agar jarayon ketayotgan bo'lsa, tugmani bosib bo'lmaydigan qiladi
          className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          {isSubmitting ? "Iltimos, kuting..." : "Log in"}
        </button>
      </form>

      <SocialLoginButtons />
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-orange-500 transition hover:text-orange-600"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
