function makeDealRequest(token, transactionId, res) {
    const filepath = path.join(__dirname, 'data', 'pendingDeals.json')
    const pendingDeals = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    console.log('transactionId = '+transactionId);
    
    console.log('Pending deals = '+JSON.stringify(pendingDeals));
    
    const transactionObj = pendingDeals[transactionId];
    if (!transactionObj) {
        return res.status(401).json({ msg: 'Invalid TransactionId' })
    }

    const {username} = extractDataFromToken(token)
    
    if (username == transactionObj.clientusername) {
        transactionObj.clientAggrementTime=new Date();
        transactionObj.clientAggrement = true
    } else if (username == transactionObj.ownerusername) {
        transactionObj.ownerAggrementTime=new Date();
        transactionObj.ownerAggrement = true
    }

    if (transactionObj.clientAggrement && transactionObj.ownerAggrement) {
        const filepath2 = path.join(__dirname, 'data', 'ongoingDeals.json')
        const ongoingDeals = JSON.parse(fs.readFileSync(filepath2, 'utf-8'))
        ongoingDeals[transactionId] = transactionObj
        delete pendingDeals[transactionId]
        transactionObj.startTime=new Date()
        transactionObj.endTime=new Date(Date.now()+(1000*60*2)) //2 mins for temp
        fs.writeFileSync(filepath2, JSON.stringify(ongoingDeals, null, 2))
        fs.writeFileSync(filepath, JSON.stringify(pendingDeals, null, 2))
        console.log('Deal completed!');
        res.status(200).json({ msg: 'Deal succeessfull!' })
        return;
    }

    if (username == transactionObj.clientusername) {
        fs.writeFileSync(filepath,JSON.stringify(pendingDeals,null,2))
        return res.status(201).json({
            msg: 'Waiting for owner to accept the deal'
        })
    } else if (username == transactionObj.ownerusername) {
        fs.writeFileSync(filepath,JSON.stringify(pendingDeals,null,2))
        return res.status(201).json({
            msg: 'Waiting for client to accept the deal'
        })
    }

}

module.exports={
  makeDealRequest
}