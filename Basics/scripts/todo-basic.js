let tasks=[];
function add(){
  const newTaskElem=document.querySelector('.new-task-input');
  if(newTaskElem.value.lentgh==0){
    alert("Task box is empty");
    return;
  } 
  tasks.add(newTaskElem.value);
  console.log('Task - '+newTaskElem.value+' added in the array tasks');

}