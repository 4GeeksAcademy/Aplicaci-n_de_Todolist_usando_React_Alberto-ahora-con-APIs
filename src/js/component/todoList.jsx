import React, { useEffect, useState } from "react";


const ToDoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(()=>{
      añadirUsuario();
      getTareas();
    },[])

    const añadirTodo = async (newTask) => {
      try {
        const resp = await fetch('https://playground.4geeks.com/todo/todos/ASG', {
          method: 'POST', // POST, PUT, DELETE
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            label: newTask,
            is_done: false,
          }),
        });
        
        if (!resp.ok) throw new Error('error');
    
        // SIEMPRE vamos a pasar nuestra respuesta a JSON
        const data = await resp.json();
        getTareas();
        console.log(data);
      } catch (error) {
        console.error("Error al añadir la tarea:", error.message);
      }
    };


    const añadirUsuario = async () => {
      try {
        const resp = await fetch('https://playground.4geeks.com/todo/users/ASG', {
          method: 'POST', // POST, PUT, DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!resp.ok) throw new Error('error');
    
        // SIEMPRE vamos a pasar nuestra respuesta a JSON
        const data = await resp.json();
        console.log(data);
      } catch (error) {
        console.error("Error al añadir la tarea:", error.message);
      }
    };

    const getTareas = async () => {
      try {
        const resp = await fetch('https://playground.4geeks.com/todo/users/ASG', {
          method: 'GET', // POST, PUT, DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!resp.ok) throw new Error('error');
    
        // SIEMPRE vamos a pasar nuestra respuesta a JSON
        const data = await resp.json();
        setTasks(data.todos);
      } catch (error) {
        console.error("Error al añadir la tarea:", error.message);
      }
    };


    const eliminatTareas = async (id) => {
      try {
        const resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
          method: 'DELETE', // POST, PUT, DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!resp.ok) throw new Error('error');
        getTareas();
      } catch (error) {
        console.error("Error al añadir la tarea:", error.message);
      }
    };
    


    function añadirTask (newTask) {
        if(newTask.trim() !== ''){
          añadirTodo(newTask);
          setNewTask('');
        }
    }

    function LiTask({ task, index, onClick }){
        const [isHovered, setIsHovered] = useState(false);

        return(
            <li key = {index} style={{display: 'flex', justifyContent: 'space-between'}} 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                >
                {task}
                <button
                  onClick={onClick}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: isHovered ? 'red' : 'transparent'
                  }}
                >
                  X
                </button>
            </li>
        )
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <h1 style={{opacity: 0.3, fontWeight: '300', fontSize: '7em', marginBottom: '0.5em'}}>todos</h1>
            <div className="container" style={{width: '300px', textAlign: 'center'}}>
                <div className="container bg-light" style={{boxShadow: '0px 4px 8px grey', padding: '20px', borderRadius: '8px', width: '100%', textAlign: 'center'}}>
                    <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} onKeyPress={(e) => e.key === 'Enter' ? añadirTask(newTask) : null} style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd'}} />
                    <ul style={{listStyle: 'none', padding: '0', marginTop: '20px', textAlign: 'left'}}>
                        {tasks.map((task) => (
                            <LiTask key={task.id} task={task.label} index={task.id} onClick={() => eliminatTareas(task.id)} />
                        ))}
                    </ul>
                    {tasks.length === 0 ? <p>No hay tareas, añadir tareas</p> : <p>{tasks.length} tarea{tasks.length !== 1 ? 's' : ''} restante</p>}
                </div>
            </div>
        </div>
    );
}

export default ToDoList;