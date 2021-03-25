import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// Valores iniciales
const inicialTodos = [
  {
    id: 1,
    title: 'Todo #1',
    description: 'Desc del Todo #1',
    completed: false
  },
  {
    id: 2,
    title: 'Todo #2',
    description: 'Desc del Todo #2',
    completed: true
  }

]

const localTodos = JSON.parse(localStorage.getItem('todos'));

function App() {

  const [todos, setTodos] = useState(localTodos || inicialTodos);
  const [todoEdit, setTodoEdit] = useState(null);

  //localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); //primer parametro nombre de la clave que queremos asignar
  }, [todos]);                            //segundo parametro la variable que queremos almacenar

  // T  
  const todoDelete = (todoId) => {

    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }
    const changedTodos = todos.filter(todo => todo.id !== todoId); //filtra por id para eliminar el todo
    setTodos(changedTodos);
  }

  const todoToogleCompleted = (todoId) => {
    /* const changedTodos = todos.map(todo => {
      const todoEdit = {
        ...todo,
        completed: !todo.completed
      }

      if (todo.id === todoId) {
        return todoEdit;
      }
      else {
        return todo;
      }
    }) */

    /* const changedTodos = todos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    )) */

    const changedTodos = todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);

    setTodos(changedTodos);
  }

  const todoAdd = (todo) => {

    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false
    }

    const changetTodos = [
      newTodo,
      ...todos
    ]

    setTodos(changetTodos);
  }

  const todoUpdate = (todoEdit) => {
    const changedTodos = todos.map(todo => (
      todo.id === todoEdit.id
        ? todoEdit
        : todo
    ))
    setTodos(changedTodos);
    setTodoEdit(null);
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <TodoList
            todos={todos}
            todoDelete={todoDelete}
            todoToogleCompleted={todoToogleCompleted}
            setTodoEdit={setTodoEdit}
          />
        </div>
        <div className="col-4">
          <TodoForm
            todoEdit={todoEdit}
            todoAdd={todoAdd}
            todoUpdate={todoUpdate}
            setTodoEdit={setTodoEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
