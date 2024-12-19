async function getData() {
    try{
        let res = await fetch("http://localhost:3000/users");
        let data = await res.json();
        console.log(data)
    }catch(err){
        console.log("Error: ", err);
    }
}
getData()