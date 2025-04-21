
const btnElem=document.getElementById('btn');
let URL='';
const codespace=2;
if(codespace==1){
    URL='https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev'
} else if(codespace==2){
    URL='https://fantastic-pancake-7v7p4q766jrg3pg7q-3000.app.github.dev'
}
btnElem.addEventListener('click',async()=>{
    console.log('sending fetch request');
    try{
        const response=await fetch(URL+'/get-token',{
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