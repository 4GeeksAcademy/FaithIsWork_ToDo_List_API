import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  useEffect (()=>{
    getData()
  },[]);

 let Todo= {
    "label": taskText,
    "is_done": false
  }

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };
   function getData() {
    fetch("https://playground.4geeks.com/todo/users/FaithIsWork")
          .then(res => {
             return res.json ()
          })
          .then(data  => {
                 console.log(data);
                 setTasks(data.todos)
          })

   }
 function sendData() {
  fetch("https://playground.4geeks.com/todo/todos/FaithIsWork",{
    method:"POST",
    headers:{
      "Content-Type": "Application/json"
    },
    body:JSON.stringify({
      "label": taskText,
      "is_done": false
    })
  }).then(res => res.json()) 
  .then(data =>console.log(data))
 }
 function deleteData(id) {
  fetch (`https://playground.4geeks.com/todo/todos/${id}`,{
    method:"DELETE"  
  }).then(res => res.json())  
  .then(data => console.log(data))
  const updatedTasks = tasks.filter(task => task.id !== id);
  setTasks(updatedTasks)
 }
  return (
    
   <div className="container mt-4 col-4">
      <h2 className="text-center mb-4 display-1 ">Todo List</h2>
      <form onSubmit={sendData} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={taskText}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Actions</th>
          </tr> 
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr className="remove" key={task.id}>
              <td>{index + 1}</td>
              <td className={task.completed ? 'completed' : ''}>{task.label}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger button"
                  onClick={() => deleteData(task.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="badge badge-secondary" style={{ fontSize: '10px', color: 'gray' }}>
        {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
      </span>
    </div> 
  );
};

export default TodoList;
