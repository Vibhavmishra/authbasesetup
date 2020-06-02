//import express, body-parser, and cors
const express = require("express");// building the rest api   
const bodyParser = require("body-parser");// parse data from request and create req.body object
const cors = require("cors");// enable CORS (Express middleware)
const db = require("./app/models");
const Role = db.role;
const dbConfig = require("./app/config/db.config");
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// create express object
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };



  app.use(cors(corsOptions));


  db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  // parse requests of content-type - application/json
  app.use(bodyParser.json());

//parse request of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

//simple route
app.get("/",(req, res)=>{
    res.json({message:"welcome to Vibhav's application"});
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT||8080;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}.`);
});


//initial() function for create 3 rows in roles collection
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }




