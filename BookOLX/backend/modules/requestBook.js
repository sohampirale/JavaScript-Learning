function addRequestForABookToUsersData(transactionId, clientusername,ownerusername,res) {

  const filepath=path.join(__dirname,'data','usersData.json');
  const usersData=JSON.parse(fs.readFileSync(filepath,'utf-8'))
  
   const client=usersData[clientusername]
   const owner=usersData[ownerusername]
   client.outgoingRequests.push(transactionId)
   owner.incomingRequests.push(transactionId)
   fs.writeFileSync(filepath,JSON.stringify(usersData,null,2))
   res.status(200).json({msg:'Request for the book is successfull'})
}

function addRequestForABookInPendingDeals(ownerusername, bookname, clientusername, period, pricePerDay,offeredprice) {
   const pathfile = path.join(__dirname, 'data', 'pendingDeals.json')
   const pendingDeals = JSON.parse(fs.readFileSync(pathfile, 'utf-8'))
   const transactionId = pendingDeals.transactionId++;
   const newTransactionObj = {
       bookname,
       period,
       pricePerDay,
       offeredprice,
       clientusername,
       ownerusername,
       clientAggrement: false,
       clientAggrementTime:null,
       ownerAggrement: false,
       ownerAggrementTime:null,
       startTime:undefined,
       endTime:undefined,
       returnTime:undefined,
       ownerReturnAggrement:null,
       clientReturnAggrement:null,
       returnTimeValidation:null
   }

   pendingDeals[transactionId] = newTransactionObj
   console.log('New pending transaction initiated');
   fs.writeFileSync(pathfile, JSON.stringify(pendingDeals, null, 2))
   return transactionId
}

module.exports={
  addRequestForABookToUsersData,
  addRequestForABookInPendingDeals
}