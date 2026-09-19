export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="/"
          className="flex items-center gap-2 text-rausch"
          aria-label="Airbnb clone home"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 fill-current"
            aria-hidden="true"
          >
            <path d="M16 1c-1.5 0-2.7 1-3.4 2.4L4.8 20.6c-1.8 3.6.5 7.9 4.5 7.9 2.2 0 4.1-1.2 5.7-3.6.6.9 1.5 1.6 2.5 2 .6.2 1.3.2 2 0 3.4-1.2 5.3-5.1 3.6-8.4L19.4 3.4C18.7 2 17.5 1 16 1zm0 3.2c.4 0 .8.3 1 .7l7 15.9c1 2.1-.3 4.6-2.5 5.3-.3.1-.6.1-.9 0-1.2-.4-2.1-1.4-2.6-2.6L16 15.6l-2 8c-.5 1.9-2.1 3.3-4 3.3-2.3 0-4-2.1-3.1-4.4L14 4.9c.2-.4.6-.7 1-.7h1z" />
          </svg>
          <span className="text-lg font-bold">airbnb</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium shadow-sm md:flex"
        >
          <a href="#" className="text-hof">
            Homes
          </a>
          <a href="#" className="flex items-center gap-1 text-foggy">
            Experiences
            <span className="rounded bg-rausch/10 px-1.5 py-0.5 text-[10px] font-semibold text-rausch">
              NEW
            </span>
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden rounded-full px-4 py-2.5 text-sm font-medium hover:bg-gray-100 md:block">
            Airbnb your home
          </button>
          <button
            aria-label="Language and region"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
          >
            🌐
          </button>
          <button
            aria-label="Main menu"
            className="flex items-center gap-3 rounded-full border border-gray-200 py-2 pl-3 pr-2 shadow-sm hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
            </svg>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-500 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-10 2.2-10 6v2h20v-2c0-3.8-5.6-6-10-6z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
