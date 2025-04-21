const loginBtnElem=document.getElementById('login-btn');
const usernameElem=document.getElementById('username');
const passwordElem=document.getElementById('password');
const confirmPasswordElem=document.getElementById('confirm-password');
const emailElem=document.getElementById('email');
const signupBtnElem=document.getElementById('signup-btn');
const signupFormElem=document.getElementById('signup-form');
let codespace=2;
let URL;
if(codespace==1){
    URL='https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev';
} else if(codespace==2){
    URL='https://fantastic-pancake-7v7p4q766jrg3pg7q-3000.app.github.dev'
}
const api=axios.create({
    baseURL:URL,
    withCredentials:true
})

signupFormElem.addEventListener('submit',(event)=>{
    event.preventDefault();
})

loginBtnElem.addEventListener('click',()=>{
    window.location=URL+'/login-pg';
})

async function signupAttempt(){
    console.log('inside signupAttempt()');
    
    const username=usernameElem.value;
    const password=passwordElem.value;
    const confirmPassword=passwordElem.value;
    const email=emailElem.value;
    if(password!=confirmPassword){
        return response.json({
            status:500,
            message:'Both Passwords do not match'
        })
    }
    
    const response=await api.post('/signup',{
            username,
            email,
            password
        },
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
    )
    if(response.status==200){
        alert('chaning href')
        window.location.href='/app'
    }
}

signupBtnElem.addEventListener('click',async ()=>{
    await signupAttempt(); 
})

