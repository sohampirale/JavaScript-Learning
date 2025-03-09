function loginUser(){
  alert('Inside loginUser()');
  const usernameElem=document.querySelector('.username');
  const passwordElem=document.querySelector('.password');

  if(usernameElem.value.length==0){
    alert("Username field is empty");
    return;
  } else if(passwordElem.value.length==0){
    alert('Password field is empty');
    return;
  }

  let username=usernameElem.value;
  let password=passwordElem.value;
  const storedPair=localStorage.getItem(username);

  if(storedPair==null){
    alert('User : '+username+' does not exists in the database so creating it');
    localStorage.setItem(username,password);
  } else {
    if(password==storedPair){
      alert('Login Successfull');
    } else {
      alert('Incorrect Password');
      passwordElem.value='';
      alert('cleared PW field');
    }
  }

}