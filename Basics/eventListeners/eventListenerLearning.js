let curr=1,gameRunning=false,forward=true,lastClicked=10,setIntervalId=null;
let wins=0,losses=0;
console.log('hii');


const buttonsElem=document.querySelectorAll('.btn');
const startGameElem=document.querySelector('.start-game-btn');

function moveForward(){
    const oldTileElem=document.querySelector('.current');
    if(oldTileElem){
        oldTileElem.classList.remove('current');
    }
    if(lastClicked==(curr+4)%17){
        swap();
        move();
        return;
    }
    curr=(curr+1)%17;

    const newTileElem=document.querySelector('.B'+curr);
    if(newTileElem)newTileElem.classList.add('current');

}

function moveBackward(){
    const oldTileElem=document.querySelector('.current');
    if(oldTileElem){
        oldTileElem.classList.remove('current');
    }

    if((lastClicked+4)%17==curr){
        swap();
        move();
        return;
    }

    curr=curr-1;
    if(curr==-1)curr=16;

    const newTileElem=document.querySelector('.B'+curr);
    if(newTileElem)newTileElem.classList.add('current');

}

function move(){
    if(forward){
        moveForward();
    } else {
        moveBackward();
    }
}

function swap(){
    forward=!forward;
}

function startGameFn(){
    console.log('inside start game function');

    if(gameRunning){
        alert('Game already running!');
        return;
    }
    gameRunning=true;
    setIntervalId=setInterval(move,100); 
}

buttonsElem.forEach(button=>{
    button.addEventListener('click',(event)=>{
        console.log(gameRunning);
        
        if(!gameRunning){
            alert('Start the game first');
            return;
        }
        console.log('button is clicked');
        console.log('event.target = '+event.target);
        console.log('event.target.classList = '+event.target.classList);
        console.log('event.target.dataset.index = '+event.target.dataset.index);

        let classListString = event.target.classList.value; 
        let match = classListString.match(/\d+/);
        lastClicked=match ? parseInt(match[0]) : null;
        console.log('lastClicked = '+lastClicked);
        
        if(event.target.classList.contains('current')){
            alert('Got it! :)');
            wins++;
            if(wins>5){
                wins=0;
                losses=0;
                alert('You won the game');
                clearInterval(setIntervalId);
                gameRunning=false;
                const currentTileElem=document.querySelector('.current');
                if(currentTileElem){
                    currentTileElem.classList.remove('current');
                }
            }
        } else {
            losses++;
            alert('You missed! :(');
            if(losses>5){
                wins=0;
                losses=0;
                alert('You lost the game');
                clearInterval(setIntervalId);
                gameRunning=false;
                const currentTileElem=document.querySelector('.current');
                if(currentTileElem){
                    currentTileElem.classList.remove('current');
                }
            }
        }
    })
});


startGameElem.addEventListener('click',startGameFn);
// buttonElem.addEventListener('click',()=>{
//     console.log('button is cliked');
// })