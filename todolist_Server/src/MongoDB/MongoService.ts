// import
import { MongoClient, ObjectID } from 'mongodb';

// connection string mongodb
const uri = "mongodb://localhost";

// Get all works
export async function GetData(): Promise<Object> {
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
export async function GetWorkById(id: string): Promise<Object> {
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
export async function AddData(work: Object): Promise<void> {
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
export async function DeleteWork(id: string): Promise<void> {
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
export async function UpdateWork(id: string, newValue: object): Promise<void> {
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