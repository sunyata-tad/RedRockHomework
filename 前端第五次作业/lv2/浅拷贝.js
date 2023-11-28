let person={
    name:1,
    title:{name:2}
}
function clone(target){
    let clonetarget = {}
    for(const key in target){
        clonetarget[key]=target[key]//拷贝对象第一层的所有属性
    }
    return clonetarget
}
user = clone(person)
user.name=2//检验外层是否成功拷贝
user.title.name=1//检验内层是否成功拷贝
console.log(person)
console.log(user)