import mongoose from "../DbConnection/MongoConnection";
import { ObjectID } from 'mongodb';

export default class AbstractStore {
    private _model: mongoose.Model<mongoose.Document, {}>;
    constructor(model: mongoose.Model<mongoose.Document, {}>) {
        this._model = model;
        this.GetData = this.GetData.bind(this);
    }

    // Get all data
    async GetData() {
        try {
            return await this._model.find({}).exec();
        } catch (error) {
            console.log(error);
        }
    }

    // Add new data
    async AddData(newData) {
        try {
            var newWork = new this._model(newData);
            return await newWork.save(function (err) {
                if (err) console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Delete data by id
    async DeleteDataById(id) {
        try {
            return await this._model.deleteOne({ _id: new ObjectID(id) }, function (err) {
                if (err) throw err;
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Get data by id
    async GetDataById(id) {
        try {
            return await this._model.findById(id).exec();
        } catch (error) {
            console.log(error);
        }
    }

    // Update data
    async UpdateData(id, newValue) {
        try {
            return await this._model.updateOne({ _id: new ObjectID(id) }, { $set: newValue });
        } catch (error) {
            console.log(error);
        }
    }
}