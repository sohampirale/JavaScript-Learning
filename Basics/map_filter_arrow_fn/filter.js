const arr=[1,2,3,4,5]
const arr2=arr.filter(function(item){
    return item%2==0?true:false
})

console.log(arr2);

// function getEven(item){
//     return item%2==0?true:false
// }

// function getOdd(item){
//     return item%2==1?true:false
// }

// function filter(input,func){    
//     const ret=[]
//     input.forEach(item => {
//         if(func(item)){
//             ret.push(item)
//         }
//     });
//     return ret
// }

// const arr3=filter(arr,getEven)

// const arr4=filter(arr,getOdd)

// console.log(arr3);

// console.log(arr4);


