fetch('https://api.github.com/users/sunyata-tad')
.then(function(res){return res.json()})
.then(function(data){console.log(data)})