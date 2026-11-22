import Logo from "../sharedComponent/Logo";

export default function LoginBrandPanel() {
  return (
    <section className="hidden flex-col justify-between bg-primary p-12 text-on-primary desktop:flex">
      <Logo inverted />

      <div>
        <h2 className="text-display font-bold leading-tight">
          Plan your day,
          <br />
          manage your tasks.
        </h2>
        <p className="mt-4 max-w-sm text-body opacity-80">
          A personal task list with roles: users see their own tasks, admins see everyone&apos;s.
        </p>
      </div>

      <p className="text-caption opacity-60">© 2026 Todo App</p>
    </section>
  );
}
