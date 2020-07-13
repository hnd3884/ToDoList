import mongoose from "../DbConnection/MongoConnection";
import { ObjectID } from 'mongodb';

export default class AbstractStore{
    private _model: mongoose.Model<mongoose.Document,{}>;
    constructor(model: mongoose.Model<mongoose.Document,{}>){
        this._model = model;
        this.GetData = this.GetData.bind(this);
    }

    async GetData(){
        return await this._model.find({}).exec();
    }

    // Add new work
    async AddData(newData){
        var newWork = new this._model(newData);

        return await newWork.save(function(err){
            if(err) console.log(err);
        })
    }

    // Delete work by id
    async DeleteDataById(id){
        return await this._model.deleteOne({_id:new ObjectID(id)}, function(err){
            if(err) throw err;
        })
    }

    // Get work by id
    async GetDataById(id){
        return await this._model.findById(id).exec();
    }

    // Update work
    async UpdateData(id, newValue){
        return await this._model.updateOne({_id:new ObjectID(id)},{ $set: newValue });
    }
}