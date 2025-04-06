// console.log('hi');

// setTimeout(()=>{
//   console.log('inside setTimeout');
// },1000);

// let c=1;

// for(let i=0;i<1000000000;i++){
//   c++;
// }

// console.log('first for loop completed');
// for(let i=0;i<1000000000;i++){
//   c++;
// }

// console.log('Second for loop completed');

// for(let i=0;i<1000000000;i++){
//   c++
// }

// console.log('Third for loop completed');


//promisified version of setTimeout

// function setTimeoutt(time){
//   console.log('hi');
  
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       console.log('inside setTimeout');
//       reject("Set Timeoutt perfomed perfectly");
//     },time);
//   })
// }

// setTimeoutt(5000).then((msg)=>{
//   console.log('msg received : '+msg);
// }).catch((err)=>{
//   console.log('error received : '+err);
  
// })


// async function fn(){
//   return 100;
// }

// let data=10;
// console.log(data);

// data=fn().then((val)=>{
//   console.log('val = '+val);
//   return val;
// });

// console.log(data);


// Promise.all([data]).then(()=>{
//   console.log('data now = '+data);
// })



// function testing(){
//   console.log('inside testing()');
//   let loop=true;
//   setTimeout(()=>{
//     console.log('inside setTimeout');
//     loop=false;
//   },1000);

//   while(loop){
    
//   }
// }

// testing();

// console.log('outside');


// function setTimeoutSync(timeout) {
//   let startTime=new Date();
//   while(1){
//     let currTime=new Date();
//     if((currTime.getTime()-startTime.getTime())>timeout){
//       console.log(timeout+' time has passed');
//       break;
//     }
//   }
// }

// setTimeoutSync(2000);
// console.log('outside');


// setTimeout(()=>{
//   console.log('500');
// },500);

// setTimeout(()=>{
//   console.log('200');
// },200);

// setTimeout(()=>{
//   console.log('800');
// },800);

// console.log('outside');

// let c=0;
// for(let i=0;i<1000000000;i++){
//   c++;
// }

// console.log('cpu extensive task completed');


// function testing(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       resolve('task resolved');
//     },100);
//   })
// }

// testing().then((msg)=>{
//   console.log('msg received : '+msg);
// })

// let c=0;
// for(let i=0;i<1000000000;i++){
//   c++;
// }

// console.log('for loop execution completed');

function p1(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('resolving p1');
    },2000);
  })
}

function p2(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('resolving p2');
    },1000);
  })
}

function onSuccess(msg){  
  console.log('msg received '+msg);
} 

let pro1=p1();
let pro2=p2();

Promise.allSettled([pro1,pro2]).then(results=>{
  console.log('result : ');
  console.log(JSON.stringify(results));

  results.forEach((result)=>{
    console.log('result => '+result);
  })  
})

Promise.all([pro1,pro2]).then(results=>{
  console.log('result : ');
  console.log(JSON.stringify(results));

  
  results.forEach((result)=>{
    console.log('result = '+result);
  })
});
