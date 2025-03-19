// const { ifError } = require("assert");
// const { log } = require("console");

function login(){
    const usernameElem=document.querySelector('.username-input');
    if(!usernameElem){
        alert('username element nto found');
        return;
    }

    const passwordElem=document.querySelector('.password-input');
    if(!passwordElem){
        alert('Password Element not found');
        return;
    }


    let username=usernameElem.value;
    let password=passwordElem.value;

    const users=JSON.parse(localStorage.getItem('users')) || {};
    const storedUser=users[username];
    
    if(!storedUser){
        let ask=prompt('Username does not exists in the database,Do you want to sign up?');
        if(ask==1){
            return signup();
        } else return false;
    }

        
    if(password===storedUser.password){
        alert('login successful');
        addLogin(username);
        usernameElem.value='';
        passwordElem.value='';
        console.log('going to index.html');
        
        window.location.href='index.html';
        // return ;
    } else {
        alert("Incorrect password");
        passwordElem.value='';
        return ;
    }
}
/*
    username:{
        password:
        tasks:[]
    }
*/ 
function signup(){
    const usernameElem=document.querySelector('.username-input');
    if(!usernameElem){
        alert('unable to find the username input element');
        return;
    } 

    const passwordElem=document.querySelector('.password-input');
    if(!passwordElem){
        alert('unable to find password input element')
        return;
    }

    const username=usernameElem.value;
    const password=passwordElem.value;

    if(username.length==0){
        alert('username cannot be empty');
        return;
    } 

    const users=JSON.parse(localStorage.getItem('users')) || {};
    
    if(username in users){
        alert('Username : '+username+' already exists in the database');
        return;
    }

    if(password.length==0){
        alert('Password cannot be empty');
        return;
    }
    let noOfRecoveryQuestions=parseInt(prompt('No of recovery questions you want to set : '));

    const recoveryQuestions=[];
    for(let i=0;i<noOfRecoveryQuestions;i++){
        let question=prompt('Enter question no '+(i+1));
        let answer=prompt('Enter answer for this question');
        recoveryQuestions.push([question,answer]);
    }

    const user={
        password:password,
        tasks:[],
        recoveryQuestions:recoveryQuestions
    }

    users[username]=user;
    console.log('Users now : '+users);
    localStorage.setItem('users',JSON.stringify(users));
    alert('User Signed Up Successfully');
    addLogin(username);
    usernameElem.value='';
    passwordElem.value='';
    window.location.href='index.html';
}
 

function onkeyUp(key){
    console.log('inside onkeyUp()');
    
    if (key=='Enter') login();
}