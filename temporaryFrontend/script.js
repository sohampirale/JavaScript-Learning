const btnElem=document.getElementById('btn');

btnElem.addEventListener('click',async()=>{
    console.log('sending fetch request');
    const response=await fetch('https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev/')
    const data=await response.json()
    console.log('data rceived : '+JSON.stringify(data));  
})