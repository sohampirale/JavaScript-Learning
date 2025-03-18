// let variable= function test(){
//     console.log("hii from test()");
//     return 10;
// }

const { log } = require("util");

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
// let cnt=0;
// let timeoutVar=setTimeout(function(){
//     console.log('hello from setTimeout');
//     let intervalVar=setInterval(function(){
//         console.log('hii there from setInterval');
//         cnt++;
//         if(cnt==3){
//             console.log('Interval stopped');
//             clearInterval(intervalVar);
//         }
//     },1000);
// },5000);



// const temp=function (){
//     console.log('hello');
// }

// console.log(temp);
// // temp();

// function fn1(fn2){
//     console.log('hi');
//     fn2();
// }


// fn1(temp);


// let var1=function(){
//     console.log('hello world');
// }

// let obj={
//     var1
// }

// console.log(var1);

// console.log(obj.var1);

// obj.var1();

// if("var1" in obj){
//     console.log('exists');
// } else {
//     console.log('does not exists');
// }


// function fn1(){
//     console.log('hii');
//     return 1;
// }

// function fn2(param){
//     console.log(param);
//     console.log('hello');
// }

// fn2(fn1());

// setTimeout(function(){
    // console.log('setTimeout');
    // setInterval(function(){
        // console.log('setInterval');
    // },2000);
// },10000);

// function fn1(param){
//     param();
// }

// function fn2(){
//     console.log('hello');
// }

// fn1( ()=>{
//     console.log('hii');
// });

// fn1(fn2);

// let var1= () =>{
//     console.log('Hello world');
//     return 1;
// }

// var1(10,20);
// console.log(var1);


// fn1();
// fn2();
// function fn1(){
//     console.log('hello');
// }

// let fn2=()=>{
//     console.log('hii');
// }

// fn1();
// fn2();

let arr=[-10,20,-23,43];
// let arr2=arr.filter((value,index,param3)=>{
//     console.log(param3);
//     return value>=0;
// })
// console.log(arr2);

let arr2=arr.filter(value=> value>=0);
console.log(arr2);

