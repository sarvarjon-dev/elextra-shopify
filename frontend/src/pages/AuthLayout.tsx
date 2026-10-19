import type { ReactNode } from "react";
import { ShoppingCart } from "lucide-react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 p-0 sm:p-6 lg:p-8">
      <div className="grid min-h-screen w-full max-w-360 overflow-hidden bg-white shadow-xl sm:min-h-[min(900px,calc(100vh-3rem))] sm:rounded-3xl lg:grid-cols-2">
        <section className="relative flex min-w-0 flex-col px-6 py-8 sm:px-10 lg:px-12 xl:px-16">
          <a
            href="/"
            aria-label="Elextra home"
            className="inline-flex w-fit items-center gap-1.5 text-lg font-bold tracking-tight text-orange-500"
          >
            <ShoppingCart aria-hidden="true" className="h-6 w-6" />
            Elextra
          </a>
          <div className="flex grow items-center justify-center py-10">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </section>

        <div
          aria-label="A collection of electronic devices"
          role="img"
          className="hidden min-h-full rounded-l-4xl bg-stone-200 bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=90')",
          }}
        />
      </div>
    </main>
  );
}

export function SocialLoginButtons() {
  return (
    <>
      <div className="relative my-7 flex items-center">
        <div className="grow border-t border-gray-200" />
        <span className="px-4 text-xs font-medium text-gray-500">Or</span>
        <div className="grow border-t border-gray-200" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <span
            aria-hidden="true"
            className="text-base font-bold text-blue-600"
          >
            G
          </span>
          Sign in with Google
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 fill-current"
          >
            <path d="M12.7 8.5c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2-1.4-2.4-1.4-1-.1-1.9.6-2.4.6s-1.2-.6-2-.6c-1 0-2 .6-2.5 1.5-1.1 1.9-.3 4.8.8 6.4.5.8 1.1 1.6 1.9 1.6.8 0 1-.5 2-.5s1.2.5 2 .5 1.4-.8 1.9-1.6c.6-.9.8-1.7.8-1.8-.1 0-1.6-.6-1.6-2.1ZM11 3.3c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.7.1 1.3-.3 1.7-.8Z" />
          </svg>
          Sign in with Apple
        </button>
      </div>
    </>
  );
}
