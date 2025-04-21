const express = require('express');
const path = require('path');
const cors=require('cors')
const app = express();
const port = 3000;
const Judge0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const fs = require('fs');
const axios =require('axios')
const cookieParser=require('cookie-parser')
const JWT_PW="Soham Pirale";
const jwt=require('jsonwebtoken')

//varibles
let user=undefined;
let testVar=1;

const Judge0_Headers = {
    "X-RapidAPI-Key": "a76d47cbbamsheb3ef468eef8a5dp1a6a13jsnddcdfc9837b0",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
}

const lang_ids = {
    python: '71',
    cpp: '54'
}

const allowedOrigins = ['https://fantastic-pancake-7v7p4q766jrg3pg7q-5503.app.github.dev',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev',
    'http://localhost:3000',
    'https://hoppscotch.io',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-5503.app.github.dev'
]


//functions

function randomTokenGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}";

    let token = '';

    for (let i = 0; i < 20; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    console.log('toke generated is : ' + token);
    return token;
}

function checkCookie(req,res,next){
    console.log('inside checkCookie');
    
    if(req.cookies  && Object.keys(req.cookies).length > 0){
        console.log('Cookies found in req : '+JSON.stringify(req.cookies));
    } else {
        console.log('cookies not found in the request');
    }
    next();
}

async function postToJudge0(language_id, source_code) {
    const postedResponse = await fetch(`${Judge0_URL}?base64_encoded=false&wait=false`, {
        method: 'POST',
        headers: Judge0_Headers,
        body: JSON.stringify({
            source_code,
            language_id,
            stdin: ''
        })
    })

    const data = await postedResponse.json();
    console.log('data : ' + JSON.stringify(data));
    return data;
}

async function getFromJudge0(token) {
    console.log('inside getFromJudge0 token = ' + token);

    const getResponse = await fetch(`${Judge0_URL}/${token}?base64_encoded=false`, {
        method: 'GET',
        headers: Judge0_Headers
    })

    const output = await getResponse.json();
    console.log('getResponse : ' + getResponse);
    console.log('output : ' + JSON.stringify(output));
    return output;
}

function removeDoubleLogin(username){
    let loggedInUsers=JSON.parse(fs.readFileSync('data/loggedInUsers.json','utf-8'));
    let loggedInUser=loggedInUsers.find(u=>u.username==username);
    if(loggedInUser){
        console.log('Logging out another session of username : '+username);
        loggedInUsers=loggedInUsers.filter((user)=>{
            return user.username!=username
        })
        fs.writeFileSync('data/loggedInUsers.json',JSON.stringify(loggedInUsers,null,2));
    } else {
        console.log('NO double login found');
    }
    
}

function storeTheNewCode(code,output,username,language){
    console.log('inside storeTheNewCode()');
    
    let users=JSON.parse(fs.readFileSync('data/userData.json','utf-8'));
    let user=users.find(u=>u.username==username);
    if(!user){
        user={
            username,
            totalCodes:1,
            history:[{
                id:1,
                code,
                output,
                language
            }]
        }
        users.push(user);
    } else {
        const history=user.history;
        user.totalCodes++;
        history.push({
            id:user.totalCodes,
            code,
            output,
            language
        })
        users=users.filter((userr)=>{
            return userr.username!=username;
        })
        users.push(user);
    }
    fs.writeFileSync('data/userData.json',JSON.stringify(users,null,2));
    console.log('new code added by '+username+' in the userData.json');
}

function authMiddleware(req,res,next){
    console.log('inside authMiddleware');
    console.log('req.url : '+req.url);
    if(req.url=='/login-pg'||req.url=='/signup-pg'){
        console.log('from ');
        return next();
    }
    const token=req.cookies.token;
    console.log('token : '+token);

    if(!token){
        console.log('token not found');
        return res.redirect('login-pg')
    } 
    try{
        const decodedInfo=jwt.verify(token,JWT_PW)
        console.log('authMiddleware succeeded');
        next();
    } catch(err){
        console.log('error caught in authMiddleware');
        console.log('err : '+err.message);
        res.clearCookie('token')
        res.json({msg:'Invalid Token'})
    }
}

function logger(req,res,next){
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next(); 
}

app.use(cors({
    origin:function(origin,callback){
        console.log('origin : '+origin);
        
        if(!origin){
            console.log('API call received from postman or localhost (origin not specified)');
            return callback(null,true)
        }

        if(allowedOrigins.includes(origin)){
            console.log('Allowing cors from : '+origin);
            return callback(null,true) 
        } else {
            return callback(new Error('Cannot allow access from ->'+origin));
        }
    },
    credentials:true
}))

app.use(express.json());

app.use(cookieParser())

app.use(logger);

app.use('/', express.static(path.join(__dirname, 'frontend')));


//route handlers

app.post('/signup', (req, res) => {
    console.log('signup request received');

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

    const user = users.find(u => u.username == username);
    if (user) {
        return res.json({
            status: 500,
            message: `User with username ${username} exists in the database`
        })
    }
    users.push({
        username,
        password,
        email
    })

    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    console.log('New user created in users.json');
    const token=jwt.sign({username},JWT_PW);
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:'Lax',
        secure:true
    })
    return res.json({
        status: 200,
        message: `New user created by username : ${username}`,
        token
    })
})

