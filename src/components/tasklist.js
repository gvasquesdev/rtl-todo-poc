import { useState } from 'react';

function TaskList() {
    let [taskList, setTaskList] = useState([]);
    let [newItem, setNewItem] = useState("");

    return (
        <div className="container" data-testid="task-container">
          <div className="add-task-input" data-testid="add-task-input">
            <input placeholder="Insira uma nova tarefa" value={newItem} onChange={value => setNewItem(value.target.value)} type="text"></input>
            <button onClick={() => addNewTask()} data-testid="add-task-button">Adicionar</button>
          </div>
          <ul className="task-list">
            {taskList.map((item, index) => (
            <li key={index} className="task-item" data-testid="task-list-item">
              {item}
              <button onClick={() => deleteTask(index)}>
                Deletar tarefa
              </button>
            </li>))}
          </ul>
        </div>
      );
    
      function addNewTask() {
        if(newItem.length <= 0) {
          alert("O usuário não pode enviar tarefas vazias");
          return;
        }
    
        let itemIndex = taskList.indexOf(newItem);
        if(itemIndex >= 0) {
          alert("Essa tarefa já existe");
          return;
        }
    
        setTaskList([...taskList, newItem]);
        setNewItem("");
      }
    
      function deleteTask(index) {
        let tmpTaskList = [...taskList];
        tmpTaskList.splice(index, 1);
    
        setTaskList(tmpTaskList);
      }
}


export default TaskList;