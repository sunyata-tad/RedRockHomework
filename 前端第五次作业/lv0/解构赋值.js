const person = {
    name:"佐科姐姐",
    age:1000000,
    address:{
        city: "ChongQing",
        area:"NanShan"
    },
    title:["student",{year:2022,title:"GoodStudent"}]
}
const {name,age:year,address}=person
const {city,area:mountain}=address
const {title:[title1,]}=person
const {title:[,title0]}=person
const {title:title2}=title0
const [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11]=title2
const arr=[s1,s2,s4]
const title3=arr.join("")
console.log(name)
console.log(year)
console.log(city)
console.log(mountain)
console.log(title1)
console.log(title2)
console.log(title3)