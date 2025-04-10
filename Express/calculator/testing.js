const URL='https://friendly-space-sniffle-jjqg44gjp9v525r9x-3000.app.github.dev';

let response=await fetch(URL+'/sum?a=1&b=2');
let ans=await response.text();
console.log('sum : '+ans);

response=await fetch(URL+'/multiply?a=1&b=2');
ans=await response.text();

console.log('multiplication : '+ans);



