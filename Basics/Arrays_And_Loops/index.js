let tasks=JSON.parse(localStorage.getItem('tasks'));

let cnt=localStorage.getItem('cnt');

if(!cnt){
    cnt=1;
    localStorage.setItem('cnt',cnt);
}

if(!tasks){
    tasks=[];
    localStorage.setItem('tasks',JSON.stringify(tasks));
    console.log('creating localstorage for tasks');
} 

function completed(taskId){
    console.log('Inside completed TaskID = '+taskId);
    const taskElem=document.querySelector('.T'+taskId);
    if(!taskElem){
        alert('No Element found with taskId : .T'+taskId);
        return;
    }
    const completedTask=taskElem.innerText;
    for(let i=0;i<tasks.length;i++){
        if(completedTask==tasks[i]){
            tasks.splice(i,1);
        }
    }

    localStorage.setItem('tasks',JSON.stringify(tasks));
    
    console.log('Task : '+completedTask+' marked as completed');
    taskElem.innerHTML='';
}

function renderTasks(){
    const allTasksElem=document.querySelector('.tasks-div');
    if(!allTasksElem){
        alert('unable to find .tasks-div in renderTasks()');
        return;
    }

    tasks.forEach(task =>{
        allTasksElem.innerHTML+=`<p class="T${cnt}"><input type="checkbox" onclick="completed(${cnt});"> ${task} </p>`;
    })

    console.log('all tasks rendered allTasksDivElem.innerHTML = '+allTasksElem.innerHTML);
}

document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});

function addTask(){
    const newTaskElem=document.querySelector('.new-task');
    let newTask=newTaskElem.value;

    if(newTask.length==0){
        alert('Task is empty');
        return;
    } 

    const allTasksElem=document.querySelector('.tasks-div');
    if(!allTasksElem){
        alert('unable to find .tasks-div');
        return;
    }

    console.log('allTasksElem.innerHTML = '+allTasksElem.innerHTML);
    
    const newHTML=`<p class="T${cnt}"><input type="checkbox" onclick="completed(${cnt});">${newTask} </p>`;
    allTasksElem.innerHTML+=newHTML;
    cnt++;
    tasks.push(newTask);
    localStorage.setItem('cnt',cnt);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    newTaskElem.value='';
}

function addTask(){
    const newTaskElem=document.querySelector('.new-task');
    let newTask=newTaskElem.value;
    
}