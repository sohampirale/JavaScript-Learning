function addTask(){
    console.log('inside addTask()');
    let taskElem=document.querySelector('.new-task-input');
    let newTask=taskElem.value;
    if(newTask.length==0){
        alert('Task Box is Empty');
        return;
    } 
    console.log('New task = '+newTask);
    const toDoList=document.querySelector('.to-do-list');
    const toAdd=document.createElement('p');
    toAdd.textContent=newTask;
    toDoList.appendChild(toAdd);
    taskElem.value='';
}