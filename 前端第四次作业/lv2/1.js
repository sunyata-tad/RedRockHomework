let arr = [1,[2,3],[4,5,[6,7,8]],9];
function flatten(arr){
    let flattened = [];//存放扁平化后的数组
    arr.forEach((element) => {//遍历每一个元素
        if (Array.isArray(element)) {
            flattened = flattened.concat(flatten(element));//用递归将数组元素连接在结果的数组中，多重的数组会在递归中变成元素全为数的数组
        } else {
            flattened.push(element);//考虑非数组的元素，直接把它加入flattened数组
        }
    });
    return flattened;
}
console.log(flatten(arr));//把它打出来