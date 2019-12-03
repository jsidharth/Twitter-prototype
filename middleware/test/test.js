/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
it('Should check login credentials and return status code', done => {
  chai
    .request('http://localhost:3001')
    .post('/user/login')
    .send({ email: 'madhu@pk.com', password: '12345678' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('Madhu');
      expect(res.body.email).to.equal('madhu@pk.com');
      expect(res.body.dob).to.equal('03-15-1994');
      expect(res.body.handle).to.equal('madhupk560');

      done();
    });
});

it('Should fetch details of user', done => {
  chai
    .request('http://localhost:3001')
    .get('/user/details/5dd2317e8f8a12706dfd7357')
    .end((err, res) => {
      expect(res.body.email).to.equal('madhu@pk.com');
      expect(res.body.name).to.equal('Madhu');
      expect(res.body.location).to.equal('San Jose');
      expect(res.body.website).to.equal('http://www.testwebsite.com');
      expect(res.body.bio).to.equal('All the best Shim gang');
      expect(res.body.followers.length).to.equal(0);
      expect(res.body.following.length).to.equal(3);
      done();
    });
});

it('Retweet a tweet', done => {
  chai
    .request('http://localhost:3001')
    .post('/tweet/retweet')
    .send({ tweetId: '5de62f314a0d4f64014924a8', userId: '5dcb31841c9d440000b0d332' })
    .end((err, res) => {
      expect(res.body.message).to.equal('Retweeted!');
      done();
    });
});

it('A retweet once tweeted should not be retweeted', done => {
  chai
    .request('http://localhost:3001')
    .post('/tweet/retweet')
    .send({ tweetId: '5de62f314a0d4f64014924a8', userId: '5dcb31841c9d440000b0d332' })
    .end((err, res) => {
      expect(res.body.message).to.equal('Already retweeted!');
      done();
    });
});

it('Should post a tweet and receive a success response', done => {
  chai
    .request('http://localhost:3001')
    .post('/tweet/post')
    .send({ tweetText: 'Namaste from Team 3', userId: '5dcb31841c9d440000b0d332' })
    .end((err, res) => {
      expect(res.body.message).to.equal('Tweet Posted!');
      done();
    });
});

it('Should fetch details of user given his handle', done => {
  chai
    .request('http://localhost:3001')
    .get('/search/@savy')
    .end((err, res) => {
      expect(res.body.users[0].name).to.equal('Savyasachi J');
      expect(res.body.users[0].handle).to.equal('savy');
      expect(res.body.users[0]._id).to.equal('5dcb32641c9d440000b0d334');
      done();
    });
});

it('Fetch the Tweet traffic in the last hour/day/month', done => {
  chai
    .request('http://localhost:3001')
    .get('/analytics/numberOfTweets')
    .end((err, res) => {
      expect(res.body[1].timeFrame).to.equal('Day');
      expect(res.body[1].tweetCount).to.equal(32);
      expect(res.body[2].timeFrame).to.equal('Month');
      expect(res.body[2].tweetCount).to.equal(133);

      done();
    });
});

it('Should delete a tweet given its tweetID', done => {
  chai
    .request('http://localhost:3001')
    .delete('/tweet/delete/5de62f314a0d4f64014924a8')
    .end((err, res) => {
      expect(res.body.message).to.equal('Tweet Deleted Successfully');
      done();
    });
});

it('Should fetch the posts liked by a given user', done => {
  chai
    .request('http://localhost:3001')
    .get('/user/like/5dcb31841c9d440000b0d332')
    .end((err, res) => {
      expect(res.body.length).to.equal(4);
      done();
    });
});

it('Fetch top 5 retweeted tweet', done => {
  chai
    .request('http://localhost:3001')
    .get('/analytics/mostRetweets')
    .end((err, res) => {
      expect(res.body[0].retweetCount).to.equal(3);
      expect(res.body[0].tweetId).to.equal('5dcf10b51c9d440000092c98');
      expect(res.body[1].retweetCount).to.equal(2);
      expect(res.body[1].tweetId).to.equal('5de0248506669f301bf1884f');
      expect(res.body[2].retweetCount).to.equal(2);
      expect(res.body[2].tweetId).to.equal('5dcf1d127243733ed9cfbfdc');
      expect(res.body[3].retweetCount).to.equal(1);
      expect(res.body[3].tweetId).to.equal('5dde40856603a71bec32fee6');
      expect(res.body[4].retweetCount).to.equal(1);
      expect(res.body[4].tweetId).to.equal('5dd833834c036687d7181f13');
      done();
    });
});
