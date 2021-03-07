import React, { useState } from 'react';
import './App.css'

interface Todo {
  text: string;
  complete: boolean;
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string) => {
    const newTodos: Todo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos: Todo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos: Todo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const generateTodos = async () => {
    const todosResponse = await fetch('https://localhost:5000/todos/generate')
    if (todosResponse.ok) {
      const newTodos: Todo[] = await todosResponse.json()
      setTodos(newTodos)
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <button id="todo-generate" onClick={generateTodos}>Generate Todos</button>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
          id="todo-input"
        />
        <button id='todo-add' type='submit'>Add Todo</button>
      </form>
      <div id='todos-list'>
        {todos.map((todo: Todo, index: number) => {
          const id = `todo-${index}`

          return (
            <div key={id} id={id} className={todo.complete ? 'complete' : 'incomplete'}>
              <div>
                {todo.text}
              </div>
              <button className="toggle-complete" type='button' onClick={() => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button className="delete" type='button' onClick={() => deleteTodo(index)}>
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
