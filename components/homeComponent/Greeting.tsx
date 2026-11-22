type GreetingProps = {
  name: string;
};

export default function Greeting({ name }: GreetingProps) {
  return (
    <section className="mb-6 tablet:mb-8">
      <p className="text-body text-muted">Hello, {name} 👋</p>
      <h1 className="mt-1 text-heading font-bold tablet:text-display">My tasks</h1>
    </section>
  );
}
