import { Work } from './Models/Work'
import { ObjectID } from 'mongodb';

export default class WorkStore {
    // Get all works
    async GetData() {
        return await Work.find({}).exec();
    }

    // Add new work
    async AddWork(work){
        var newWork = new Work({
            isdone: work.isdone,
            description: work.description
        });

        return await newWork.save(function(err){
            if(err) console.log(err);
        })
    }

    // Delete work by id
    async DeleteWorkById(id){
        return await Work.deleteOne({_id:new ObjectID(id)}, function(err){
            if(err) throw err;
        })
    }

    // Get work by id
    async GetWorkById(id){
        return await Work.findById(id).exec();
    }

    // Update work
    async UpdateWork(id, newValue){
        return await Work.updateOne({_id:new ObjectID(id)},{ $set: newValue });
    }
}

