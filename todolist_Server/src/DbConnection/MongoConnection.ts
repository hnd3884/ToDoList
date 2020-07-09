// MongoDB Connection
import * as mongoose from 'mongoose';
import * as Config from '../Config'

mongoose.connect(Config.TODOLIST_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
  if (err) throw err;
});

export default mongoose;