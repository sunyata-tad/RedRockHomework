async function postdata(data){
    const response = await fetch('http://東雪莲.中国:3001/auth/register',{
     method : 'post',
     headers:{
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
})
return response.json()
}
const data = {username:'awa',postward:'12345678',avater:null}
postdata(data)
.then((response)=>{
    if (!response.ok){throw new Error('Network response was not ok');}
})
.then(console.log(data))
.catch(erorr => {console.log(erorr)})