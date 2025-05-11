const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const port = 3000;
const fs = require('fs');
const axios = require('axios')
const cookieParser = require('cookie-parser')
const JWT_PW = "Soham Pirale";
const jwt = require('jsonwebtoken');
const {storeNewBookInAllBooks,storeNewBookToUsersData}=require('./backend/modules/postBooks')
const {extractDataFromToken}=require('./backend/utils/token')
const {returnBookAddNewCompletedDeal,returnBook} =require('./backend/modules/returnBook')
const {addRequestForABookToUsersData,addRequestForABookInPendingDeals}=require('./backend/modules/requestBook')
//variables

let user = undefined;
let testVar = 1;

const allowedOrigins = ['https://fantastic-pancake-7v7p4q766jrg3pg7q-5503.app.github.dev',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev',
    'http://localhost:3000',
    'https://hoppscotch.io',
    'https://friendly-space-sniffle-jjqg44gjp9v525r9x-5503.app.github.dev'
]

//functions

function checkCookie(req, res, next) {
    console.log('inside checkCookie');

    if (req.cookies && Object.keys(req.cookies).length > 0) {
        console.log('Cookies found in req : ' + JSON.stringify(req.cookies));
    } else {
        console.log('cookies not found in the request');
    }
    next();
}

function removeDoubleLogin(username) {
    let loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    let loggedInUser = loggedInUsers.find(u => u.username == username);
    if (loggedInUser) {
        console.log('Logging out another session of username : ' + username);
        loggedInUsers = loggedInUsers.filter((user) => {
            return user.username != username
        })
        fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
    } else {
        console.log('NO double login found');
    }

}

function authMiddleware(req, res, next) {
    console.log('inside authMiddleware');

    const token = req.headers.token;
    console.log('token : ' + token);

    if (!token) {
        console.log('token not found');
        return res.redirect('login-pg')
    }
    try {
        const decodedInfo = jwt.verify(token, JWT_PW)
        console.log('authMiddleware succeeded');
        next();
    } catch (err) {
        console.log('error caught in authMiddleware');
        console.log('err : ' + err.message);
        res.clearCookie('token')
        res.json({ msg: 'Invalid Token' })
    }
}

function logger(req, res, next) {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
}

function readUsersDataJson() {
    return JSON.parse(fs.readFileSync('/data/usersData.json', 'utf-8'));
}

function readUsersJson() {
    return JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
}

// app.use(cors({
//     origin:function(origin,callback){
//         console.log('origin : '+origin);

//         if(!origin){
//             console.log('API call received from postman or localhost (origin not specified)');
//             return callback(null,true)
//         }

//         if(allowedOrigins.includes(origin)){
//             console.log('Allowing cors from : '+origin);
//             return callback(null,true) 
//         } else {
//             return callback(new Error('Cannot allow access from ->'+origin));
//         }
//     },
//     credentials:true
// }))

app.use(cors())

app.use(express.json());

app.use(cookieParser())

app.use(logger);

app.use('/', express.static(path.join(__dirname, 'frontend')));

//route handlers

app.get('/get-token', (req, res) => {
    const username = req.headers.username;
    const city = req.headers.city;
    const token = jwt.sign({
        username,
        city
    }, JWT_PW)
    res.json({ token })
})

app.post('/signup', (req, res) => {
    console.log('inside /signup');

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const filepath1=path.join(__dirname,'data','users.json')
    const filepath2=path.join(__dirname,'data','usersData.json')
    const users = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const usersData=JSON.parse(fs.readFileSync(filepath2),'utf-8')

    const newUserObj={
        password,
        email,
        unsuccessfulAttempts:0
    }

    const newUserDataObj={
        books:{},
        rentedBooks:{},
        borrowedBooks:{},
        wallet:{
            balance:0,
            spent:0,
            earned:0
        },
        incomingRequests:[],
        outgoingRequests:[]
    }

    users[username]=newUserObj
    usersData[username]=newUserDataObj
    fs.writeFileSync(filepath1,JSON.stringify(users,null,2))
    fs.writeFileSync(filepath2,JSON.stringify(usersData,null,2))
    res.status(200).json({msg:'Signup Successful!'})
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
        if (user.unsuccessfulAttempts == 3) {
            return res.json({
                status: 501,
                message: 'Too many unsuccessfull attempts!'
            })
        }
        console.log('updating unsuccessful attempts');

        user.unsuccessfulAttempts++;
        fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
        return res.json({
            status: 500,
            message: 'Incorrect Password'
        })
    }
    user.unsuccessfulAttempts = 0;
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    const loggedInUsers = JSON.parse(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    loggedInUsers.push({
        username: user.username,
    })

    console.log('new logged in user added to loggedInUsers.json');
    fs.writeFileSync('data/loggedInUsers.json', JSON.stringify(loggedInUsers, null, 2));
    const token = jwt.sign({ username }, JWT_PW);
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
    })
    return res.json({
        status: 200,
        message: 'User found in the database',
        token
    });
})

