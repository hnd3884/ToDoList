// import
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoService from './MongoDB/MongoService';

const app = express();

// connection string mongodb
const uri = "mongodb://localhost";

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.options('*', cors());


// Get all works API
app.get('/get-works', async (req, res) => {
    let items = await mongoService.GetData();
    res.send({
        success: true,
        data: items
    });
    res.status(200).end();
})

// Get works by id API
app.get('/get-work', async (req, res) => {
    let item = await mongoService.GetWorkById(req.query.id.toString());
    res.send(item);
    res.status(200).end();
})

// Add Work API
app.post('/add-work', async (req, res) => {
    mongoService.AddData(req.body);
    res.status(200).end();
})

// Update work API
app.put('/update-work', async (req, res) => {
    mongoService.UpdateWork(req.query.id.toString(), req.body);
    res.status(200).end();
})

// Delete work API
app.delete('/delete-work', async (req, res) => {
    mongoService.DeleteWork(req.body._id)
    res.status(200).end();
})

app.listen(8081);