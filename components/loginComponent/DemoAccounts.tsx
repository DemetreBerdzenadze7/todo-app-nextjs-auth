const demoAccounts = [
  { role: "ADMIN", username: "Admin", password: "1234", tone: "bg-warning-soft text-warning" },
  { role: "USER", username: "Giorgi", password: "123", tone: "bg-primary-soft text-primary" },
];

export default function DemoAccounts() {
  return (
    <div className="mt-6 rounded-card border border-dashed border-border p-4">
      <p className="text-caption font-semibold uppercase tracking-wide text-muted">Demo accounts</p>
      <ul className="mt-3 flex flex-col gap-2">
        {demoAccounts.map((acc) => (
          <li key={acc.role} className="flex items-center justify-between gap-3 text-body">
            <span className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${acc.tone}`}>{acc.role}</span>
            <span className="font-mono text-caption text-muted">
              {acc.username} / {acc.password}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
