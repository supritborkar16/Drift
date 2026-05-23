export function Logo() {
  return (
    <div className="group flex items-center gap-3" aria-label="Drift">
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary/10 text-primary transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-primary/15 group-hover:shadow-md">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6">
          <path
            d="M6 18.4c3.4-8.7 7-8.6 10.6.2 2.2 5.4 5.1 5.2 8.7-.6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3.5"
            className="transition duration-200 group-hover:translate-x-0.5"
          />
        </svg>
      </div>
      <span className="text-h3 font-semibold text-text-primary">Drift</span>
    </div>
  );
}
