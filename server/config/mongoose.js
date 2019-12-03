import mongoose from 'mongoose';

export default mongoose.connect(
  'mongodb+srv://root:root123@cluster0-pmdvt.mongodb.net/twitter_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  },
  err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);