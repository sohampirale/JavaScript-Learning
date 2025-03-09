if(localStorage.getItem('questionSet')==null){
  const quesitons=[];

  const ques1={ques:"color of water?",option1:"red",option2:"blue",option3:"orange",option4:"purple",answer:"option2"};
  quesitons.push(ques1);
  const ques2 = { ques: "What is 2 + 2?", option1: "3", option2: "4", option3: "5", option4: "6", answer: "option2" };
  quesitons.push(ques2);

  const ques3 = { ques: "Which planet is known as the Red Planet?", option1: "Earth", option2: "Venus", option3: "Mars", option4: "Jupiter", answer: "option3" };
  quesitons.push(ques3);

  const ques4 = { ques: "What is the capital of France?", option1: "Berlin", option2: "Madrid", option3: "Paris", option4: "Rome", answer: "option3" };
  quesitons.push(ques4);

  const ques5 = { ques: "Which is the largest mammal?", option1: "Elephant", option2: "Blue Whale", option3: "Giraffe", option4: "Tiger", answer: "option2" };
  quesitons.push(ques5);

  const ques6 = { ques: "What do plants release during photosynthesis?", option1: "Oxygen", option2: "Carbon Dioxide", option3: "Nitrogen", option4: "Hydrogen", answer: "option1" };
  quesitons.push(ques6);

  const ques7 = { ques: "How many continents are there on Earth?", option1: "5", option2: "6", option3: "7", option4: "8", answer: "option3" };
  quesitons.push(ques7);

  const ques8 = { ques: "Which gas do humans inhale for survival?", option1: "Oxygen", option2: "Carbon Dioxide", option3: "Helium", option4: "Nitrogen", answer: "option1" };
  quesitons.push(ques8);

  const ques9 = { ques: "What is the boiling point of water in Celsius?", option1: "50°C", option2: "100°C", option3: "150°C", option4: "200°C", answer: "option2" };
  quesitons.push(ques9);

  const ques10 = { ques: "How many legs does a spider have?", option1: "4", option2: "6", option3: "8", option4: "10", answer: "option3" };
  quesitons.push(ques10);

  for(let i=0;i<10;i++){
    localStorage.setItem('ques'+(i+1),quesitons[i]);
  }
  localStorage.setItem('questionSet',true);
  alert('All questions loaded');
}

function login(){

  const usernameElem=document.querySelector('.username-input');
  const passwordElem=document.querySelector('.password-input');
  console.log('value = '+usernameElem.value);
  
  if(usernameElem.value.length==0){
    alert('Username Field is empty')
    return;
  } else if(passwordElem.value.length==0){
    alert('Password Field is empty');
    return;
  }

  const savedUser=JSON.parse(localStorage.getItem(usernameElem.value));

  if(savedUser==null){
    alert('User with username : '+usernameElem.value+' does not exists in the database');
    return;
  }
  console.log('savedUser.password = '+savedUser.password);

  if(passwordElem.value==savedUser.password){
    savedUser.unsuccessfulAttempts=0;
    const loginStatusElem=document.querySelector('.login-status');
    loginStatusElem.innerHTML='Login Successful';
    loginStatusElem.classList.add('sucessfull');
    alert('Login Successfull');
    localStorage.setItem(usernameElem.value,JSON.stringify(savedUser));
  } else {
    savedUser.unsuccessfulAttempts++;
    console.log('Unsuccessfull atempts = '+savedUser.unsuccessfulAttempts);
    localStorage.setItem(usernameElem.value,JSON.stringify(savedUser));
    if(savedUser.unsuccessfulAttempts>=3){
      let forgot=prompt('Did you frogot your password? (1 : yes ,0 : No)');
      if(forgot==1){
        forgotPassword();
        return;
      } else return;
    }

    alert('Incorrect Password!');
    const loginStatusElem=document.querySelector('.login-status');
    loginStatusElem.innerHTML='Incorrect Password!';
    loginStatusElem.classList.add('unsucessfull');
  }
}

function signup(){
  const usernameElem=document.querySelector('.username-input');
  const passwordElem=document.querySelector('.password-input');
  
  if(usernameElem.value.length==0){
    alert('Username Field is empty')
    return;
  } else if(passwordElem.value.length==0){
    alert('Password Field is empty');
    return;
  }

  const savedUser=JSON.parse(localStorage.getItem(usernameElem.value));
  if(savedUser!=null){
    alert('User : '+usernameElem.value+' exists in the database');
    return;
  }

  let securityQuestionStr=prompt('Enter a security question for your account');
  let securityQuestionAnswerStr=prompt('Answer for the security quesiton');

  const obj={
    password:passwordElem.value+'',
    securityQuestion:securityQuestionStr+'',
    securityQuestionAnswer:securityQuestionAnswerStr +'',
    unsuccessfulAttempts:0,
    oldPW:[passwordElem.value]
  }

  localStorage.setItem(usernameElem.value,JSON.stringify(obj));
  const loginStatusElem=document.querySelector('.login-status');
  loginStatusElem.innerHTML='Signup Successful';
  loginStatusElem.classList.add('sucessfull');
  alert('Signup Successful');
}


function forgotPassword(){
  const usernameElem=document.querySelector('.username-input');
  if(usernameElem.value.length==0){
    alert('Username field is empty');
    return;
  }

  const savedUser=JSON.parse(localStorage.getItem(usernameElem.value));  

  if(savedUser==null){
    alert('User : '+usernameElem.value+' does not exists int he database');
    return;
  }

  let secutiryQuestionAnswer=prompt('Answer this : '+savedUser.securityQuestion);
  if(secutiryQuestionAnswer==savedUser.securityQuestionAnswer){
    while(1){
      let newPW=prompt('Enter new Password : ');
      let confirmPW=prompt('Confirm PW');
      if(newPW.length==0){
        alert('Password cannot be empty');
        continue;
      }
      if(newPW==confirmPW){
        if(savedUser.oldPW.includes(newPW)){
          alert('this PW has been used in the past by you');
          continue;
        }
        savedUser.password=newPW;
        alert('Password updated successfully');
        savedUser.unsuccessfulAttempts=0;
        savedUser.oldPW.push(newPW);
        localStorage.setItem(usernameElem.value,JSON.stringify(savedUser));
        return;
      } else {
        alert('Passwords do not match');
      }
    }
  } else {
    alert('Incorrect Answer!');
  }
}