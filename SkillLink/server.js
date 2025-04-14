const express = require('express');
const path = require('path');
const cors=require('cors')
// const { stdin } = require('process');
// const { log } = require('util');
const app = express();
const port = 3000;
const Judge0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const fs = require('fs');
const axios =require('axios')
const cookieParser=require('cookie-parser')
let testVar=1;

app.use(express.json());

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

app.get('/signup-pg',(req,res)=>{
    console.log('request received to /signup-pg');
    
    res.sendFile(path.join(__dirname,'frontend/signup/signup.html'))
})

app.get('/login-pg',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend/login.login.html'));
})

app.get('/get-token',(req,res)=>{
    console.log('inside /get-token');
    
    res.cookie('cookieFromBackend',randomTokenGenerator(),{
        httpOnly: true,
        secure: true,         // Only sent over HTTPS
        sameSite: 'none',      
        maxAge: 5 * 60 * 1000 // 
    })
    res.json({
        message:'COokie(token) stored by the backend'
    },)    
})

// app.use(cookieParser());

app.get('/send-token',(req,res)=>{
    console.log('req received at /send-token');
    
    const token=req.headers.token;
    if(token){
        console.log('token received is : '+token);
        res.json({
            message:'Token received successfully'
        })
    } else {
        console.log('token not found');
        res.json({
            message:'Token not received'
        })
    }
})



app.get('/axios',(req,res)=>{
    console.log('Inside GET axios');
    res.json({
        message:'returning json'
    })
})

app.post('/axios',(req,res)=>{
    console.log('Inside post axios');
    res.json({
        message:'Returing json from post axios'
    })
})

app.put('/axios',(req,res)=>{
    console.log('inside put axios');
    res.json({
        message:'Returning json from axios'
    })
})

function authenticateToken(username, token) {
    const users = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    const user = users.find(u => u.username == username);
    if (!user || user.token != token) return false;
    return true;
}

function randomTokenGenerator() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}";

    let token = '';

    for (let i = 0; i < 20; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    console.log('toke generated is : ' + token);
    return token;
}

const allowedOrigins = ['https://fantastic-pancake-7v7p4q766jrg3pg7q-5503.app.github.dev',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev',
    'http://localhost:3000',
    'https://hoppscotch.io',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-5503.app.github.dev'
]


app.use(checkCookie)

function checkCookie(req,res,next){
    console.log('inside checkCookie');
    
    if(req.cookies  && Object.keys(req.cookies).length > 0){
        console.log('Cookies found in req : '+JSON.stringify(req.cookies));
    } else {
        console.log('cookies not found in the request');
    }
    next();
}

app.get('/getCookie',(req,res)=>{   
    res.cookie('cookieFromBackend','testing1234',{
        httpOnly:false,
        secure: true,
        sameSite: 'Lax',
        maxAge: 5 * 60 * 1000  
    })
    res.json({
        message:'Cookie attached from backend'
    })
})



app.use('/', express.static(path.join(__dirname, 'frontend')));

// app.use('/', express.static(path.join(__dirname, 'test')));

app.get('/cors_learning',(req,res)=>{
    res.status(200).json({
        message:'Backend Allowed you to make this call'
    })
})

app.get('/test',(req,res)=>{
   console.log('inside /test endpoint');
   res.json({})
    return;
})

const Judge0_Headers = {
    "X-RapidAPI-Key": "a76d47cbbamsheb3ef468eef8a5dp1a6a13jsnddcdfc9837b0",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
}

const lang_ids = {
    python: '71',
    cpp: '54'
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

    return res.json({
        status: 200,
        message: `New user created by username : ${username}`,
        token:randomTokenGenerator()
    })
})

app.post('/login', async (req, res) => {
    console.log('login request received at backend');
    const username = req.body.username;
    const password = req.body.password;
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
    console.log('heyy');
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
    const token = randomTokenGenerator();
    const loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    // const loggedInUser=loggedInUsers.find()
    loggedInUsers.push({
        username: user.username,
        token
    })

    console.log('new logged in user added to loggedInUsers.json');
    fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
    return res.json({
        status: 200,
        message: 'User found in the database',
        token
    });
})

app.get('/error',(req,res)=>{
    throw new Error("hey there custome error");
})

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

