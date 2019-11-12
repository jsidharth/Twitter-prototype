import mongoose from 'mongoose';

export default mongoose.connect(
  'mongodb+srv://root:root1234@grubhubcluster-7frcc.mongodb.net/twitter?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  },
  err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);
