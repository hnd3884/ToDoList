import * as config from '../../Config'
import * as mongoose from 'mongoose';

mongoose.connect(config.TODOLIST_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
  if (err) throw err;
});

var workSchema = new mongoose.Schema({
  isdone: Boolean,
  description: String
},{
  versionKey: false
});

export var Work = mongoose.model('Works', workSchema);



