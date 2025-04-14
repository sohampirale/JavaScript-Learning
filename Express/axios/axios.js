const axios=require('axios')

const api1=axios.create({
    baseURL:'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev'
})

async function fn1(){
    const response=await api1.get('/axios')
    console.log(response.data);
    
}

async function fn2(){
    const response=await api1.post('/axios')
    console.log(response.data); 
}

async function fn3(){
    const response=await api1.put('/axios')
    console.log(response.data); 
}

fn1()

fn2();

fn3()