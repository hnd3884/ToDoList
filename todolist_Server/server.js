// import
const { MongoClient } = require("mongodb");
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

// Get all employees
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

// Add new employee
async function AddData(employee) {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('connectnodejs').collection('employees');
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

// GET /get-works
app.get('/get-works', async (req, res) => {
    let items = await GetData();
    res.send({
        success: true,
        data: items
    });
})

// POST /add-work
app.post('/add-work', async (req, res) => {
    //console.log(req.body);
    AddData(req.body);
    res.status(200).end();
})

var server = app.listen(8081);

