
const transactions = [
    {
      id: 1,
      timestamp: 1656076800000,
      price: 10,
      category: 'Food',
      itemName: 'Pizza',
    },
    {
      id: 2,
      timestamp: 1656259600000,
      price: 20,
      category: 'Food',
      itemName: 'Burger',
    },
    {
      id: 3,
      timestamp: 1656019200000,
      price: 15,
      category: 'Clothing',
      itemName: 'T-Shirt',
    },
    {
      id: 4,
      timestamp: 1656364800000,
      price: 30,
      category: 'Electronics',
      itemName: 'Headphones',
    },
    {
      id: 5,
      timestamp: 1656105600000,
      price: 25,
      category: 'Clothing',
      itemName: 'Jeans',
    },
  ];

const obj=[{}];

function helper(transactionObj,obj){
    for(let j=0;j<obj.length;j++){
        if(obj[j].category===transactionObj.category){
            obj[j].price+=transactionObj.price;
            return true;
        }
    }
    return false;
}
function sort(transactions){
    for(let i=0;i<transactions.length;i++){
        if(!helper(transactions[i],obj)){
            obj.push({category:transactions[i].category,price:transactions[i].price});
        }
    }
    return obj;
}
sort(transactions);
console.log(obj);
