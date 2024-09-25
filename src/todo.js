import React, { Component } from 'react';
import './todo.css'; // Make sure to create this CSS file and add your styles

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      userInputValue: '',
      error:''
    };
  }

  getTodoListFromLocalStorage = async () => {
    try {
      const response = await fetch('http://localhost:3030/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful login (e.g., redirect or save token)
      console.log('Login successful:', data);
      // You might want to save the token or redirect the user
      return data;
    } catch (error) {
      console.log(error.message)
      this.setState({ error: error.message });
    } 
    return []
  };

  createTodo = async (userInputValue) => {
    try {
      console.log(userInputValue)
      const response = await fetch('http://localhost:3030/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({todo: userInputValue, status: "DONE"})
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful login (e.g., redirect or save token)
      console.log('Login successful:', data);
      // You might want to save the token or redirect the user
      return data;
    } catch (error) {
      console.log(error.message)
      this.setState({ error: error.message });
    } 
  return []  
  };

  saveTodoListToLocalStorage = async (newTodo) => {

    this.createTodo(newTodo.todo);
    this.setState(
      (prevState) => ({
        todoList: [...prevState.todoList, newTodo],
        userInputValue: '',
      }),
    )
  };



  handleInputChange = (event) => {
    this.setState({ userInputValue: event.target.value });
  };

  onAddTodo = () => {
    const { userInputValue, todoList } = this.state;

    if (userInputValue.trim() === '') {
      alert('Enter Valid Text');
      return;
    }

    const newTodo = {
      todo: userInputValue,
      id: todoList.length + 1,
      isChecked: false,
    };

    
      this.saveTodoListToLocalStorage(newTodo)
  };

  onTodoStatusChange = (id) => {
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.map((todo) =>
          todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        ),
      }),
      this.saveTodoListToLocalStorage
    );
  };

  onDeleteTodo = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`http://localhost:3030/todos/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Handle successful login (e.g., redirect or save token)
      console.log('Login successful:', data);
      // You might want to save the token or redirect the user
      return data;
    } catch (error) {
      console.log(error.message)
      this.setState({ error: error.message });
    } 
    this.setState(
      (prevState) => ({
        todoList: prevState.todoList.filter((todo) => todo.id !== id),
      }),
    );
  };

  async componentDidMount() {
    // Code to run after the component mounts
    console.log('Component has mounted!');
    let data = await this.getTodoListFromLocalStorage();
    console.log('component', data)
    this.setState({todoList: data})

  }
  render() {
    const { todoList, userInputValue } = this.state;
    console.log(todoList)

    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Todos</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                id="todoUserInput"
                className="todo-user-input"
                placeholder="What needs to be done?"
                value={userInputValue}
                onChange={this.handleInputChange}
              />
              <button className="button" id="addTodoButton" onClick={this.onAddTodo}>
                Add
              </button>
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>
              <ul className="todo-items-container" id="todoItemsContainer">
                {todoList.map((todo, i ) => (
                  <li key={todo.id} className="todo-item-container">
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => this.onTodoStatusChange(todo.id)}
                      className="checkbox-input"
                    />
                    <div className='label-container'>
                    <label
                      className={`checkbox-label ${todo.isChecked ? 'checked' : ''}`}
                    >
                      {todo.todo}
                    </label>
                    <div className="delete-icon-container">
                      <i
                        className="far fa-trash-alt delete-icon"
                        onClick={() => this.onDeleteTodo(todo.id)}
                      />
                    </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="button" id="saveTodoButton" onClick={this.saveTodoListToLocalStorage}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
