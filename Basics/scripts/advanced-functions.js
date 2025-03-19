// let variable= function test(){
//     console.log("hii from test()");
//     return 10;
// }

// console.log(variable);

// console.log(typeof variable);

// variable();

// let variable2=variable;

// console.log(variable2);
// variable2();

// let temp=variable2();
// console.log('temp  = '+temp);

// // test();

// // console.log('hi');

// let variable3=34;
// // variable3();
// // console.log('hey');

// if(typeof variable2==="function"){
//     console.log('it is a function saved inside a varibale');
// } else {
//     console.log('normal varible probably');
// }

// let obj = {
//     variable1 : function(){
//         console.log('variable1');
//         return 20;
//     },

//     variable2 : function(){
//         console.log('variable2');
//         return 10;
//     }
// }

// obj.variable1();
// console.log(obj.variable2());

// let testing=obj.variable2

// let obj= {
//     var1 : 10,
//     var2 : 20
// }

// function change(obj2){
//     obj2.var1=30;
// }

// change(obj);
// console.log(obj.var1);
// console.log(obj.var2);


// setTimeout(function(){
//     console.log('Hii there');
// },4000);

// sleep(1000);


// setTimeout(function(){
//     console.log('hii1');
//     setTimeout(function(){
//         console.log('hii2');
//     },0)
// },5000);
// console.log('outside');

// var name='Soham'

// function greet(name){
//     console.log('hello : '+this.name);
//     this.name += '.';

// }

// setInterval(greet,200 0);

// console.log('hi');  
let cnt=0;
let timeoutVar=setTimeout(function(){
    console.log('hello from setTimeout');
    let intervalVar=setInterval(function(){
        console.log('hii there from setInterval');
        cnt++;
        if(cnt==3){
            console.log('Interval stopped');
            clearInterval(intervalVar);
        }
    },1000);
},5000);

