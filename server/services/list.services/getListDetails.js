/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Promise from 'bluebird';
import moment from 'moment';
import Lists from '../../models/list.model';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (listId, callback) => {
  const list = await Lists.findById(listId)
    .populate({
      path: 'members',
      select: 'profilePic active tweets name handle',
      populate: {
        path: 'tweets',
        select: '-hashtags',
      },
    })
    .lean();
  if (!list) {
    callback(
      {
        message: 'List not found',
      },
      null
    );
  } else {
    const listUser = await Users.findOne(
      {
        ownedLists: list._id,
      },
      {
        name: 1,
        handle: 1,
        profilePic: 1,
      }
    );
    if (!listUser) {
      callback(
        {
          message: 'Could not map list to user!',
        },
        null
      );
    } else {
      // Fetching list subscribers
      const subscribers = await Users.find({
        subscribedLists: listId,
      }).select('profilePic active name handle');

      let { members } = list;
      if (!members) {
        callback(null, {
          tweets: [],
          members: [],
          subscribers,
        });
      } else {
        // Fetching tweets and mapping tweets users
        let tweets = _.chain(members)
          .map(member => {
            return _.map(member.tweets, tweet => ({
              userId: member._id,
              _id: tweet._id,
              name: member.name,
              handle: member.handle,
              likes_count: tweet.likes.length || 0,
              comments_count: tweet.comments.length || 0,
              retweet_count: tweet.retweets.length || 0,
              body: tweet.body,
              image: tweet.image,
              created_at: tweet.created_at,
              likes: tweet.likes,
              profilePic: member.profilePic,
              bookmarks: member.bookmarks,
            }));
          })
          .flatten()
          .value();

        // Sort tweets by creation time
        if (tweets && tweets.length) {
          tweets = tweets.sort((first, second) => moment(second.created_at).diff(first.created_at));
        }
        // Update Tweet Views
        await Promise.map(tweets, tweet => {
          return Tweets.findOneAndUpdate(
            {
              _id: tweet._id,
            },
            {
              $inc: {
                views: 1,
              },
            }
          );
        });

        // Remove non essential fields from members list
        members = _.map(members, member => {
          // eslint-disable-next-line no-param-reassign
          delete member.tweets;
          return member;
        });

        callback(null, {
          tweets,
          members,
          subscribers,
          listOwner: listUser,
          listDetail: {
            name: list.name,
            description: list.description,
          },
        });
      }
    }
  }
};

export default {
  handleRequest,
};
