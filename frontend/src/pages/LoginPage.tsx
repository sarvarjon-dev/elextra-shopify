import { Link } from "react-router";
import AuthLayout, { SocialLoginButtons } from "./AuthLayout";

export default function LoginPage() {
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

      <form
        className="space-y-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
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
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-gray-700">
          <input
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-orange-500 focus:ring-orange-500"
          />
          Remember me
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Log in
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
