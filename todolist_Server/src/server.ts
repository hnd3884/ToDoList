// import
import { MongoClient, ObjectID } from 'mongodb';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

// connection string mongodb
const uri = "mongodb://localhost";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());

// Get all works
async function GetData(): Promise<Object> {
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

// Get work detail by ID
async function GetWorkById(id: string): Promise<Object> {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let item = await collections.findOne({ _id: new ObjectID(id) });

        client.close();
        return item;
    } catch (error) {
        console.log(error);
    }
}

// Add new work
async function AddData(work: Object): Promise<void> {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let items = await collections.insertOne(work, function (err, result) {
            if (err) {
                console.log("insert failed");
                client.close();
                throw err;
            }
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
}

// Delete work by id
async function DeleteWork(id: string): Promise<void> {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let myquery = { _id: new ObjectID(id) }
        await collections.deleteOne(myquery, function (err, result) {
            if (err) {
                console.log("delete failed");
                client.close();
                throw err;
            }
            client.close();
        })
    } catch (error) {
        console.log(error);
    }
}

// Change work by id
async function UpdateWork(id: string, newValue: object): Promise<void> {
    try {
        let client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        let collections = await client.db('ToDoListDB').collection('Works');
        let myquery = { _id: new ObjectID(id) }
        let newvalues = { $set: newValue };
        await collections.updateOne(myquery, newvalues, function (err, result) {
            if (err) {
                console.log("delete failed");
                client.close();
                throw err;
            }
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

// Get works by id API
app.get('/get-work', async (req, res) => {
    let item = await GetWorkById(req.query.id.toString());
    res.send(item);
    res.status(200).end();
})

// Add Work API
app.post('/add-work', async (req, res) => {
    AddData(req.body);
    res.status(200).end();
})

// Update work API
app.put('/update-work', async (req, res) => {
    UpdateWork(req.query.id.toString(), req.body);
    res.status(200).end();
})

// Delete work API
app.delete('/delete-work', async (req, res) => {
    DeleteWork(req.body._id)
    res.status(200).end();
})

app.listen(8081);