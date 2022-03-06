//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");

})
 

app.post("/", function(req,res){
    var userFName = req.body.first
    var userLName = req.body.last
    var userEmail = req.body.email

    var data = {
        members: [
            {
                email_address: userEmail, 
                status: "subscribed",
                merge_fields: {
                    FNAME: userFName,
                    LNAME: userLName
                }
            }

        ]
    }

    const jsonData = JSON.stringify(data);
    const url = 'https://us14.api.mailchimp.com/3.0/lists/0ff405fcdb';
    const options = {
        method: "POST",
        auth: "yaya1:f96a72e962d81703d46d3442a192c285-us14"
    }

   const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+ "/failure.html")
        }

       response.on("data", function(data){
           console.log(JSON.parse(data));
       })
       
       

   })

request.write(jsonData);
request.end();

} )




app.post("/failure", function(req, res){
    res.redirect("/")
})





app.listen(process.env.PORT || 3000, function(){
    console.log("server is rumning on port 3000")
})


// api Key
// f96a72e962d81703d46d3442a192c285-us14

// list Id
// 0ff405fcdb