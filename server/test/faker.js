/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import faker from 'faker/locale/en_US';
import mongoose from 'mongoose';
import Users from '../models/user.model';
import Tweets from '../models/tweet.model';

mongoose.connect(
  'mongodb+srv://root:root123@cluster0-pmdvt.mongodb.net/twitter_perf_test?retryWrites=true&w=majority',
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

const users = [];
const tweets = [];
(async () => {
  for (let i = 0; i < 10000; i += 1) {
    tweets.push({
      body: faker.lorem.sentence(),
    });
  }
  await Tweets.insertMany(tweets);
  const updateTweets = await Tweets.find({});
  updateTweets.forEach(tweet => {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      dob: faker.date.past(),
      tweets: [tweet._id],
    });
  });

  await Users.insertMany(users);
  console.log('Inserted');
  process.exit(1);
})();
