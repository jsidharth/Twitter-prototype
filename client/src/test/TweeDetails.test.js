// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TweetDetails from '../components/TweetDetails/TweetDetails';

configure({ adapter: new Adapter() });

it('render correctly the TweetDetails component', () => {
  const tweetDetailsComponent = renderer.create(<TweetDetails />).toJSON();
  expect(tweetDetailsComponent).toMatchSnapshot();
});
