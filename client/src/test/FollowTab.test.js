// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FollowTab from '../components/FollowTab/FollowTab';

configure({ adapter: new Adapter() });

it('render correctly the FollowTab component', () => {
  const followTabComponent = renderer.create(<FollowTab />).toJSON();
  expect(followTabComponent).toMatchSnapshot();
});
