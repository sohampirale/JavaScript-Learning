const fs=require('fs');
const path = require('path');

function storeNewBookInAllBooks(bookname, username, city, pricePerDay, categories) {
    const filePath=path.join(__dirname,'..','..','data','allBooks.json')
    const allBooks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const bookId=allBooks.bookId++;
    const booksWithParticularCity = allBooks[city]
    const newBookObj = {
        bookname,
        ownerusername: username,
        pricePerDay,
        categories
    }
    if (!booksWithParticularCity) {
      allBooks[city]={
        [bookId]:newBookObj
      }
    } else {
      booksWithParticularCity[bookId]=newBookObj
    }
    fs.writeFileSync('data/allBooks.json', JSON.stringify(allBooks, null, 2))
    console.log('new Book : ' + bookname + ' stored in allBooks.json');
    return bookId;
}

function storeNewBookToUsersData(bookname, username, city, pricePerDay, categories,bookId) {
  const filePath=path.join(__dirname,'data','usersData.json')
  const usersData = JSON.parse(fs.readFileSync('data/usersData.json', 'utf-8'));
  const user = usersData[username]

  const newBookObj = {
    bookname,
    pricePerDay,
    categories,
    bookId
  }

  if(!user){
    const newUserDataObj={
      books:{
        [bookId]:newBookObj
      },
      rentedBooks:{},
      borrowedBooks:{},
      wallet:{},
      incomingRequests:[],
      outgoingRequests:[]
    }
    usersData[username]=newBookObj
  } else {
    user.books[bookId]=newBookObj;
  }

  fs.writeFileSync('data/usersData.json', JSON.stringify(usersData, null, 2))
  console.log('new Book : ' + bookname + ' posted');
}

module.exports = {
  storeNewBookInAllBooks,
  storeNewBookToUsersData
};