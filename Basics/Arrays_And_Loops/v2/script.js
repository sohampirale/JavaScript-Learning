// const { log } = require("console");

let loggedIn=JSON.parse(localStorage.getItem('loggedIn'));

if(!loggedIn){
    loggedIn=false;
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn));
}

let loggedUsername=JSON.parse(localStorage.getItem('loggedUsername'));

if(!loggedUsername){
    loggedUsername=null;
    localStorage.setItem('loggedUsername',JSON.stringify(loggedUsername));
}

function reset(){
    console.log('inside reset()');
    loggedIn=false;
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn));
    loggedUsername=null;
    localStorage.setItem('loggedUsername',JSON.stringify(loggedUsername));
    window.location.href='login.html';
}

function greeting(){
    console.log('inside greeting()');
    const greetingElem=document.querySelector('.greeting-user');
    if(!greetingElem){
        alert('unable to find greetingElem');
        return;
    } else if(!loggedUsername){
        alert('username is null');
        return;
    }
    greetingElem.innerText=`Welcome ${loggedUsername}`;
}

function greetingWithWaitForDOM() {
    if (document.readyState === "complete") {
        greeting();
    } else {
        console.log("Waiting for DOM...");
        setTimeout(waitForDOM, 100); // Try again after 100ms
    }
}

function addLogin(username){
    console.log('inside addLogin()');
    loggedIn=true;
    loggedUsername=username;
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn));
    localStorage.setItem('loggedUsername',JSON.stringify(loggedUsername));
    greetingWithWaitForDOM();
}

function logOut(){
    loggedIn=false;
    localStorage.setItem('loggedIn',JSON.stringify(loggedIn));
    loggedUsername=null;
    localStorage.setItem('loggedUsername',JSON.stringify(loggedUsername));
    const greetingElem=document.querySelector('.greeting-user');
    if(!greetingElem){
        alert('unable to find the greetingElem');
    } else {
        greetingElem.innerText=``;
    }
    window.location.href='login.html';
}

function renderTask(newTask){
    const allTasksDivElem=document.querySelector('.tasks-div');
    if(!allTasksDivElem){
        alert('unable to find ht e allTasksDivElem');
        return;
    }
    const newTaskHTML=`<p class="T_${newTask}"><input type="checkbox"></input>${newTask}</p>`;
    allTasksDivElem.innerHTML+=newTaskHTML;
    console.log('allTasksDivElem.innerHTML now : '+allTasksDivElem.innerHTML);
    console.log('New task added in the div');
}

if(window.location.pathname.endsWith('index.html')){
    console.log('user is on the index.html');
    if(loggedIn){
        const users=JSON.parse(localStorage.getItem('users'));
        alert('rendering all old saved tasks one by one');
        let tasks=users[loggedUsername];
        for(let i=0;i<tasks.length;i++){
            console.log('rendering taks : '+tasks[i]);
            renderTask(tasks[i]);
        }    
    } else {
        alert('You need to login first to access this page');
        window.location.href='login.html';
    }
 
} 
// else {
//     console.log('user is on the login.html');
// }



function addTask(){
    console.log('inside addTask()');
    
    const newTaskElem = document.querySelector('.task-input');

    if(!newTaskElem){
        alert('unable to find the newTaskElem');
        return;
    }
    const dateElem = document.querySelector('.date-input');

    if(!dateElem){
        alert('unable to find the dateElem');
        return;
    }

    const newTask=newTaskElem.value;
    if(newTask.length==0){
        alert('Task cannot be empty');
        return;
    }
    const date=dateElem.value;

    if(date.length==0){
        alert('Select deadline for this task');
        return;
    }
    console.log('date = '+date);
    const users=JSON.parse(localStorage.getItem('users'));
    users[loggedUsername]['tasks'].push(newTask);
    console.log('new task added to username : '+loggedUsername);
    localStorage.setItem('users',JSON.stringify(users));
    console.log('user : '+users[loggedUsername]);
    renderTask(newTask);
}