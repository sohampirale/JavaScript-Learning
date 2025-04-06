const runCodeBtnElem = document.getElementById('js-run-code-btn');
const codeAreaElem = document.getElementById('js-code-area');
const selectedLangElem = document.getElementById('language-select');
const outputAreaElem = document.getElementById('js-output-area');
const URL = 'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev';


codeAreaElem.addEventListener('keydown',async (event)=>{
    if(event.ctrlKey&& event.key=='Enter'){
        await work();
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
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            code: codeAreaElem.value,
            lang: selectedLangElem.value
            })
        });

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