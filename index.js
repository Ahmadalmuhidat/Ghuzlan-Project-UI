const expree = require("express");

const app = expree()

app.get("/home", (req, res) => {
    res.send("hello");
});

app.listen(5173, ()=>{
    console.log("I am listening in port 5173");
});
