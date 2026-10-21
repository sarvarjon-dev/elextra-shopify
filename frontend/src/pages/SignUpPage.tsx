import { Link, useNavigate } from "react-router";
import AuthLayout, { SocialLoginButtons } from "./AuthLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// 1. Sign Up uchun qat'iy qolip
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"), // Ism kamida 2 ta harfdan iborat bo'lishi kerak

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms & policy"),
  // .refine() maxsus tekshiruv: qiymat faqat 'true' bo'lsagina o'tkazadi
});

export type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false, // Boshida rozi emas (false) deb belgilaymiz
    },
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        full_name: data.name, // Sizning Zod qolipdagi 'name' ni FastAPI kutgan 'full_name' ga beramiz
        email: data.email,
        password: data.password,
      });

      alert("Muvaffaqiyatli! Endi login qiling.");
      navigate("/login");
    } catch (error: any) {
      // FastAPI'dagi "This email has already existed!" xatosi shu yerdan ushlanadi
      const errorMsg =
        error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik yuz berdi";
      alert(errorMsg);
    }
  };
  return (
    <AuthLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Get Started Now
        </h1>
        <p className="mt-2 text-sm text-gray-500">Create an account</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            {...register("name")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            {...register("password")}
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
          {errors.password && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-700">
          <input
            {...register("terms")}
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-orange-500 focus:ring-orange-500"
          />
          {errors.terms && (
            <p className="mt-1 text-xs font-medium text-red-500">
              {errors.terms.message}
            </p>
          )}
          <span>
            I agree to the{" "}
            <a
              href="/terms"
              className="font-medium text-gray-900 underline underline-offset-2 transition hover:text-orange-500"
            >
              terms &amp; policy
            </a>
          </span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          {isSubmitting ? "Iltimos, kuting..." : "Sign up"}
        </button>
      </form>

      <SocialLoginButtons />
      <p className="mt-6 text-center text-sm text-gray-600">
        Have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-orange-500 transition hover:text-orange-600"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
