const btnElem=document.querySelector('.get-joke-btn')
const jokeElem=document.querySelector('.joke');
btnElem.addEventListener('click',async()=>{
    const response=await fetch('https://api.chucknorris.io/jokes/random');
    const data=await response.json();   
    console.log('Data : '+JSON.stringify(data));
    jokeElem.innerHTML=data.value
})