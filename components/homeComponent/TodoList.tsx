import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todos[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <section className="rounded-card border border-border bg-surface p-4 shadow-card tablet:p-5">
      <div className="mb-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-title font-semibold">Task list</h2>
        <TodoFilters />
      </div>

      <ul className="flex flex-col gap-2">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            title={t.title}
            date={t.createdAt}
            done={t.done}
          />
        ))}
      </ul>
    </section>
  );
}
