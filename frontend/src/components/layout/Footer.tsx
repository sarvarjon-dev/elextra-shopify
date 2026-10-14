import { Headset, Mail, Play, Smartphone, Zap } from "lucide-react";

const quickLinks = [
  { name: "About us", path: "/about" },
  { name: "Contact us", path: "/contact" },
  { name: "Products", path: "/products" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/register" },
];

const customerLinks = [
  { name: "My Account", path: "/account" },
  { name: "Orders", path: "/orders" },
  { name: "Tracking List", path: "/tracking" },
  { name: "Terms", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "My Cart", path: "/cart" },
];

function Footer() {
  return (
    <footer className="bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 lg:px-10">
        <section
          aria-labelledby="newsletter-title"
          className="overflow-hidden rounded-2xl bg-orange-500 px-6 py-8 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-12"
        >
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:flex">
              <Mail aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <div>
              <h2
                id="newsletter-title"
                className="text-xl font-bold sm:text-2xl"
              >
                Sign Up for Newsletter
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-orange-50">
                Get the latest news, exclusive offers, and updates delivered
                straight to your inbox.
              </p>
            </div>
          </div>
          <form className="mt-6 flex rounded-lg bg-white p-1.5 sm:max-w-xl lg:mt-0 lg:w-[47%]">
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-md px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-slate-900 px-4 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-slate-700 sm:px-6"
            >
              SUBSCRIBE
            </button>
          </form>
        </section>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.35fr] lg:gap-12">
          <section>
            <a
              href="#"
              aria-label="Elextra home"
              className="inline-flex items-center gap-1 text-2xl font-extrabold tracking-tight text-slate-900"
            >
              <Zap
                aria-hidden="true"
                className="h-6 w-6 fill-orange-500 text-orange-500"
              />
              Elextra
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Your one-stop shop for the latest electronics, trusted brands, and
              everyday essentials.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Headset
                aria-hidden="true"
                className="h-8 w-8 text-slate-400"
                strokeWidth={1.7}
              />
              <div>
                <span className="block text-xs text-slate-500">
                  Have any question?
                </span>
                <a
                  href="tel:+123456789"
                  className="mt-0.5 block text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  +123 456 789
                </a>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 rounded-lg border border-orange-200 px-5 py-2.5 text-xs font-bold tracking-wide text-orange-500 transition hover:bg-orange-50"
            >
              LIVE CHAT
            </button>
          </section>

          <nav aria-label="Quick links">
            <h3 className="text-xs font-bold tracking-wider text-slate-900">
              QUICK LINKS
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-slate-500 hover:text-orange-500 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Customer area">
            <h3 className="text-xs font-bold tracking-wider text-slate-900">
              CUSTOMER AREA
            </h3>
            <ul className="mt-5 space-y-3">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-slate-500 hover:text-orange-500 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section>
            <h3 className="text-xs font-bold tracking-wider text-slate-900">
              FOLLOW US
            </h3>

            <h3 className="mt-7 text-xs font-bold tracking-wider text-slate-900">
              DOWNLOAD APP
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="flex min-w-35 items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-700"
              >
                <Smartphone aria-hidden="true" className="h-6 w-6" />
                <span className="leading-tight">
                  <span className="block text-[9px]">Download on the</span>
                  <span className="block text-xs font-semibold">App Store</span>
                </span>
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="flex min-w-35 items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-700"
              >
                <Play aria-hidden="true" className="h-6 w-6 fill-white" />
                <span className="leading-tight">
                  <span className="block text-[9px]">GET IT ON</span>
                  <span className="block text-xs font-semibold">
                    Google Play
                  </span>
                </span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:px-8 md:flex-row md:px-10 md:text-left">
          <p className="text-xs text-slate-300">
            ELEXTRA © 2026 All Rights Reserved
          </p>
          <div
            aria-label="Accepted payment methods"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {["VISA", "mastercard", "PayPal", "DISCOVER", "AMEX"].map(
              (method) => (
                <span
                  key={method}
                  className="rounded bg-white px-2.5 py-1.5 text-[10px] font-extrabold tracking-tight text-slate-700"
                >
                  {method}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