app.post('/login', async (req, res) => {
    console.log('login request received at backend');
    const username = req.body.username;
    const password = req.body.password;
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
    removeDoubleLogin(username);
    const user = users.find(u => u.username == username);
    if (!user) {
        console.log('user not found');
        return res.json({
            status: 404,
            message: 'username not found in the database'
        });
    } else if (user.password != password) {
        console.log('incorrect password');
        if(user.unsuccessfulAttempts==3){
            return res.json({
                status:501,
                message:'Too many unsuccessfull attempts!'
            })
        }
        console.log('updating unsuccessful attempts');

        user.unsuccessfulAttempts++;
        fs.writeFileSync('data/users.json',JSON.stringify(users,null,2));
        return res.json({
            status: 500,
            message: 'Incorrect Password'
        })
    }
    user.unsuccessfulAttempts=0;
    fs.writeFileSync('data/users.json',JSON.stringify(users,null,2));
    const loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    loggedInUsers.push({
        username: user.username,
    })

    console.log('new logged in user added to loggedInUsers.json');
    fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
    const token = jwt.sign({username},JWT_PW);
    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:'Lax'
    })
    return res.json({
        status: 200,
        message: 'User found in the database',
        token
    });
})

app.get('/signup-pg',(req,res)=>{
    console.log('request received to /signup-pg');
    const token=req.cookies.token;
    if(!token){
        return res.sendFile(path.join(__dirname,'frontend/signup/signup.html'))
    }

    try{
        const decodedInfo=jwt.verify(token,JWT_PW)
    } catch(err) {
        req.clearCookie('token')
        console.log('Token Invalid');
        res.status(401).json({msg:'Token Invalid'})
    }
    return res.sendFile(path.join(__dirname,'frontend/onlineCompilor.html'));
})

app.get('/login-pg',(req,res)=>{
    console.log('request received at /login-pg');
    
    const token=req.cookies.token;
    if(!token){
        console.log('token not found');  
        return res.sendFile(path.join(__dirname,'frontend/login/login.html'));
    }

    try{
        const decodedInfo=jwt.verify(token,JWT_PW);
    } catch(err){
        console.log('token verification failed');
        req.clearCookie('token')
        return res.sendFile(path.join(__dirname,'frontend/login/login.html'));
    }

    console.log('token verified');
    return res.redirect('app');
})

app.get('/', (req, res) => {
    console.log('backend call to /');
    res.redirect('login-pg')
})

app.get('/app',authMiddleware,(req,res)=>{
    console.log('/app request received at backend');
    res.sendFile(path.join(__dirname,'frontend/onlineCompilor.html'));
})

app.post('/logout',authMiddleware, async (req, res) => {
    console.log('logout call received to backend');

    const token = req.cookies.token;
    try{
        const decodedInfo=jwt.verify(token,JWT_PW);
        const username=decodedInfo.username;
        let loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
        loggedInUsers = loggedInUsers.filter((user) => {
            return user.username != username;
        })
        fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
        res.clearCookie('token')
          
        res.json({
            status: 200,
            message: 'User Logged Out Successfully!'
        })
    } catch(err){
        res.clearCookie('token')
        return res.status(402).json({msg:'Invalid token'})
    }
})

app.post('/run', authMiddleware,async (req, res) => {
    console.log('backend call to /run');
    console.log("req.body:", req.body);

    const { code, language} = req.body;
    const token=req.cookies.token;
    if (!code || !language) {
        console.log('unsuffient fields received');
        return res.status(400).json({ error: "insufficient fields" });
    }

    let username,decodedInfo
    try{
        decodedInfo=jwt.verify(token,JWT_PW);
    } catch(err){
        console.log('token verificaiton failed');  
    }

    if(decodedInfo)
        username=decodedInfo.username
    else {
        console.log('decodedInfo is undefined');
        return res.json({msg:'DecodedInfo is undefined'})
    }
    const lang_id = lang_ids[language];
    console.log('code : ' + code);
    console.log('lang : ' + language);
    console.log('language id : ' + lang_id);

    try {
        const tokenObj = await postToJudge0(lang_id, code);

        if (!tokenObj.token) {
            console.log('tokenObj does not have token');

            return res.status(501).json(tokenObj)
        }
        const finalOutput = await getFromJudge0(tokenObj.token);

        if (finalOutput.stderr) {
            console.log('code failed');
            
            res.status(400).json(finalOutput)
            storeTheNewCode(code, finalOutput.stderr, username,language)
        } else {
            res.status(200).json(finalOutput);
            storeTheNewCode(code, finalOutput.stdout, username,language)
        }
    } catch (err) {
        console.log('Error Occured : ' + err.message);
        res.status(500).json({ stderr: "Error occured -from backend" })
        storeTheNewCode(code, finalOutput.stderr, username,language)
    }

})

app.post('/getData', authMiddleware,(req, res) => {
    console.log('getData request received from : ' + req.body.username);
    const userData = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));
    const user = userData.find(u => u.username == req.body.username);
    if (!user) {
        return res.json({
            status: 500,
            message: 'Make your first compilation!'
        })
    }
    user.status = 200;
    return res.json(user);
})

app.listen(port, () => {
    console.log('listenign on port : ' + port);
})

app.use((err,req,res,next)=>{
    console.log('inside error handler');
    console.log('Error caught : '+err.message);
    next(err)
})

//

// app.use((err,req,res,next)=>{
//     console.log('error received : '+err.message);
//     res.status(501).send('error occured cannot access further')
// })