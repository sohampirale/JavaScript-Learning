import express from 'express'
const app=express();

app.get('/sum',(req,res)=>{
    console.log('request got on the backend for sum');
    const a=Number(req.query.a);
    const b =Number(req.query.b);
    console.log('a = '+a+'& b = '+b);
    return res.send((a+b).toString());
})

app.get('/traffic',(req,res)=>{
    console.log('call received at traffic');
    
    let t=1;
    for(let i=0;i<10000000000;i++){
        t++;
    }
    return res.json({msg:'Welcome'})
})

app.get('/multiply',(req,res)=>{
    console.log('backend call to /multiply');
    
    const a=Number(req.query.a)
    const b=Number(req.query.b);
    return res.send((a*b).toString());
})

app.get('/',(req,res)=>{
    return res.send('Welcome');
})

app.listen(3000,()=>{
    console.log('server runnign on port : 3000');
});


