const mongoose=require("mongoose")
const bodyParser = require("body-parser");
const express=require("express")
const date=require(__dirname+"/date.js")
console.log(date());
const app=express()
app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

var items=[]
var workitems=[]
app.get("/",function (req,res) {
    let today=new Date();

    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day=today.toLocaleDateString("en-US",options)

    res.render("list",{listTitle:"Today",newItem:items})
    
})

app.get("/work",function (req,res) {
    res.render("list",{listTitle:"Work List",newItem:workitems})
    
})
app.post("/work",function (req,res) {
    var item=req.body.task
    workitems.push(item);
    res.redirect("/work") 

    
})

app.post("/",function (req,res) {
    var item=req.body.task
    if(req.body.List=="Work"){
        workitems.push(item)
        res.redirect("/")

    }else{
        items.push(item)
        res.redirect("/")
    }
    

})
app.get("/about",function (req,res) {
    res.render("about")
    
})

app.listen(3000,function () {
    console.log("The server is running on port 3000");
    
}) 