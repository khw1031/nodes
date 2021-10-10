interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (todoId: string) => void;
}

export function TodoList({ items, onDeleteTodo }: TodoListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.text}</span>
          <button onClick={onDeleteTodo.bind(null, item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
