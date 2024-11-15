import React, { useState } from "react";


const ToDoList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    function añadirTask () {
        if(newTask.trim() !== ''){
            setTasks([...tasks, newTask]);
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

    function borrarTask (index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                    <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} onKeyPress={(e) => e.key === 'Enter' ? añadirTask() : null} style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd'}} />
                    <ul style={{listStyle: 'none', padding: '0', marginTop: '20px', textAlign: 'left'}}>
                        {tasks.map((task, index) => (
                            <LiTask key={index} task={task} index={index} onClick={() => borrarTask(index)} />
                        ))}
                    </ul>
                    {tasks.length === 0 ? <p>No hay tareas, añadir tareas</p> : <p>{tasks.length} tarea{tasks.length !== 1 ? 's' : ''} restante</p>}
                </div>
            </div>
        </div>
    );
}

export default ToDoList;