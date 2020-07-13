import mongoose from '../../DbConnection/MongoConnection';

const workSchema = new mongoose.Schema({
  isdone: {
    type: Boolean,
    required: true
  },
  description: String
})

export const Work = mongoose.model('Works', workSchema);



