import {
  ChevronDown,
  Heart,
  MapPin,
  Search,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";

function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="hidden border-b border-slate-100 bg-slate-50/70 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] text-slate-500 sm:px-8 lg:px-10">
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 transition hover:text-orange-500"
            >
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              Store Locations
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 transition hover:text-orange-500"
            >
              <Truck aria-hidden="true" className="h-3.5 w-3.5" />
              Track Your Order
            </a>
          </div>

          <p className="hidden flex-1 text-center font-medium tracking-wide text-slate-500 xl:block">
            30 DAYS FREE RETURN
            <span className="mx-3 text-slate-300">|</span>
            FREE SHIPPING
            <span className="mx-3 text-slate-300">|</span>
            BEST ECOMMERCE IN ASIA
          </p>

          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Select currency, currently US Dollar"
              className="inline-flex items-center gap-1.5 transition hover:text-orange-500"
            >
              $ Dollar (US)
              <ChevronDown aria-hidden="true" className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label="Select language, currently English"
              className="inline-flex items-center gap-1.5 transition hover:text-orange-500"
            >
              EN
              <ChevronDown aria-hidden="true" className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-4 sm:px-8 lg:flex-nowrap lg:px-10 lg:py-5">
        <a
          href="#"
          aria-label="Elextra home"
          className="inline-flex shrink-0 items-center gap-1 text-2xl font-extrabold tracking-tight text-slate-900"
        >
          <Zap
            aria-hidden="true"
            className="h-6 w-6 fill-orange-500 text-orange-500"
          />
          Elextra
        </a>

        <form
          role="search"
          className="order-3 flex w-full min-w-0 items-center rounded-xl bg-slate-100 p-1.5 lg:order-0 lg:mx-6 lg:flex-1"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="navbar-search" className="sr-only">
            Search products
          </label>
          <input
            id="navbar-search"
            type="search"
            placeholder="Search here..."
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:px-4"
          />
          <button
            type="button"
            className="hidden shrink-0 items-center gap-2 border-l border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:text-orange-500 sm:flex"
          >
            All Categories
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="submit"
            aria-label="Search"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm transition hover:bg-orange-600"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 lg:ml-0">
          <a
            href="#"
            aria-label="Wishlist, 12 items"
            className="relative flex h-10 w-10 items-center justify-center text-slate-700 transition hover:text-orange-500"
          >
            <Heart aria-hidden="true" className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold leading-none text-white">
              12
            </span>
          </a>
          <a
            href="#"
            aria-label="Shopping bag, 4 items"
            className="relative flex h-10 w-10 items-center justify-center text-slate-700 transition hover:text-orange-500"
          >
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold leading-none text-white">
              4
            </span>
          </a>
          <a
            href="/login"
            className="hidden rounded-lg bg-slate-100 px-4 py-3 text-xs font-bold tracking-wide text-slate-700 transition hover:bg-slate-200 md:inline-flex"
          >
            LOGIN
          </a>
          <a
            href="/signup"
            className="hidden rounded-lg bg-orange-500 px-4 py-3 text-xs font-bold tracking-wide text-white shadow-sm transition hover:bg-orange-600 sm:inline-flex"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
