function factorial(n){
    let val=1
    if(n>1){val=n*factorial(n-1)}
    else{val=1}
    return val
}
console.log(factorial(1))
console.log(factorial(2))
console.log(factorial(3))
console.log(factorial(4))