const buttonElem =document.querySelector('.btn-horizontal');
const verticleButtonElem=document.querySelector('.btn-verticle');
let marginLeft=0;
let marginTop=0;
let horizontalLimit=600;
let verticleLimit=400;
document.addEventListener('keydown',(event)=>{
    console.log(event.key);
    if(event.key=='ArrowRight'){
        marginLeft+=10;
        buttonElem.style.marginLeft=marginLeft +'px';
    } else if(event.key=='ArrowLeft'){
        marginLeft-=10;
        buttonElem.style.marginLeft=marginLeft+'px';;
    } else if(event.key=='ArrowUp'){
        marginTop-=10;
        buttonElem.style.marginTop=marginTop+'px';;
    } else if(event.key=='ArrowDown'){
        marginTop+=10;
        
        buttonElem.style.marginTop=marginTop+'px';;
    }
})

function cannotCatchHorizontalButton(){
    console.log('inside cannotCatch()');
    marginLeft=(marginLeft+100)%horizontalLimit;
    buttonElem.style.marginLeft=marginLeft+'px';

    // if(marginLeft>450){
       
    // } else {
    //     marginLeft=600;
    //     buttonElem.style.marginLeft=marginLeft+'px';
    // }
}

function cannotCatchVerticleButton(){
    marginTop=(marginTop+100)%verticleLimit;
    verticleButtonElem.style.marginTop=marginTop+'px';
}

buttonElem.addEventListener('mouseover',cannotCatchHorizontalButton);

verticleButtonElem.addEventListener('mouseover',cannotCatchVerticleButton);

buttonElem.addEventListener('click',()=>{
    alert('tussi great ho');
})

verticleButtonElem.addEventListener('click',()=>{
    alert('tussi great ho');
})