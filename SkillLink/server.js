const express=require('express');
const path = require('path');
const { stdin } = require('process');
const { log } = require('util');
const app=express();
const port=3000;
const Judge0_URL='https://judge0-ce.p.rapidapi.com/submissions';

const Judge0_Headers={
    "X-RapidAPI-Key": "a76d47cbbamsheb3ef468eef8a5dp1a6a13jsnddcdfc9837b0",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json"
}

const lang_ids={
    python : '71',
    cpp : '54'
}

async function postToJudge0(language_id,source_code){
    const postedResponse=await fetch(`${Judge0_URL}?base64_encoded=false&wait=false`,{
        method : 'POST',
        headers : Judge0_Headers,
        body:JSON.stringify({
            source_code,
            language_id,
            stdin:''
        })
    })

    const data=await postedResponse.json();
    console.log('data : '+JSON.stringify(data));
    return data;
}

async function getFromJudge0(token){
    console.log('inside getFromJudge0 token = '+token);
    
    const getResponse=await fetch(`${Judge0_URL}/${token}?base64_encoded=false`,{
        method:'GET',
        headers:Judge0_Headers
    })

    const output=await getResponse.json();
    console.log('getResponse : '+getResponse);
    console.log('output : '+JSON.stringify(output));
    return output;
}

app.use(express.json());

app.use('/main', express.static(path.join(__dirname, 'frontend')));

app.post('/run',async (req,res)=>{
    console.log('backend call to /run');
    
    const {code,lang} =  req.body;
    if(!code||!lang){
        console.log('unsuffient fields received');
        return res.status(400).json({error:"insufficient fields"});
    }
    const lang_id=lang_ids[lang];
    console.log('code : '+code);
    console.log('lang : '+lang);
    console.log('language id : '+lang_id);

    try{
        const tokenObj=await postToJudge0(lang_id,code);
        
        if(!tokenObj.token){
            console.log('tokenObj does not have token');
            
            return res.status(501).json(tokenObj)
        } 
        const finalOutput=await getFromJudge0(tokenObj.token);

        if(finalOutput.stderr){
            return res.status(400).json(finalOutput)
        } else {
            return res.status(200).json(finalOutput);
        }
    } catch(err){
        console.log('Error Occured : '+err.message);
        return res.status(500).json({stderr:"Error occured -from backend"})
    }

})

app.listen(port,()=>{
    console.log('listenign on port : '+port);
})

