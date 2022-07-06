//jhint esversion:6

const express = require("express");
const bodyParser =require("body-parser");
const https= require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){ 
     res.sendFile(__dirname +  "/signup.html");

}); 

app.post("/",function(req,res){
 const firstName=req.body.fname;
 const lastName = req.body.lname;
 const email=req.body.email;

const data={
    members:[{
        email_address :email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }]
};
const jasonData=JSON.stringify(data);

const url="https://us14.api.mailchimp.com/3.0/lists/2262e6343b"

const options ={
    method:"POST",
    auth:"dhice:e4794458440ec26ee7c85e8ada342c4a-us14"
}

const request=https.request(url,options,function(response){
    console.log(response.statusCode);
    if(response.statusCode=== 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
        
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
});
request.write(jasonData);
request.end();
});

app.post("/failure",function(req,res){
    
    res.redirect("/");

});
app.post("/success",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,function(){
    console.log("port is live");
});
//api_key; e4794458440ec26ee7c85e8ada342c4a-us14
// list_id;2262e6343b