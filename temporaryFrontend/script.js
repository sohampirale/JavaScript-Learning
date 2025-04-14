const btnElem=document.getElementById('btn');

btnElem.addEventListener('click',async()=>{
    console.log('sending fetch request');
    try{
        const response=await fetch('https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev/send-token',{
            method:'GET',
            credentials:'include',
            headers:{
                token:'temp-token'
            }
        })
        const data=await response.json()
        console.log('data rceived : '+JSON.stringify(data));  
    }catch(err){
        console.log('Error occured : '+err);
    }
})