let arr = [1,[2,3],[4,5,[6,7,8]],9];
function flatten(arr){
    const flattened=[];
    const stack=[...arr];//写个堆栈，复制数组
    while(stack.length){
        const next = stack.pop();//取堆栈的最后一个元素
        if (Array.isArray(next)){
            stack.push(...next);//如果元素是数组，将数组展开然后重新压入堆栈
        }
        else{
            flattened.unshift(next);//如果元素不是数组，那么把它加入到flattened的首位
        }
    }
    return flattened;
}
console.log(flatten(arr));