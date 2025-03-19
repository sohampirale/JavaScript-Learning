let seconds=4;
let confirmationInnerHTML=` Are you sure to reset score?<button class="confirmation">Yes</button><button class="confirmation">No</button>`;
let resetScoreElem=document.querySelector('.reset-score-btn');
let resetScoreConfirmationBtnElem;
resetScoreElem.addEventListener('click',()=>{
    let resetScoreElem=document.querySelector('.reset-score-confirmation');
    if(resetScoreElem){
        resetScoreElem.innerHTML+=confirmationInnerHTML;
        resetScoreConfirmationBtnElem=document.querySelectorAll('.confirmation');
        resetScoreConfirmationBtnElem.forEach((confirmationBtn)=>{
            confirmationBtn.addEventListener('click',(event)=>{
                if(event.target.innerText=='Yes'){
                    reset();
                    alert('clicked on yes');
                } else if(event.target.innerText=='No'){
                    alert('clicked on No');
                }
                resetScoreElem.innerHTML='';
            });
        })
      
    }
});


// reset
setInterval(function(){
    document.querySelector('.seconds-remainning').innerHTML=--seconds;
    if(seconds==0){
        document.querySelector('.auto-move').innerHTML='Times Up!Auto Move => Rock';
        play('Rock');
    }
},1000);


function clicked(move){
    document.querySelector('.auto-move').innerHTML='';
    let currMove=document.querySelector('.clicked_move');
    if(currMove!=null){
        currMove.classList.remove('clicked_move');
        console.log('removing '+currMove);
        
    }
    let playerMove=document.querySelector('.'+move);
    playerMove.classList.add('clicked_move')
    console.log('added move '+playerMove.innerHTML);
}

let moves=['Rock','Paper','Scissor'];
let index=Math.floor(Math.random()*3);
let compMove=moves[index];
let currWin=null;

if(localStorage.length==0){
    localStorage.setItem('wins',0);
    localStorage.setItem('loses',0);
    localStorage.setItem('ties',0);
    localStorage.setItem('totalWins',0);
    localStorage.setItem('totalLoses',0);
    document.querySelector('.js-score-board').innerHTML='Game Started';
} 
else {
    document.querySelector('.js-score-board').innerHTML=`<h3>Game Resumed</h3> from Player Score : ${localStorage.getItem('wins')} & Computer Score : ${localStorage.getItem('loses')} & Ties : ${localStorage.getItem('ties')}`
    document.querySelector('.js-totalWins-score-board').innerHTML=`Player has won : ${localStorage.getItem('totalWins')} rounds & Computer has won ${localStorage.getItem('totalLoses')} rounds`
}

function play(move){
    seconds=4;
    if(move==compMove){
        localStorage.setItem('ties',Number(localStorage.getItem('ties'))+1);
        currWin=null;
        
    }else if(move=='Rock'){
        if(compMove=='Paper'){
            localStorage.setItem('loses',Number(localStorage.getItem('loses'))+1);
            currWin='Computer'
        } else if(compMove=='Scissor'){
            currWin='Player'
            localStorage.setItem('wins',Number(localStorage.getItem('wins'))+1);
        }
    } else if(move=='Paper'){
        if(compMove=='Scissor'){
            currWin='Computer'
            localStorage.setItem('loses',Number(localStorage.getItem('loses'))+1);
        } else if(compMove=='Rock'){
            currWin='Player'
            localStorage.setItem('wins',Number(localStorage.getItem('wins'))+1);
        }
    } else if(move=='Scissor'){
        if(compMove=='Rock'){
            currWin='Computer'
            localStorage.setItem('wins',Number(localStorage.getItem('wins'))+1);
        } else if(compMove=='Paper'){
            currWin='Player'
            localStorage.setItem('wins',Number(localStorage.getItem('wins'))+1);
        }
    }

    if(currWin==null){
        document.querySelector('.js-reset-score').innerHTML=`Tie!`
        const oldWinner=document.querySelector('.winner');
        if(oldWinner!=null){
            oldWinner.classList.remove('winner');
        }
    } else if(currWin=='Player'){
        document.querySelector('.js-reset-score').innerHTML=`Player Wins`;
        const oldWinner=document.querySelector('.winner');
        if(oldWinner!=null){
            oldWinner.classList.remove('winner');
        }
        const newWinner=document.querySelector('.userButton');
        newWinner.classList.add('winner');
        // console.log('adding class winner to the useButton');
        // console.log(newWinner);
<<<<<<< HEAD
        document.querySelector('robotButton').classList.add('winner');
=======
        document.querySelector('.robotButton').classList.add('winner');
>>>>>>> 6901fad235846f9ba41e623584b325dda564d22a
    } else if(currWin=='Computer'){
        document.querySelector('.js-reset-score').innerHTML=`Computer Wins`
        const oldWinner=document.querySelector('.winner');
        if(oldWinner!=null){
            oldWinner.classList.remove('winner');
        }
        document.querySelector('.robotButton').classList.add('winner');
    }

    if(localStorage.getItem('wins')==5){
        console.log("Player won this round");
        localStorage.setItem('totalWins',Number(localStorage.getItem('totalWins'))+1);
        reset();
        document.querySelector('.js-reset-score').innerHTML="Player Won This Round";
        document.querySelector('.js-totalWins-score-board').innerHTML=`Player has won : ${localStorage.getItem('totalWins')} rounds & Computer has won ${localStorage.getItem('totalLoses')} rounds`
    } else if(localStorage.getItem('loses')==5) {
        console.log("Computer wins this round");
        localStorage.setItem('totalLoses',Number(localStorage.getItem('totalLoses'))+1);
        reset();
        document.querySelector('.js-reset-score').innerHTML="Computer Won This Round";
        document.querySelector('.js-totalWins-score-board').innerHTML=`Player has won : ${localStorage.getItem('totalWins')} rounds & Computer has won ${localStorage.getItem('totalLoses')} rounds`
    }


    index=Math.floor(Math.random()*3);
    compMove=moves[index];
    document.querySelector('.js-score-board').innerHTML=`Player Score : ${localStorage.getItem('wins')} & Computer Score : ${localStorage.getItem('loses')} & Ties : ${localStorage.getItem('ties')}`

}    

<<<<<<< HEAD
=======
let arrowFn=()=>{
    localStorage.setItem('wins',0)
    localStorage.setItem('ties',0)
    localStorage.setItem('loses',0)
    console.log("Game resetted");
    document.querySelector('.js-reset-score').innerHTML="Score Resetted";
    document.querySelector('.js-score-board').innerHTML=`Player Score : ${localStorage.getItem('wins')} & Computer Score : ${localStorage.getItem('loses')} & Ties : ${localStorage.getItem('ties')}`
}

>>>>>>> 6901fad235846f9ba41e623584b325dda564d22a
function reset(){
    localStorage.setItem('wins',0)
    localStorage.setItem('ties',0)
    localStorage.setItem('loses',0)
    console.log("Game resetted");
    document.querySelector('.js-reset-score').innerHTML="Score Resetted";
    document.querySelector('.js-score-board').innerHTML=`Player Score : ${localStorage.getItem('wins')} & Computer Score : ${localStorage.getItem('loses')} & Ties : ${localStorage.getItem('ties')}`
} 

