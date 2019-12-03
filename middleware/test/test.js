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
      expect(res.body.dob).to.equal('12-25-2000');
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

it('Retweet a tweet', function(done) {
  chai
    .request('http://localhost:3001')
    .post('/tweet/retweet')
    .send({ tweetId: '5dcf1d127243733ed9cfbfdc', userId: '5dcb31841c9d440000b0d332' })
    .end(function(err, res) {
      expect(res.body.message).to.equal('Retweeted!');
      done();
    });
});

it('A retweet once tweeted should not be retweeted', function(done) {
  chai
    .request('http://localhost:3001')
    .post('/tweet/retweet')
    .send({ tweetId: '5dcf1d127243733ed9cfbfdc', userId: '5dcb31841c9d440000b0d332' })
    .end(function(err, res) {
      expect(res.body.message).to.equal('Already retweeted!');
      done();
    });
});


it('Should check if the user is a regisered user and send a message if he is not', function(done) {
  chai
    .request('http://localhost:3001')
    .post('/LoginOwner')
    .send({ username: 'joh.snow@gmail.com', password: '1234' })
    .end(function(err, res) {
      expect(res).to.have.status(201);
      expect(JSON.parse(res.text)[0].msg).to.equal('Unregistered User!');
      done();
    });
});
