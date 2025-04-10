const { log } = require('console');
const express = require('express')
const fs= require('fs')
const app=express();

const data={
    1:{
        value:'Data of user with id-1'
    },
    2:{
        value:'Data of user with id-2'
    }
}

let dailyRequestByUsers={}
setInterval(()=>{
    console.log('welcome new day!');
    dailyRequestByUsers={}
},25000)

const requestsByUsers={}

// app.use(express.json())

let requests=0;

function reqCountIncreaser(req,res,next){
    requests++
    next();
}

function authenticationToken(req,res,next){
    if(req.headers&&req.headers.token){
        if(req.headers.token=='secret123')next();
        else {
            res.status(401).json({
                message:'Unauthorized (invalid token)'
            })
        }
    } else {
        res.status(401).json({
            message:'Unauthorized (token not specified)'
        })
    }
}

function idChecker(req,res,next){
    if(req.headers&&req.headers.id){
        
        next();
    } else {
        res.status(401).json({
            message:'Unauthorized(id not specified)'
        })
    }
}

function timeoutChecker(req,res,next){
    const id=req.headers.id;
    if(requestsByUsers[id]){
        res.json({
            message:'Please wait for some time before making another request'
        })
    } else {
        requestsByUsers[id]=id;
        setTimeout(() => {
            delete requestsByUsers[id];
        }, 2000);
        next();
    }
}

function dailyRequestsChecker(req,res,next){
    const id=req.headers.id;
    if(dailyRequestByUsers[id]){
        dailyRequestByUsers[id]++;
        if(dailyRequestByUsers[id]>5){
            res.status(401).json({
                message:'Daily limit reached for user : '+id
            })
        }
    } else {
        dailyRequestByUsers[id]=1;
    }
    next();
}

function logger(req,res,next){
    const id=req.headers.id
    const method=req.method;
    const time=new Date();
    const URL=req.originalUrl;
    const logs=JSON.parse(fs.readFileSync('./logs.json','utf-8'))
    const request=`By ${id}, To : ${URL}, Time : ${time}, Method : ${method}`
    
    if(logs[id]){
        logs[id].push(request)
    } else {
        logs[id]=[request]
    }
    fs.writeFileSync('./logs.json',JSON.stringify(logs,null,2))
    next();
}

app.use(idChecker);

app.use(logger);

app.use(timeoutChecker)

app.use(dailyRequestsChecker)

app.use(reqCountIncreaser);


app.get('/public',(req,res)=>{
    res.json({
        message:'Welcome to /public page'
    })
})

app.get('/data',authenticationToken,(req,res)=>{
    res.status(200).json(data)
})

app.get('/data/:id',authenticationToken,(req,res)=>{
    const id=parseInt(req.headers.id)
    if(data[id]){
        res.status(200).json(data[id])
    } else {
        res.status(402).json({
            message:`User with id:${id} does not have any data`
        })
    }
})

app.use((err,req,res,next)=>{
    console.log('error caught : '+err.message);
    // res.status(501).json({
    //     message:err.message 
    // })
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})