app.get('/signup-pg', (req, res) => {
    console.log('request received to /signup-pg');
    const token = req.cookies.token;
    if (!token) {
        return res.sendFile(path.join(__dirname, 'frontend/signup/signup.html'))
    }

    try {
        const decodedInfo = jwt.verify(token, JWT_PW)
    } catch (err) {
        req.clearCookie('token')
        console.log('Token Invalid');
        res.status(401).json({ msg: 'Token Invalid' })
    }
    return res.sendFile(path.join(__dirname, 'frontend/app.html'));
})

app.get('/login-pg', (req, res) => {
    console.log('request received at /login-pg');

    const token = req.cookies.token;
    if (!token) {
        console.log('token not found');
        return res.sendFile(path.join(__dirname, 'frontend/login/login.html'));
    }

    try {
        const decodedInfo = jwt.verify(token, JWT_PW);
    } catch (err) {
        console.log('token verification failed');
        req.clearCookie('token')
        return res.sendFile(path.join(__dirname, 'frontend/login/login.html'));
    }

    console.log('token verified');
    return res.redirect('app');
})

app.get('/', (req, res) => {
    console.log('backend call to /');
    res.redirect('login-pg')
})

app.get('/app', (req, res) => {
    const filePath = path.join(__dirname, 'frontend', 'app.html');
    res.sendFile(filePath)
})

app.post('/logout', authMiddleware, async (req, res) => {
    console.log('logout call received to backend');

    const token = req.cookies.token;
    try {
        const decodedInfo = jwt.verify(token, JWT_PW);
        const username = decodedInfo.username;
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
    } catch (err) {
        res.clearCookie('token')
        return res.status(402).json({ msg: 'Invalid token' })
    }
})

app.get('/getRecommendations', (req, res) => {
    const token=req.headers.token;
    const {city}=extractDataFromToken(token)
    const filepath=path.join(__dirname,'data','allBooks.json')
    const allBooks=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    const cityBooks=allBooks[city];
    if(!cityBooks){
        return res.status(203).json({msg:'This city currently does not have any books availaible for rent'})
    } 

})

app.post('/addBook', (req, res) => {
    const token = req.headers.token;
    const decodedInfo = jwt.decode(token);
    const username = decodedInfo.username;
    const city = decodedInfo.city
    const { bookname, pricePerDay, categories } = req.body

    const bookId=storeNewBookInAllBooks(bookname, username, city, pricePerDay, categories)
    storeNewBookToUsersData(bookname, username, city, pricePerDay, categories,bookId)

    console.log('Book : ' + bookname + ' added successfully to two places');
    res.status(200).json({ msg: 'Book posted successfully' })
})

app.post('/requestBook', (req, res) => {
    console.log('inside /requestBook');

    const clientToken = req.headers.token;
    const decodedInfo = jwt.decode(clientToken);
    const clientusername = decodedInfo.username

    const ownerusername = req.body.ownerusername;
    const bookname = req.body.bookname;
    const period = req.body.period
    const pricePerDay=req.body.pricePerDay
    const offeredprice = req.body.offeredprice
    console.log('ownerUsername : ' + ownerusername);
    const transactionId=addRequestForABookInPendingDeals(ownerusername,bookname,clientusername,period,pricePerDay,offeredprice)

    addRequestForABookToUsersData(transactionId,clientusername,ownerusername,res)
})

app.post('/makeDeal', (req, res) => {
    const token = req.headers.token
    const transactionId = req.body.transactionId

    makeDealRequest(token,transactionId,res)
})

app.post('/returnBook',(req,res)=>{
    console.log('inside /returnBook');
    const token=req.headers.token
    const transactionId=req.body.transactionId
    const {username}=extractDataFromToken(token)
    return returnBook(username,transactionId,res)
})

app.listen(port, () => {
    console.log('listenign on port : ' + port);
})

// app.use((err,req,res,next)=>{
//     console.log('inside error handler');
//     console.log('Error caught : '+err.message);
//     next(err)
// })

// app.use((err,req,res,next)=>{
//     console.log('error received : '+err.message);
//     res.status(501).send('error occured cannot access further')
// })