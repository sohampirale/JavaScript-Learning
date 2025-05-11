function returnBookAddNewCompletedDeal(transactionId,dealObj){
    const filepath=path.join(__dirname,'..','..','data','completedDeals.json')
    const completedDeals=JSON.parse(fs.readFileSync(filepath,'utf-8'))
    completedDeals[transactionId]=dealObj
    fs.writeFileSync(filepath,JSON.stringify(completedDeals,null,2))
}

function returnBook(username,transactionId,res){  
    const filepath=path.join(__dirname,'..','..','data','ongoingDeals.json')
    const ongoingDeals=JSON.parse(fs.readFileSync(filepath,'utf-8'))

    const dealObj=ongoingDeals[transactionId]
    if(!dealObj){
        return res.status(401).json({msg:'Invalid Transaction Id'})
    }
    if(username==dealObj.clientusername){
        dealObj.clientReturnAggrement=true
    } else if(username==dealObj.ownerusername){
        dealObj.ownerReturnAggrement=true
    }

    if(dealObj.clientReturnAggrement && dealObj.ownerReturnAggrement){
        const returnTime=new Date(dealObj.returnTimeValidation)
        const delay=(returnTime-(new Date()))/(1000*60)
        console.log('Delay = '+delay);
        if(delay>=0){
            res.status(200).json({msg:'returnTimeValidation Successfull!'})
            returnBookAddNewCompletedDeal(transactionId,dealObj)
            delete ongoingDeals[transactionId]
        } else {
             res.status(401).json({msg:'Request Timeout!'+delay+' mins late'})
        }
    } else {
        dealObj.returnTimeValidation=new Date(Date.now()+(1000*60*5))

        if(username==dealObj.clientusername){
            res.status(201).json({msg:'Waiting for owner to accept the book'})
        } else if(username==dealObj.ownerusername){
            res.status(201).json({msg:'Waiting for client to return the book'})
        }
    }

    fs.writeFileSync(filepath,JSON.stringify(ongoingDeals,null,2))
}

module.exports={
  returnBookAddNewCompletedDeal,
  returnBook
}