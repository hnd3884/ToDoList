import mongoose from '../../DbConnection/MongoConnection'

var workSchema = new mongoose.Schema({
  isdone: Boolean,
  description: String
},{
  versionKey: false
});

export var Work = mongoose.model('Works', workSchema);



