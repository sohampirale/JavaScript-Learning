const axios=require('axios');

async function fn1(){
    const response=await axios.get('https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev/test1')
    console.log('Data from /test1 : '+JSON.stringify(response.data));
}

async function fn2(){
    const response=await axios.get('https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev/test2')
    console.log('Data from /test2 : '+JSON.stringify(response.data));
}

async function fn3(){
    const response=await axios.get('https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev/test3')
    console.log('Data from /test3 : '+JSON.stringify(response.data));
}


fn1();
// fn2();
fn3();


// import axios from 'axios'

// async function axiosWork(){
//     const response=await axios('https://sum-server.100xdevs.com/todos')
//     console.log(response.data);
// }

// async function fetchWork(){
//     const response=await fetch('https://sum-server.100xdevs.com/todos')
//     const data=await response.json();
//     console.log(response.data);
// }

// // work();
// fetchWork()
// console.log('hi');



