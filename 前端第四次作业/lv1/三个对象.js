let obj1 = new Object();
obj1.name=1;
let obj2 = {
    name:2
}
function obj(name){
    this.name=name
}
const obj3 = new obj(3)
console.log(obj1);
console.log(obj2);
console.log(obj3);