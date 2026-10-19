import { Link } from "react-router";
import AuthLayout, { SocialLoginButtons } from "./AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Get Started Now
        </h1>
        <p className="mt-2 text-sm text-gray-500">Create an account</p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            required
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
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
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
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
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            required
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-700">
          <input
            name="terms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-orange-500 focus:ring-orange-500"
          />
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
          className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
        >
          Sign up
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
