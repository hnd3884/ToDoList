// import
const { MongoClient, ObjectID } = require("mongodb");
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

// connection string mongodb
const uri = "mongodb://localhost";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());

// Get all works
async function GetData() {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let items = await collections.find({}).toArray();

        client.close();
        return items;
    } catch (error) {
        console.log(error);
    }
}

// Add new work
async function AddData(employee) {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let items = await collections.insertOne(employee, function (err, result) {
            if (err) {
                console.log("insert failed");
                client.close();
                throw err;
            }
            console.log("1 document inserted");
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
}

// Delete work by id
async function DeleteWork(id){
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let myquery = {_id : new ObjectID(id)}
        await collections.deleteOne(myquery, function (err, result) {
            if (err) {
                console.log("delete failed");
                client.close();
                throw err;
            }
            console.log("1 document deleted");
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
}

// Change done status of work by id
async function CheckDone(id, isdone){
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let myquery = {_id : new ObjectID(id)}
        let newvalues = { $set: { isdone: isdone } };
        await collections.updateOne(myquery, newvalues ,function (err, result) {
            if (err) {
                console.log("delete failed");
                client.close();
                throw err;
            }
            console.log("1 document deleted");
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
}

// Get all works API
app.get('/get-works', async (req, res) => {
    let items = await GetData();
    res.send({
        success: true,
        data: items
    });
    res.status(200).end();
})

// Add Work API
app.post('/add-work', async (req, res) => {
    //console.log(req.body);
    AddData(req.body);
    res.status(200).end();
}) 

// Delete work API
app.delete('/delete-work', async(req,res)=>{
    console.log(req.body);
    DeleteWork(req.body._id)
    res.status(200).end();
})

// Check done API
app.put('/update-work', async(req,res)=>{
    //.log(req.query);
    CheckDone(req.query.id, req.query.isdone === "true" ? true : false);
    res.status(200).end();
})

var server = app.listen(8081);

