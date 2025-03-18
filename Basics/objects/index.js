// const obj={
//     obj1:{
//         name : 'pen',
//         price: 10
//     },
//     obj2:{
//         name:'wallet',
//         price:200
//     }
// };

// const { log } = require("console");

// console.log(obj);

// // console.log(obj[0][price]);

// console.log(obj.obj2);



/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/
// const transactions = [
//     {
//       id: 1,
//       timestamp: 1656076800000,
//       price: 10,
//       category: 'Food',
//       itemName: 'Pizza',
//     },
//     {
//       id: 2,
//       timestamp: 1656259600000,
//       price: 20,
//       category: 'Food',
//       itemName: 'Burger',
//     },
//     {
//       id: 3,
//       timestamp: 1656019200000,
//       price: 15,
//       category: 'Clothing',
//       itemName: 'T-Shirt',
//     },
//     {
//       id: 4,
//       timestamp: 1656364800000,
//       price: 30,
//       category: 'Electronics',
//       itemName: 'Headphones',
//     },
//     {
//       id: 5,
//       timestamp: 1656105600000,
//       price: 25,
//       category: 'Clothing',
//       itemName: 'Jeans',
//     },
//   ];
  
// function calculateTotalSpentByCategory(transactions) {
// let obj={};
// for(let i=0;i<transactions.size;i++){
//     if(transactions[i].category in obj){
//     obj.transactions[i].category.price+=transactions[i].price;
//     } else {
//     obj.transactions[i].category=transactions[i].price;
//     }
// return obj;
// }
// }
// console.log(calculateTotalSpentByCategory(transactions));
  
//   module.exports = calculateTotalSpentByCategory;
  

// const obj={
//     price : 100,
//     innerobj:{
//         name:'Burger',
//         categiry:'food',
//         func : function print(){
//             console.log('hello from funciton of obj of of obj');
//         }
//     }
// }

// console.log(obj);

// console.log(typeof obj.price);
// console.log(typeof obj.innerobj);

// obj.innerobj.func();



// const obj={
//     name:'pen',
//     price:{
//         original:100,
//         MRP:110
//     },
//     func: function print(){
//         console.log('hello from funciton of pen');
//     }

// }

// let temp1=JSON.stringify(obj);
// console.log(temp1);


// let obj2=JSON.parse(temp1);
// console.log(obj2);
// console.log(typeof obj2);


// let var1=19;
// let var2=parseInt(var1);
// console.log(var2);
// console.log(typeof var2);



// const obj1={
//     name:'pen'
// }
// const obj2={
//     name:'pen'
// }

// console.log(obj1.name===obj2.name);

// const obj={
//     name:'pen',
//     price:100
// }

// // console.log(obj);

// let {name} =obj;
// // let {price}=obj;
// // let{nonExistant} = obj;
// // console.log(name);
// // console.log(price);
// // console.log(nonExistant);

// // name='diff pen';
// // console.log(obj);



// // const obj2={
// //     name : ({name} =obj)
// // }

// // console.log(obj2);


// // const obj2={
// //     name //same as name:name
// // }

// // console.log(obj2);


// const obj2={
//     obj//same as obj:obj
// }

// console.log(obj2);


// const products={
//     basketball:{
//         name : 'basketball',
//         price:100
//     }
// }


// if(basketball in products){
//     console.log(products.basketball);
// } else {

//     console.log('not present in the products');
    
// }

// const obj={
//     name:'Pen'
// }

// obj.name=obj.name.toLowerCase();
// // obj.toLowerCase(); //n

// console.log(obj);

let score=JSON.parse(localStorage.getItem('score'));
if(!score){
    score={
        wins:0,
        loses:0
    }; 
    console.log('storing the score obj');
    localStorage.setItem('score',JSON.stringify(score));
} else {
    console.log('score obj present in the localStorage');
}

function display(){
    alert(`Wins ${score.wins} & Loses ${score.loses}`);
}

function increaseWins(){
    score.wins++;
    localStorage.setItem('score',JSON.stringify(score));
    display();
}
function decreaseWins(){
    score.wins--;
    localStorage.setItem('score',JSON.stringify(score));
    display();
}


function increaseLoses(){
    score.loses++;
    localStorage.setItem('score',JSON.stringify(score));
    display();

}

function decreaseLoses(){
    score.loses--;
    localStorage.setItem('score',JSON.stringify(score));
    display();
}


