import React, { useEffect, useState } from 'react';

const initialFormValues = {
  title: '',
  description: ''
}

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {

  const [formValues, setFormValues] = useState(initialFormValues)
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {

    if (todoEdit) {
      setFormValues(todoEdit);
    } else {
      setFormValues(initialFormValues);
    }

  }, [todoEdit])

  const handleInputchange = (event) => {

    const changedFormValues = {
      ...formValues,
      [event.target.name]: event.target.value
    }

    setFormValues(changedFormValues)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === '') {
      setError('Debes indicar un título');
      return;
    }

    if (description.trim() === '') {
      setError('Debes indicar una descripción');
      return;
    }

    if (todoEdit) {
      //Actualizando
      todoUpdate(formValues);
      setSuccessMessage('Actualizado con éxito')
    } else {
      //Agregar tarea
      todoAdd(formValues);
      setSuccessMessage('Agregado con éxito')
      setFormValues(initialFormValues);
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
    setError(null);

  }

  return (
    <div>
      <h2 className="text-center display-5">{todoEdit ? 'Editar tarea' : 'Nueva Tarea'}</h2>

      {
        todoEdit &&
        <button
          onClick={() => setTodoEdit(null)}
          className="btn btn-sm btn-warning mb-2"
        >
          Cancelar Edición
        </button>
      }

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          className="form-control"
          value={title}
          name="title"
          onChange={handleInputchange}
        />
        <textarea
          placeholder="Descripción"
          className="form-control mt-2"
          value={description}
          name="description"
          onChange={handleInputchange}
        ></textarea>
        <button
          className="btn btn-primary btn-block mt-2"
        >{todoEdit ? 'Actualizar tarea' : 'Agregar tarea'}
        </button>
      </form>

      {
        error && (
          <div className="alert alert-danger mt-2">
            {error}
          </div>
        )
      }
      {
        successMessage && (
          <div className="alert alert-success mt-2">
            {successMessage}
          </div>
        )
      }

    </div >
  )
}

export default TodoForm;