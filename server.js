
const express = require('express');
const mongoose = require('mongoose');

// allows us to use information from .env in this file
require('dotenv').config()

// import MyFruit object from fruit.js
const MyFruit = require('./models/fruit.js');
const MyVeggie = require('./models/veggies.js');

// create app by calling express function
const app = express();


// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL (?limit=2&color=green) 
// extended allows nested objects in URL
app.use(express.urlencoded({extended:true}));

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static('public'));

// string we get from MongoDB - we hide our username and password in our .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.i58imot.mongodb.net/FruitDatabase?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


app.post('/create_fruit', async (req, res) =>{
    // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
    const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await MyFruit.create
    ({
        name,
        color,
        age,
        readyToEat
    });


    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);

})

//get info from the front end and create a new veggie to the collection
app.post('/create_veggie', async (req, res) =>
{
    const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

    let returnedValue = await MyVeggie.create
    ({
        name,
        color,
        age,
        readyToEat
    })

    console.log(returnedValue);
    if(returnedValue)
    {
        console.log('upload complete');
    }
    res.send(returnedValue);
})

app.get('/get_veggie_data', async (req, res) =>
{
    let response = await MyVeggie.find({});
    console.log(response);
    res.send(response);
})
app.delete("/delete_nameless_data", async (req, res) => {
   let response = await MyFruit.deleteMany({name: ""});

   console.log(response);

   res.send({data: `deleted ${response.deletedCount} items.`})
})

app.get('/get_fruit_data', async (req, res) => {
    // get data from database
    let response = await MyFruit.find({})
    console.log(response);
    // send it back to front end
    res.json(response)
})

app.get('/veggie/:veggieName', async (req, res) =>
{
    //get veggie data
    let response = await MyVeggie.find({})

    response.forEach((el) =>
    {
        //check if element name 
        if(el.name == req.params.veggieName)
        {
            //send the veggie from the database into the front end
            console.log(el.name);
            res.json(el);
        }
    })
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});