app.get('/', (req, res) => {
    console.log('backend call to /');
    
    res.sendFile(path.join(__dirname, 'frontend/login/login.html'));
})

app.get('/app',(req,res)=>{
    console.log('/app receievd received at backend');
    res.sendFile(path.join(__dirname,'frontend/onlineCompilor.html'));
})

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

app.post('/authenticate',async(req,res)=>{
    res.json({authentication:authenticateToken(req.body.username,req.body.token)});    
})
// learnign

app.get('/axios',async(req,res)=>{
    const response=await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Response received from url using Axios');
    console.log('Response : '+JSON.stringify(response.data));
    res.json(response.data);
})

app.post('/axios_post',async(req,res)=>{
    const response=await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('Response received from url using Axios');
    console.log('Response : '+JSON.stringify(response.data));
    res.json(response.data);
})

app.get('/fetch_timeout',async(req,res)=>{
    const controller=new AbortController();
    const timeoutId=setTimeout(()=>{
        console.log('api call taking too long so aborting...');
        controller.abort();
    },6000);

    const response=await fetch('https://httpstat.us/200?sleep=5000',{
        signal:controller.signal
    });
    clearTimeout(timeoutId);

    console.log('data fetched in time so no need to abort');
    const data=await response.text();
    console.log('fetch req completed data rceived is : ');
    console.log(JSON.stringify(data));
    res.json(data)
})

app.get('/axios_timeout',async(req,res)=>{
    const response=await axios('https://httpstat.us/200?sleep=5000',{
        timeout:2000
    })

    if(response.data){
        console.log('api call succeeded');
        console.log(JSON.stringify(response.data));
    } else {
        console.log('failed api call');
        console.log(JSON.stringify(response));
    }
    res.json({msg:'hey'})
})

app.get('/dynamic_endpoint/:a/:b/:c',(req,res)=>{
    const a=req.params.a;
    const b=req.params.b;    
    const c=req.params.c;    
    console.log('a = '+a);
    console.log('b = '+b);
    console.log('c = '+c);
    res.json({msg:'at dynamic endpoints'})
})

function authenticationMiddleWare(req,res,next){
    console.log('inside authentication middleware');
    if(req.body){
        const username=req.body.username;
        const token=req.body.token;
        console.log('username : '+username);
        console.log('token : '+token);
        if(!username || !token){
            console.log('authentication details not given');
            return res.json({status:401,message:'authentication failed'})
        } else if(!authenticateToken(username,token)){
            console.log('authentication failed please login!');
            return res.json({status:401,message:'authentication failed'})
        }
        else {
            console.log('authenticaiton passed calling next()');
            next(req,res);
        }
    } else {
        console.log('req.body not found');
        return res.json({status:401,message:'authentication failed'})
    }
}

// app.use(authenticationMiddleWare)

app.post('/logout', async (req, res) => {
    console.log('logout call received to backend');

    const username = req.body.username;
    const token = req.body.token;
    let loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    const oldL = loggedInUsers.length;
    loggedInUsers = loggedInUsers.filter((user) => {
        return user.username != username || user.token != token;
    })
    const newL = loggedInUsers.length;

    fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
    res.clearCookie('token')
    console.log('token(cookie) removed from the backend');
    
    res.json({
        status: 200,
        message: 'User Logged Out Successfully!'
    })
})

app.post('/run', async (req, res) => {
    console.log('backend call to /run');

    const { code, language, username, token } = req.body;
    if (!authenticateToken(username, token)) {

        return res.json({
            status: 500,
            message: 'User token authentication failed'
        })
    }

    if (!code || !language) {
        console.log('unsuffient fields received');
        return res.status(400).json({ error: "insufficient fields" });
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

app.post('/getData', (req, res) => {
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

function middleware1(req,res,next){
    console.log('middleware here!!');
    next();
}

app.use(middleware1)

app.get('/middleware_learning1',(req,res)=>{
    console.log('inside middleware_learning1');
    res.json({
        msg:'helooo'
    })
})


app.listen(port, () => {
    console.log('listenign on port : ' + port);
})


app.use((err,req,res,next)=>{
    console.log('inside error handler');
    console.log('Error caught : '+err.message);
    next(err)
})

app.use((err,req,res,next)=>{
    console.log('error received : '+err.message);
    res.status(501).send('error occured cannot access further')
})