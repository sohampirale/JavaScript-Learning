const runCodeBtnElem = document.getElementById('js-run-code-btn');
const codeAreaElem = document.getElementById('js-code-area');
const selectedLangElem = document.getElementById('language-select');
const outputAreaElem = document.getElementById('js-output-area');
const logoutBtnElem=document.getElementById('logout-btn');
const loginCredentials=JSON.parse(localStorage.getItem('loginCredentials'));
const greetUserElem=document.querySelector('.greet-user');
const historyListElem=document.querySelector('.history-list');
const URL = 'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev';
let userData;
let temoCodeStore=``;

// async function checkAuthentication(){
//     const response=await fetch(URL+'/authenticate',{
//         method:'POST',
//         body:loginCredentials,
//         headers: {
//             'Content-Type': 'application/json'
//         } 
//     })

//     const authenticationResponse=await response.json();
//     console.log('authentication Response ' +JSON.stringify(authenticationResponse));
    
//     if(!authenticationResponse.authentication){
//         alert('authentication failed');
//         localStorage.removeItem('loginCredentials')
//     }
// }

const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
const sidebar = document.querySelector('.sidebar');

toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});



const newCodeElem=document.createElement('div');
newCodeElem.classList.add('history-item');
newCodeElem.innerHTML=`New Code`;
newCodeElem.addEventListener('click',()=>{
    reloadPreviousCode();
    outputAreaElem.value=``;
})
historyListElem.appendChild(newCodeElem);

function reloadPreviousCode(){
    codeAreaElem.value=temoCodeStore
    temoCodeStore=''
}

async function getDataFromBackend(){
    //create in server then uncomment
    
    const response=await fetch(URL+'/getData',{
        method:'POST',
        body:JSON.stringify(loginCredentials),
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    // await checkAuthentication();
    const getDataResponse=await response.json();
    if(getDataResponse.status!=200){
        historyListElem.innerHTML=`<div class="history-item">Let's make the first compilation!:)</div>`
    } else {
        const history=getDataResponse.history;
        history.forEach((work)=>{
            const workElem=document.createElement('div');
            workElem.classList.add('H'+work.id);
            workElem.classList.add('history-item');
            workElem.innerHTML=work.code;
            workElem.addEventListener('click',()=>{
                if(temoCodeStore=='')
                    temoCodeStore=codeAreaElem.value;
                codeAreaElem.value=work.code;
                outputAreaElem.value=work.output;
            })
            historyListElem.appendChild(workElem);
        })
    }
    console.log('Data receievd : '+JSON.stringify(getDataResponse));
    
}

if(!loginCredentials){
    alert('You need to login first to access this page');
    window.location.href=URL;
} else {
    console.log('Welcome : '+loginCredentials.username);
    greetUserElem.innerHTML=`Welcome ${loginCredentials.username}`
    getDataFromBackend();
}

codeAreaElem.addEventListener('keydown',async (event)=>{
    if(event.ctrlKey&& event.key=='Enter'){
        await work();
    }
})

logoutBtnElem.addEventListener('click',async ()=>{
    localStorage.removeItem('loginCredentials');
    const response=await fetch(URL+'/logout',{
        method:'POST',
        body:JSON.stringify(loginCredentials),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const logoutResponse=await response.json();
    console.log(JSON.stringify(logoutResponse));
    if(logoutResponse.status==200){
        console.log('login credentials removed form the localstorage');
        console.log(logoutResponse.message);
        
        window.location.href=URL;
    } else {
        console.log('logout api call failed');
        window
    }
    
})

async function work(){
    if(codeAreaElem.value.length==0){
        alert('Code cannot be empty')
        return;
    }
    console.log(`POST request sent to ${URL}/run`);
    try {
        console.log('trying now from frontend');
        const response = await fetch(`${URL}/run`, {
            method: 'POST',
            body: JSON.stringify({
                code: codeAreaElem.value,
                language: selectedLangElem.value,
                token:loginCredentials.token,
                username:loginCredentials.username
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        // await checkAuthentication();

        const finalOutput = await response.json();
        console.log('in frontend finalOutput: ' + JSON.stringify(finalOutput));

        if (finalOutput.stderr) {
            outputAreaElem.value = 'Error occurred:\n' + finalOutput.stderr;
        } else if (finalOutput.stdout) {
            outputAreaElem.value = finalOutput.stdout;
        } else if (finalOutput.message) {
            outputAreaElem.value = finalOutput.message;
        } else {
            outputAreaElem.value = 'No recognizable output.';
        }
    } catch (err) {
        console.log('failure');
        console.log(err);
        outputAreaElem.value = 'Failed to connect to server.';
    }
}

runCodeBtnElem.addEventListener('click', work);