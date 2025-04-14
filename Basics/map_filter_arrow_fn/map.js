// const arr=[10,20,30,40,50]

// const arr2=arr.map((num)=>{
//     return num*10
// })

// const arr3=arr.map((num)=>{
//     if(num===10){
//         return num*10
//     }
// })

// const arr4=arr.filter((num)=>{
//     if(num<=30){
//         return num*10;
//     } 
// })

// console.log(arr2);

// console.log(arr3);

// console.log(arr4);


function map(input,func){
    let ret=[];
    input.forEach(item => {
        ret.push(func(item))
    });
    return ret
}

function tripleIt(item){
    return item*3
}

function doubleIt(item){
    return item*2;
}

const arr1=[10,20,30,40,50]

const arr2=map(arr1,doubleIt)

console.log(arr2);

const arr3=map(arr1,tripleIt)

console.log(arr3);
