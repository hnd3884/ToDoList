"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import
const mongodb_1 = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// connection string mongodb
const uri = "mongodb://localhost";
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());
// Get all works
function GetData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let items = yield collections.find({}).toArray();
            client.close();
            return items;
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Get work detail by ID
function GetWorkById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let item = yield collections.findOne({ _id: new mongodb_1.ObjectID(id) });
            client.close();
            return item;
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Add new work
function AddData(work) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let items = yield collections.insertOne(work, function (err, result) {
                if (err) {
                    console.log("insert failed");
                    client.close();
                    throw err;
                }
                console.log("1 document inserted");
                client.close();
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Delete work by id
function DeleteWork(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let myquery = { _id: new mongodb_1.ObjectID(id) };
            yield collections.deleteOne(myquery, function (err, result) {
                if (err) {
                    console.log("delete failed");
                    client.close();
                    throw err;
                }
                console.log("1 document deleted");
                client.close();
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Change done status of work by id
function CheckDone(id, isdone) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let myquery = { _id: new mongodb_1.ObjectID(id) };
            let newvalues = { $set: { isdone: isdone } };
            yield collections.updateOne(myquery, newvalues, function (err, result) {
                if (err) {
                    console.log("delete failed");
                    client.close();
                    throw err;
                }
                console.log("1 document deleted");
                client.close();
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Change desciption of work by id
function UpdateWork(id, newDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let client = yield mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true });
            let collections = yield client.db('ToDoListDB').collection('Works');
            let myquery = { _id: new mongodb_1.ObjectID(id) };
            let newvalues = { $set: { description: newDescription } };
            yield collections.updateOne(myquery, newvalues, function (err, result) {
                if (err) {
                    console.log("delete failed");
                    client.close();
                    throw err;
                }
                console.log("1 document deleted");
                client.close();
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
// Get all works API
app.get('/get-works', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let items = yield GetData();
    res.send({
        success: true,
        data: items
    });
    res.status(200).end();
}));
// Get works by id API
app.get('/get-work', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let item = yield GetWorkById(req.query.id);
    res.send(item);
    res.status(200).end();
}));
// Add Work API
app.post('/add-work', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    AddData(req.body);
    res.status(200).end();
}));
app.put('/update-work', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    UpdateWork(req.query.id, req.query.newDescription);
    res.status(200).end();
}));
// Delete work API
app.delete('/delete-work', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    DeleteWork(req.body._id);
    res.status(200).end();
}));
// Check done API
app.put('/check-work', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    CheckDone(req.query.id, req.query.isdone === "true" ? true : false);
    res.status(200).end();
}));
var server = app.listen(8081);
//# sourceMappingURL=server.js.map