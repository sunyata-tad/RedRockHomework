const obj1 = {
    name:1,
    title : { name:2, title:[1] }
}//一个普通的嵌套对象
function clone(target){
    if(typeof target ==="object"){//判断目标是否为对象
        let clonetarget = Array.isArray(target) ?[] : {}//兼容数组克隆
        for(const key in target){//遍历目标的属性
    {clonetarget[key]=clone(target[key])}//递归拷贝目标，保证深层次的拷贝
    }
    return clonetarget//返回克隆的结果
    }
    else{
        return target//对非对象的值，直接返回
    }
}
let obj2 = clone(obj1)
obj2.title.name=1//检验二层对象是否成功拷贝
a=obj2.title.title.push(2)//检验数组是否成功拷贝
console.log(obj1)//{ name: 1, title: { name: 2, title: [ 1 ] } }原对象没变，成功拷贝
console.log(obj2)//{ name: 1, title: { name: 1, title: [ 1, 2 ] } }
//循环引用写if语句用map（weakmap）熔断防止溢出，forin可以优化。其他类型克隆看不懂了