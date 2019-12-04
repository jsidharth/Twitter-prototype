// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostTweet from '../components/PostTweet/PostTweet';

configure({ adapter: new Adapter() });

it('render correctly the Post Tweet component', () => {
  const postTweetComponent = renderer.create(<PostTweet />).toJSON();
  expect(postTweetComponent).toMatchSnapshot();
});
