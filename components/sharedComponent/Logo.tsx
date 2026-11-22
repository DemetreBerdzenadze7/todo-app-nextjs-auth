type LogoProps = {
  inverted?: boolean;
};

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`grid size-10 place-items-center rounded-control ${
          inverted ? "bg-on-primary/15" : "bg-primary text-on-primary"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-title font-bold">Todo App</span>
    </div>
  );
}
